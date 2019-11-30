const EthCrypto = require("eth-crypto");
const paillier = require("./paillier");
const bigInt = require('big-integer');
const fs = require("fs");
const Fisco_bcos = require("../fisco_bcos_api");
var path = "./server/data/key.json";

exports.address = [];

exports.getAllAddress = function(callback){
    Fisco_bcos.getLocalKeyStores(function(data){
        exports.address = data;
    });
};

exports.getPrivateAddress = function(callback){
    Fisco_bcos.getLocalKeyStores(function(data){
        for (var i = 0; i < data.length; i++){
            if (data[i].address == Fisco_bcos.currentAddress){
                callback(data[i].privateKey);
            }
        }
        callback(null);
    });
};

exports.signMessage = function(message, privateKey){
    var messageHash = EthCrypto.hash.keccak256(message);
    var signature = EthCrypto.sign(
        privateKey,
        messageHash
    );
    return signature;
};

exports.paillierPublicKeyStringify = function(publicKey){
    return JSON.stringify(publicKey);
};


exports.paillierPublicKeyParse = function(key){
    var tmp = key;
    var publicKey = {
        n : bigInt(tmp.n),
        _n2 : bigInt(tmp._n2),
        g : bigInt(tmp.g)
    };
    console.log(tmp.n);
    console.log(bigInt(tmp.n).pow(2));
    return new paillier.PublicKey(parseInt(tmp.n), tmp.g);
};

exports.paillierPrivateKeyStringify = function(privateKey){
    return JSON.stringify({
        lambda: privateKey.lambda,
        mu : privateKey.mu,
        _p : privateKey._p,
        _q : privateKey._q
    });
};


exports.paillierPrivateKeyParse = function(privateKeyStr, publicKey){
    // var tmp = JSON.parse(privateKeyStr);
    // console.log(publicKey);
    var tmp = privateKeyStr;
    var key = new paillier.PrivateKey(tmp.lambda, tmp.mu, tmp._p, tmp._q, publicKey);
    return key;
};

exports.paillierEncrypt = function(number, publicKey){
    return publicKey.encrypt(number);
};

exports.paillierDecrypt = function(cipher, privateKey){
    return privateKey.decrypt(cipher);
};

exports.paillierAddition = function(cipher1, cipher2){
    return publicKey.addition(c1, c2);
};


exports.paillierGenerateRandomKeys = function(){
    return paillier.generateRandomKeys(32);
};

exports.usersPaillierKeys = []

exports.getPaillierKeys = function(callback){
    fs.readFile(path, "utf-8", function(err, data){
        if (err){
            callback(err);
            return;
        }
        // console.log("data:",data);
        var users = JSON.parse(data).users;
        for (var i = 0; i < users.length; i++){
            var user = {};
            user.username = users[i].username;
            user.PaillierPublicKey = exports.paillierPublicKeyParse(users[i].paillierPublicKeyStr);
            user.PaillierPrivateKey = exports.paillierPrivateKeyParse(users[i].paillierPrivateKeyStr, user.PaillierPublicKey);
            exports.usersPaillierKeys.push(user);
        }
        callback(exports.usersPaillierKeys);
    });
};

exports.getUserPaillierKey = function(username){
    if (exports.usersPaillierKeys.length > 0){
        for (var i = 0; i < exports.usersPaillierKeys.length; i++){
            if (exports.usersPaillierKeys[i].username == username){
                return exports.usersPaillierKeys[i];
            }
        }
    } else {
        var res = [];
        exports.getPaillierKeys(function(data){
            for (var i = 0; i < exports.usersPaillierKeys.length; i++){
                if (exports.usersPaillierKeys[i].username == username){
                    res.push(exports.usersPaillierKeys[i])
                    break;
                }
            }
        });
        if (res.length > 0){
            return res[0];
        }
    }
    return null;
};