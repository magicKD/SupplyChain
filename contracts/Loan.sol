pragma solidity ^0.4.24;

import "./Ownable.sol";

contract Loan is Ownable{
    
    event OnLoadRequestEvent(address requester, uint requestAmount);
    event OnLoadResponseEvent(address requester, uint requestAmount, bool result);
    
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
    
        //贷款信息
    LoanInfo[] loans;
    //贷款申请信息
    LoanRequest[] loanRequests;
    
    //贷款请求
    function requestLoad(uint amount) public {
        loanRequests.push(LoanRequest(msg.sender, amount));
        emit OnLoadRequestEvent(msg.sender, amount);
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
}