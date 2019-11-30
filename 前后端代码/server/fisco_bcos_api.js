
var http = require("http");

var ipAddress = "172.19.60.62";
var port = 7002;

//http get for webase api
exports.httpGet = function (path, callback){
    var req = http.get({
        hostname:ipAddress,
        port:port,
        path: path,
    }, function(response){
        var dataStr = "";
        response.on("data", (data) => {
            dataStr += data.toString();
            // var parsedData = JSON.parse(data.toString());
            // callback(parsedData);
        });
        response.on("end", (data) => {
            var parsedData = JSON.parse(dataStr);
            callback(parsedData);
        }) 
    });
    req.on("error", function(error){
        console.log("problem with get request:", error.message); 
    });
    req.end();
}

var httpGet = exports.httpGet;

//http post for webase api
exports.httpPost = function (path, jsonData, callback){
    var contents = jsonData;
    var options = {
        hostname:ipAddress,
        port:port,
        path:path, 
        method:"POST",
        headers: {
            'Content-Type':'application/json',
            // 'Content-Length':contents.length
        }
    };

    var req = http.request(options, function(res){
        res.setEncoding("utf-8");
        var dataStr = "";
        res.on("data", function(data){
            dataStr += data.toString();
        });
        res.on("end", (data) => {
            var parsedData = JSON.parse(dataStr);
            callback(parsedData);
        });
    });
    req.on("error", function(error){
        console.log("problem with post request:", error.message);
    });
    req.write(contents);
    req.end();
};

var httpPost = exports.httpPost;

//当前的用户，账号
// exports.currentAddress = "0xfe2333260df1e39f5884c19e7b3a4c246e09e780";

exports.contractInfo = []

exports.getLocalKeyStores = function(callback){
    httpGet("/WeBASE-Front/privateKey/localKeyStores", callback);
};

//交易处理，合约函数调用
exports.transationHandle = function(userAddress, contractName, contractAddress, funcName, funcParam, callback){
    var path = "/WeBASE-Front/trans/handle";
    var contents = JSON.stringify({
        "useAes":false,
        "user":userAddress,
        "contractName": contractName,
        "contractAddress": contractAddress,
        "funcName": funcName,
        "funcParam": funcParam,
        "groupId": "1",
    });
    httpPost(path, contents, callback);
};

//获取新的私钥
exports.newAddress = function(userName, callback){
    var path = "/WeBASE-Front/privateKey?useAes=false&type=0&userName=" + userName;
    httpGet(path, callback);
};

exports.getContractList = function(callback){
    var path = "/WeBASE-Front/contract/contractList";
    var contents = JSON.stringify({
        "groupId": "1",
        "pageNumber": 0,
        "pageSize": 10,
        "contractName": "",
        "contractAddress": "",
        "contractStatus": 2
    });
    httpPost(path, contents, callback);
};

//设置当前用户的地址
exports.setCurrentAddressByUsername = function(userName, callback){
    exports.getLocalKeyStores(function(users){
        // console.log(users);
        for (var i = 0; i < users.length; i++){
            if (userName == users[i].userName){
                // console.log(users[i].address);
                exports.currentAddress = users[i].address;
                exports.currentPublicKey = users[i].publicKey;
                exports.currentPrivateKey = users[i].privateKey;
                callback();
                return ;
            }
        }
        console.log("could not find the user's address");
        // console.log();
        callback();
    });
};

exports.getContractList(function(data){
    // console.log(data);
     
    exports.contractInfo = [];
    for (var i = 0; i < data.data.length; i++){
        exports.contractInfo.push({
            contractName:data.data[i].contractName, 
            contractAddress:data.data[i].contractAddress
        });
    }
});

exports.getContractAddressByName = function(contractName){
    for (var i = 0; i < exports.contractInfo.length; i++){
        if (contractName == exports.contractInfo[i].contractName){
            return exports.contractInfo[i].contractAddress;
        }
    }
    return null;
};