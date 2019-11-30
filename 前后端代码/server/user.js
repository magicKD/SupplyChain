var FiscoBcos = require("./fisco_bcos_api");

var fs = require("fs");

var dbPath = "./server/data/users.json";

exports.getAllUser = function(callback){
    fs.readFile(dbPath, "utf8", function(err, data){
        if (err){
            return callback(err);
        }
        callback(null, JSON.parse(data).users);
    });
};

exports.addUser = function(user, callback){
    FiscoBcos.newAddress(user.username, function(data){
        if (data.address){
            //创建成功
            fs.readFile(dbPath, "utf8", function(err, data){
                if (err) {
                    return callback(err);
                }
                var users = JSON.parse(data).users;
                
                console.log("the added user is ", user);
        
                //repeat the username
                if (users.find(function(item){
                    return item.username === user.username;
                })){
                    // console.log("user:",user);
                    return callback(false);
                }
        
                users.push(user);
        
                var fileData = JSON.stringify({
                    users: users
                });
        
                fs.writeFile(dbPath, fileData, function(err){
                    if (err){
                        return callback(err);
                    }
                    callback(null);
                });
            });
        } else {
            //创建失败
            callback(false);
        }
    });
    return ;
};

exports.getUserByName = function(username, callback){
    fs.readFile(dbPath, "utf8", function(err, data){
        if (err){
            return callback(err);
        }
        var users = JSON.parse(data).users;
        var user = users.find(function (item){
            return item.username === username;
        });
        callback(user);
    }); 
}
