var FiscoBcos = require("../fisco_bcos_api");

var contractName = "AssetManagement";

var contractAddress = null;

exports.functionCall = function(funcName, params, callback){
    contractAddress = FiscoBcos.getContractAddressByName(contractName);
    FiscoBcos.transationHandle(FiscoBcos.currentAddress, contractName, contractAddress, funcName, params, callback);
};

exports.arrayToAssetStruct = function(array){
    return {
        assetName : array[0],
        owner : array[1],
        value : array[2]
    };
};

exports.registerAsset = function(assetName, owner, value, callback){
    exports.functionCall("registerAsset", [assetName, owner, value], callback);
};

exports.getAsset = function(index, callback){
    exports.functionCall("getAsset", [index], callback);
};

exports.getAssetsNumber = function(callback){
    exports.functionCall("getAssetsNumber", [], callback);
};

exports.unregisterAsset = function(assetName, owner, callback){
    exports.functionCall("unregisterAsset", [assetName, owner], callback);
};

exports.getAllAssets = function(callback){
    exports.getAssetsNumber(function(num){
        var assets = [];
        for (var i = 0; i < num; i++){
            exports.getAsset(i, function(asset){
                asset = exports.arrayToAssetStruct(asset);
                assets.push(asset);
                if (assets.length == num){
                    callback(assets);
                }
            });
        }
    });
};
