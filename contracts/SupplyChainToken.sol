pragma solidity ^0.4.24;

import "./Ownable.sol";

contract SupplyChainToken is Ownable {

    event OnPaymentRequestEvent(address requester, address payer, uint paymentID);
    event OnPaymentResponseEvent(address requester, address responer, uint paymentID);

    event OnLoadRequestEvent(address requester, uint requestAmount);
    event OnLoadResponseEvent(address requester, uint requestAmount, bool result);

    //应收账单
    struct PaymentSchedule {
        address payerAddr; //付款者地址
        uint dueTime; //应还时间，越短越具有即时性,这里我特殊设置0为表示该公司的信用程度，即金融机构最多相信该核心企业的还款能力，对应到就类似于金融机构给核心企业发的token
        uint amount; //应还本金,逐步减少，直到为0的时候就可以删除了
        uint distributeAmount; //银行给企业的额度
        uint originalAmount; //核心企业发放给下游企业时的金额
        uint timestamp; //核心企业发放给下游企业时签发时的时间戳，防止重放攻击
        string bankSignature; // payerAddr + distributeAmount
        string companySignature; //payerAddr + dueTime + originalAmount + timestamp
    }
    
        //请求还款
    struct PaymentRequest{
        address owner;
        uint paymentID;
        address payerAddr; //付款者地址
        uint dueTime; //应还时间，越短越具有即时性,这里我特殊设置0为表示该公司的信用程度，即金融机构最多相信该核心企业的还款能力，对应到就类似于金融机构给核心企业发的token
        uint amount; //应还本金,逐步减少，直到为0的时候就可以删除了
    }
    
    mapping (address => PaymentRequest[]) paymentRequests;

    struct LoanInfo{
        address claimerAddr;
        uint principleAmount; //应还本金
        uint interestAmount;  //应还利息
        uint paidAmount; //已还金额
    }
    
    struct LoanRequest{
        address claimerAddr;
        uint amount;
    }

    //企业手中拥有的应收账单
    mapping (address => PaymentSchedule []) paymentBalances;
    //电子钱包-类似网上银行，与银行账号等相关联，直接由银行控制
    mapping (address => uint) moneyBalances;
    //贷款信息
    LoanInfo[] loans;
    //贷款申请信息
    LoanRequest[] loanRequests;
    


    //权威机构通过评估，预先分配token，这里的token类似信用评级
    function distributeToken(address _to, uint _value, string bankSignature) public onlyOwner{
        uint index = getSelfCreditPayment(_to);
        if (index >= paymentBalances[_to].length)
            paymentBalances[_to].push(PaymentSchedule(_to, 0, _value, _value, 0, now, bankSignature, "null"));
        else
            paymentBalances[_to][index].amount += _value;
    }
    //存款，取款，必须通过银行
    //存款操作
    function depositMoney(address _to, uint _value) public onlyOwner{
        moneyBalances[_to] += _value;
    }
    //取款操作
    function withdrawMoney(address _addr, uint _value) public onlyOwner{
        require(moneyBalances[_addr] >= _value);
        moneyBalances[_addr] -= _value;
    }
    //yve chaxun
    function getMoneyBalances() public view returns(uint) {
        return moneyBalances[msg.sender];
    }
    
    function getMoneyBalances(address _addr) public view returns(uint){
        return moneyBalances[_addr];
    }

    //把相对应的应收账单当成是token转账操作
    function transferPayment(address _to, uint _value) public{
        uint totalAmount = getBalance(msg.sender);
        require(totalAmount > _value); //要有足够的钱呀
        uint currentSum = 0;
        for (uint i = 0; i < paymentBalances[msg.sender].length; i++){
            currentSum += paymentBalances[msg.sender][i].amount;
            PaymentSchedule payment = paymentBalances[msg.sender][i];
            if (currentSum <= _value){
                deletePayment(_to, i);
                paymentBalances[_to].push(payment);
                if (currentSum == _value) break;
            }
            else if (currentSum > _value){ //别转这么多，转块的一部分给你就好了
                uint blockTransferAmount = _value - (totalAmount - paymentBalances[msg.sender][i].amount);
                paymentBalances[msg.sender][i].amount -= blockTransferAmount;
                //对方多了对应的一个块
                paymentBalances[_to].push(PaymentSchedule(payment.payerAddr, payment.dueTime, blockTransferAmount, payment.distributeAmount, payment.originalAmount, payment.timestamp, payment.bankSignature, payment.companySignature));
                break;
            }
        }
    }
    
    function getPaymentNumberByAddress(address _addr) public view returns(uint){
        return paymentBalances[_addr].length;
    }
    
    function getPaymentRequestNumberByAddress(address _addr) public view returns(uint){
        return paymentRequests[_addr].length;
    }
    
    function transferMoney(address _to, uint _value) public{
        require(moneyBalances[msg.sender] >= _value);
        moneyBalances[msg.sender] -= _value;
        moneyBalances[_to] += _value;
    }

    //核心企业给下级企业分发的应收款单据
    function createPaymentSchedule(address _to, uint _dueTime, uint _amount, string companySignature) public{
        //找到dueTime = 0的，也就是自己credit能给出的最大应收款单据
        uint len = paymentBalances[msg.sender].length;
        uint i = 0;
        for (; i < len; i++){
            if (paymentBalances[msg.sender][i].dueTime == 0){
                break; //找到了~
            }
        }
        require(i < len, "Your company does not register in the bank"); //没权限，金融机构信不过
        require(paymentBalances[msg.sender][i].amount > _amount, "Your company does not have enough credit to make such payment");//有权限，但是不足
        paymentBalances[msg.sender][i].amount -= _amount;
        PaymentSchedule ps = paymentBalances[msg.sender][i];
        paymentBalances[_to].push(PaymentSchedule(msg.sender, _dueTime, _amount, ps.amount, _amount, now, companySignature, ps.bankSignature));
    }

    //针对某一个具体的payment发起付款
    function payForPaymentSchedule(address _to, uint paymentID, uint _amount) public{
        require(paymentID >= 0 && paymentID < paymentBalances[_to].length);
        require(msg.sender == paymentBalances[_to][paymentID].payerAddr); //确实应该是我付款
        require(_amount <= paymentBalances[_to][paymentID].amount); //当然不会多付款
        require(_amount <= moneyBalances[msg.sender]);
        if (_amount == paymentBalances[_to][paymentID].amount){
            deletePayment(_to, paymentID);
        } else {
            paymentBalances[_to][paymentID].amount -= _amount;
        }
        //我直接的信用就回来了
        uint id = getSelfCreditPayment(msg.sender);
        if (id < paymentBalances[msg.sender].length){
            paymentBalances[msg.sender][id].amount += _amount;
        }
        moneyBalances[msg.sender] -= _amount;//账号上的前少了
        moneyBalances[_to] += _amount;
        emit OnPaymentResponseEvent(_to, msg.sender, paymentID);
    }

    
        // 用户调用这个来对核心企业发出付款请求
    function requestForPayment(uint paymentID) public{
        require(paymentID >= 0 && paymentID < paymentBalances[msg.sender].length);
        PaymentSchedule payment = paymentBalances[msg.sender][paymentID];
        require(now >= payment.dueTime);
        emit OnPaymentRequestEvent(msg.sender, payment.payerAddr, paymentID);//触发事件
        paymentRequests[payment.payerAddr].push(PaymentRequest(msg.sender, paymentID, payment.payerAddr, payment.dueTime, payment.amount));
    }
    
    function getPaymentRequest(address _addr, uint _index) public view returns(address owner, uint paymentID, address payerAddr, uint dueTime, uint amount){
        PaymentRequest pr = paymentRequests[_addr][_index];
        // require(_index >= 0 && _index < paymentRequests[_addr].length, "out of range");
        return (pr.owner, pr.paymentID, pr.payerAddr, pr.dueTime, pr.amount);
    }

    //获得它的应收账款
    function getBalance(address addr) public view returns(uint){
        uint len = paymentBalances[addr].length;
        uint sum = 0;
        for (uint i = 0; i < len; i++){
            sum += paymentBalances[addr][i].amount;
        }
        return sum;
    }

    //获得在due time前得收到款的payment
    function getBalance(address addr, uint dueTime) public view returns(uint){
        uint len = paymentBalances[addr].length;
        uint sum = 0;
        for (uint i = 0; i < len; i++){
            if (paymentBalances[addr][i].dueTime <= dueTime){
                sum += paymentBalances[addr][i].amount;
            }
        }
        return sum;
    }
    
    function getPaymentSchedule(address _addr, uint _paymentID) public view returns(address payerAddr_, uint dueTime_, uint amount_){
        PaymentSchedule storage ps = paymentBalances[_addr][_paymentID];
        require(_paymentID >= 0 && _paymentID < paymentBalances[_addr].length, "out of range");
        return (ps.payerAddr, ps.dueTime, ps.amount);
    }

    //贷款请求
    function requestLoad(uint amount) public {
        loanRequests.push(LoanRequest(msg.sender, amount));
        emit OnLoadRequestEvent(msg.sender, amount);
    }

    function responseLoan(address requesterAddr, uint requestAmount) public onlyOwner{
        //获得它应收款数量
        uint sum = getBalance(requesterAddr); 
        if (sum >= requestAmount){
            //收款数足够多，那么我们相信有还款能力
            loans.push(LoanInfo(requesterAddr, requestAmount, 0, 0));
            emit OnLoadResponseEvent(requesterAddr, requestAmount, true);
        } 
    }

    //接收并发布贷款信息
    function acceptLoan(address requesterAddr, uint requestAmount) public onlyOwner{
        loans.push(LoanInfo(requesterAddr, requestAmount, 0, 0));
        emit OnLoadResponseEvent(requesterAddr, requestAmount, true);
    }

    //拒绝贷款信息
    function rejectLoan(address requesterAddr, uint requestAmount) public onlyOwner{
        emit OnLoadResponseEvent(requesterAddr, requestAmount, false);
    }
    
    function getLoanNumber() public view returns(uint){
        return loans.length;
    }
    
    function getLoanInfo(uint index) public view returns(address claimerAddr, uint principleAmount, uint interestAmount, uint paidAmount){
        LoanInfo loan = loans[index];
        return (loan.claimerAddr, loan.principleAmount, loan.interestAmount, loan.paidAmount);
    }
    
    function updateLoanInfo(uint index, uint interestAmount, uint paidAmount){
        loans[index].interestAmount = interestAmount;
        loans[index].paidAmount = paidAmount;
    }
    
    function getLoanRequestNumber() public view returns(uint){
        return loanRequests.length; 
    }
    
    function getLoanRequest(uint index) public view returns(address claimerAddr, uint amount){
        LoanRequest lr = loanRequests[index];
        return (lr.claimerAddr, lr.amount);
    }
    
    function deleteLoanRequest(uint index) public{
        uint len = loanRequests.length;
        require(index >= 0 && index < len);
        loanRequests[index] = loanRequests[len - 1];
        loanRequests.length --;
    }

    //转款转移或者付清的时候就要清零
    function deletePayment(address addr, uint index) internal{
        uint len = paymentBalances[addr].length;
        require(index >= 0 && index < len);
        //把最后一个元素补到空位上面啦
        paymentBalances[addr][index] = paymentBalances[addr][len - 1];
        //长度减少1
        paymentBalances[addr].length--;
    }

    function deletePaymentRequest(address addr, uint index) public{
        uint len = paymentRequests[addr].length;
        require(index >= 0 && index < len);
        //把最后一个元素补到空位上面啦
        paymentRequests[addr][index] = paymentRequests[addr][len - 1];
        //长度减少1
        paymentRequests[addr].length--;
    }

    //获得直接的payment credit
    function getSelfCreditPayment(address addr) internal returns(uint) {
        uint len = paymentBalances[addr].length;
        uint i = 0;
        for (; i < len; i++){
            if (paymentBalances[addr][i].dueTime == 0){
                break; //找到了~
            }
        }
        return i;
    }
}