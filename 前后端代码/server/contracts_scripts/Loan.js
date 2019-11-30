var FiscoBcos = require("../fisco_bcos_api");

var contractName = "Loan";

var contractAddress = null;

exports.functionCall = function(funcName, params, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, funcName, params, callback);
};

//申请贷款
exports.requestLoad = function(amount, callback){
    exports.functionCall("requestLoad", [amount], callback);
};

//贷款的数据结构
exports.arrayToLoanInfoStruct = function(array){
    return {
        "claimerAddr" : array[0],
        "principleAmount": array[1],
        "interestAmount" : array[2],
        "paidAmount" : array[3]
    };
};

//接受贷款
exports.acceptLoan = function(address, amount, callback){
    exports.functionCall("acceptLoan", [address, amount], callback);
};

exports.getLoanNumber = function(callback){
    exports.functionCall("getLoanNumber", [], callback);
};

exports.getLoanInfo = function(index, callback){
    exports.functionCall("getLoanInfo", [index], callback);
};

exports.updateLoanInfo = function(index, interestAmount, paidAmount, callback){
    exports.functionCall("updateLoanInfo", [index, interestAmount, paidAmount], callback);
};

//获得所有的贷款信息
exports.getAllLoanInfos = function(callback){
    exports.getLoanNumber(function(num){
        var loanInfos = [];
        for (var i = 0; i < num; i++){
            // var id = function() {return i;}();
            exports.getLoanInfo(i, function(loan){
                loan = exports.arrayToLoanInfoStruct(loan);
                loanInfos.push(loan);
                if (loanInfos.length == num){
                    callback(loanInfos);
                }
            });
        }
    });
};

//贷款申请的数据集
exports.arrayToLoanRequestStruct = function(array){
    return {
        "claimerAddr" : array[0],
        "amount" : array[1]
    };
};

exports.requestLoad = function(amount, callback){
    exports.functionCall("requestLoad", [amount], callback);
};

exports.getLoanRequestNumber = function(callback){
    exports.functionCall("getLoanRequestNumber", [], callback);
};

exports.getLoanRequest = function(index, callback){
    exports.functionCall("getLoanRequest", [index], callback);
};

exports.deleteLoanRequest = function(index, callback){
    exports.functionCall("deleteLoanRequest", [index], callback);
};

exports.getAllLoanRequests = function(callback){
    exports.getLoanRequestNumber(function(num){
        var loanRequests = []
        for (var i = 0; i < num; i++){
            exports.getLoanRequest(i, function(loanRequest){
                loanRequest = exports.arrayToLoanRequestStruct(loanRequest);
                loanRequests.push(loanRequest);
                if (loanRequests.length == num){
                    callback(loanRequests);
                }
            });
        }
    });
};
