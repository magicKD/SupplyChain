var FiscoBcos = require("../fisco_bcos_api");
var KeyManagement = require("../lib/keyManagement");

var contractName = "SupplyChainToken";

var contractAddress = null;

//分发代币
exports.distributionToken = function(toAddress, value, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    var signature = "null";
    try{
        var message = String(toAddress) + String(value);
        signature = KeyManagement.signMessage(message, FiscoBcos.currentPrivateKey);
    } catch(e){
        console.log(e);
    }
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "distributeToken", [toAddress, value, signature], callback);
};

//存款业务
exports.depositMoney = function(toAddress, value, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "depositMoney", [toAddress, value], callback);
};

//取款业务 withdrawMoney
exports.withdrawMoney = function(toAddress, value, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "withdrawMoney", [toAddress, value], callback);
};

//核心企业给下级企业分发的应收款单据
exports.createPaymentSchedule = function(toAddress, dueTime, amount, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "createPaymentSchedule", [toAddress, dueTime, value], callback);
};

exports.getMoneyBalances = function(address, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    // console.log(FiscoBcos.currentAddress);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "getMoneyBalances", [address], callback);
};

exports.getPaymentBalance = function(address, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    console.log(FiscoBcos.currentAddress);
    console.log(address)
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, "getBalance", [address], callback);
};


exports.functionCall = function(funcName, params, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, funcName, params, callback);
};

exports.getPaymentNumberByAddress = function(address, callback){
    exports.functionCall("getPaymentNumberByAddress", [address], callback);
};

exports.arrayToPaymentScheduleStruct = function(array, id){
    return {
        "payerAddr": array[0],
        "dueTime": array[1],
        "amount": array[2],
        "paymentID": id
    };
};

exports.getPaymentSchedule = function(address, paymentID, callback){
    exports.functionCall("getPaymentSchedule", [address, paymentID], callback);
};

exports.getAllPaymentScheduleByAddress = function(address, callback){
    exports.getPaymentNumberByAddress(address, function(num){
        var paymentSchedules = [];
        for (var i = 0; i < num; i++){
            var id = function(){return i;}()
            exports.getPaymentSchedule(address, i, function(payment){
                console.log(id);
                payment = exports.arrayToPaymentScheduleStruct(payment, id);
                paymentSchedules.push(payment);
                if (paymentSchedules.length == num){
                    callback(paymentSchedules);
                }
            });
        }
    });
};

exports.createPaymentSchedule = function(address, dueTime, amount, callback){
    var signature = "null";
    try{
        var message = String(FiscoBcos.currentAddress) + String(dueTime) + String(amount);
        signature = KeyManagement.signMessage(message, FiscoBcos.currentPrivateKey);
    } catch(e){
        console.log(e);
    }
    exports.functionCall("createPaymentSchedule", [address, dueTime, amount, signature], callback);
};

exports.transferPayment = function(address, value, callback){
    exports.functionCall("transferPayment", [address, value], callback);
}; 

exports.getPaymentRequestNumberByAddress = function(address, callback){
    exports.functionCall("getPaymentRequestNumberByAddress", [address], callback);
};

exports.getPaymentRequest = function(address, paymentID, callback){
    exports.functionCall("getPaymentRequest", [address, paymentID], callback);
};

exports.arrayToPaymentRequestStruct = function(array){
    return {
        "owner": array[0],
        "paymentID": array[1],
        "payerAddr": array[2],
        "dueTime": array[3],
        "amount": array[4]
    };
};

//返回所有请求的列表
exports.getAllPaymentRequestByAddress = function(address, callback){
    exports.getPaymentRequestNumberByAddress(address, function(num){
        var paymentRequests = [];
        if (num == 0){
            callback(paymentRequests);
            return ;
        }
        for (var i = 0; i < num; i++){
            exports.getPaymentRequest(address, i, function(paymentRequest){
                paymentRequest = exports.arrayToPaymentRequestStruct(paymentRequest);
                paymentRequests.push(paymentRequest);
                if (paymentRequests.length == num){
                    callback(paymentRequests);
                }
            });
        }
    });
};

exports.requestForPayment = function(paymentID, callback){
    exports.functionCall("requestForPayment", [paymentID], callback);
};

exports.deletePaymentRequest = function(address, index, callback){
    exports.functionCall("deletePaymentRequest", [address, index], callback);
};

exports.payForPaymentSchedule = function(address, paymentID, amount, callback){
    exports.functionCall("payForPaymentSchedule", [address, paymentID, amount], callback);
};

exports.transferPayment = function(address, value, callback){
    exports.functionCall("transferPayment", [address, value], callback);
};