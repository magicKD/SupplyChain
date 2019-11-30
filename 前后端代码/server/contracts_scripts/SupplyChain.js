var FiscoBcos = require("../fisco_bcos_api");

var contractName = "SupplyChain";

var contractAddress = null;

exports.registerCompany = function(companyName, callback){
    // console.log(FiscoBcos.currentAddress);
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    // console.log(contractAddress);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "registerCompany", [companyName], callback);
};

exports.deleteMyCompany = function(callback){
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "deleteMyCompany", [FiscoBcos.currentAddress], callback);
};

exports.deleteCompanyById = function(id, callback){
    // console.log("what???????????/");
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "deleteCompany", [id], callback);
};

exports.getCompany = function(id, callback){
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "getCompany", [id], callback);
};

exports.getInvoice = function(id, callback){
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "getInvoice", [id], callback);
};

exports.getCompanyNum = function(callback){
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "getCompanyNum", [], callback);
};

exports.getInvoiceNum = function(callback){
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "getInvoiceNum", [], callback);
};

exports.createInvoice = function(payeeAddr, payerAddr, amount, remark, callback){
    contractAddress = FiscoBcos.getContractAddressByName("SupplyChain");
    FiscoBcos.transationHandle(payerAddr, contractName, contractAddress, "createInvoice", [payeeAddr,payerAddr, amount, remark], callback);
};

exports.getAllCompanies = function(callback){
    exports.getCompanyNum(function(num){
        var companies = [];
        for (var i = 0; i < num; i++){
            exports.getCompany(i, function(company){
                company = exports.arrayToCompanyStruct(company);
                companies.push(company);
                if (companies.length == num){
                    callback(companies); //机智的我
                }
            });
        }
        // callback(companies);
    });
};

exports.getAllInvoices = function(callback){
    exports.getInvoiceNum(function(num){
        var invoices = [];
        for (var i = 0; i < num; i++){
            exports.getInvoice(i, function(invoice){
                invoice = exports.arrayToInvoiceStruct(invoice);
                invoices.push(invoice);
                if (invoices.length == num){
                    callback(invoices);
                }
            });
        }
    });
};

//将数组转换成Company类型
exports.arrayToCompanyStruct = function(array){
    return {
        "companyAddr": array[0],
        "companyID": array[1],
        "name": array[2]
    };
};

//账单的数据结构
exports.arrayToInvoiceStruct = function(array){
    return {
        "invoiceID": array[0],
        "payeeAddr": array[1],
        "payerAddr": array[2],
        "amount"   : array[3],
        "remark"   : array[4],
        "timestamp": array[5]
    };
};

