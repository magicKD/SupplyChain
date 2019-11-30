var FiscoBcos = require("../fisco_bcos_api");

var contractName = "PublicKeyManagement";

var contractAddress = null;

exports.functionCall = function(funcName, params, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, funcName, params, callback);
};

exports.registerSignaturePublicKey = function(addr, key, callback){
    exports.functionCall("registerSignaturePublicKey", [addr, key], callback);
};

exports.registerPaillierPublicKey = function(addr, key, callback){
    exports.functionCall("registerPaillierPublicKey", [addr, key], callback);
};

exports.getSignaturePublicKey = function(addr, callback){
    exports.functionCall("getSignaturePublicKey", [addr], callback);
};

exports.getPaillierPublicKey = function(addr, callback){
    exports.functionCall("getPaillierPublicKey", [addr], callback);
};