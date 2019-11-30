pragma solidity ^0.4.24;

contract SupplyChain{


    struct Company{
        address companyAddr;
        uint companyID;
        string name;
    }

    uint companyNum;
    // mapping (uint => Company) companies;
    Company[] companies;
    mapping(string => uint) companyNameToId;

    // event CompanyID(uint companyID, string companyName);

    //发票，完成相对应的采购记录后就上链保存
    struct Invoice{
        uint invoiceID; //发票号
        address payeeAddr; //收款方
        address payerAddr; //付款方
        uint amount; //金额
        uint timestamp; //建立的时间戳
        string remark; //相关备注
    }

    uint invoiceNum;
    // mapping (uint => Invoice) invoices;
    Invoice[] invoices;

    modifier onlyOwner(address _id){
        require(msg.sender == _id);
        _;
    }

    //构造函数
    constructor() public{
        companyNum = 0;
    }

    //注册公司
    function registerCompany(string companyName) public returns(uint) {
        address companyAddr = msg.sender;
        for (uint i = 0; i < companyNum; i++){
            require(!equalTo(companyName, companies[i].name), "Company name already exists");
            require(companyAddr != companies[i].companyAddr, "Company address already exists");
        }
        uint companyID = companyNum++;
        companyNameToId[companyName] = companyID;
        companies.push(Company(companyAddr, companyID, companyName));
        // companies[companyID] = Company(companyAddr, companyID, companyName);
        // emit CompanyID(companyID, name);
        return companyID;
    }
    
    function deleteMyCompany(address addr) public {
        uint id = 0;
        for (; id < companyNum; id++){
            if (addr == companies[id].companyAddr) {
                break;
            }
        }
        require(id < companyNum, "Can not find the company!");
        deleteCompany(id);
    }
    
    function deleteCompany(uint index) public{
        uint len = companies.length;
        require(index >= 0 && index < len);
        //把最后一个元素补到空位上面啦
        companies[index] = companies[len - 1];
        //长度减少1
        companies.length--;
        companyNum--;
    }

    function getCompany(uint id) public view returns (address companyAddr, uint companyID, string name){
        require(id >= 0 && id < companyNum);
        return (companies[id].companyAddr, companies[id].companyID, companies[id].name);        
    }

    function getCompanyNum() public view returns (uint){
        return companyNum;
    }
    
    function getCompanyByAddress(address addr) public view returns (address companyAddr, uint companyID, string name){
        uint id = 0;
        for (; id < companyNum; id++){
            if (addr == companies[id].companyAddr) {
                break;
            }
        }
        require(id < companyNum, "Can not find the company!");
        return (companies[id].companyAddr, companies[id].companyID, companies[id].name); 
    }
    
    //字符串 string compare function
    function equalTo(string _a, string _b) private pure returns (bool){
        return keccak256(_a) == keccak256(_b);
    }

    //创建发票，应该由付款方主动发起
    function createInvoice(address payeeAddr, address payerAddr, uint amount, string mark) public onlyOwner(payerAddr) returns(uint){
        uint invoiceID = invoiceNum++;
        invoices.push(Invoice(invoiceID, payeeAddr, payerAddr, amount, now, mark));
        // invoices[invoiceID] = Invoice(invoiceID, payeeAddr, payerAddr, amount, now, mark);
        return invoiceID;
    }

    function getInvoiceNum() public view returns (uint){
        return invoiceNum;
    }
    
    function getInvoice(uint id) public view returns (uint invoiceID, address payeeAddr, address payerAddr, uint amount, string remark, uint timestamp){
        require(id >= 0 && id < invoiceNum);
        return (invoices[id].invoiceID, invoices[id].payeeAddr, invoices[id].payerAddr, invoices[id].amount, invoices[id].remark, invoices[id].timestamp);
    }
}