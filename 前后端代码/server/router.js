const express = require('express');
const router = express.Router();
const check = require('./check');
const checkLogin = check.checkLogin;
const checkNotLogin = check.checkNotLogin;
var User = require("./user");
var FiscoBcos = require("./fisco_bcos_api");
var SupplyChain = require("./contracts_scripts/SupplyChain");
var SupplyChainToken = require("./contracts_scripts/SupplyChainToken");
var Loan = require("./contracts_scripts/Loan");
var AssetManagement = require("./contracts_scripts/AssetManagement");

router.get("/", function(req, res){
	console.log("init");
	FiscoBcos.getContractList();
	res.send();
});

// 登录
router.post('/admin/signin', function (req, res) {
	// console.log(req.body.userInfo);
	var username = req.body.userInfo.username;
	var password = req.body.userInfo.password;
	console.log(req.body.userInfo);
	
	User.getAllUser(function(err, users){
		if (err){
			console.log(err);
			res.status(500).send();
		}
		// console.log(users);
		if (users.find(function(item){
			return item.username == username && item.password == password;
		})){
			res.send();
			FiscoBcos.setCurrentAddressByUsername(username, function(){
				console.log(FiscoBcos.currentAddress);
			});
		} else {
			res.status(500).send();
		}
	});
	
	
});

router.get("/test", function (req, res) {
	console.log("test");
	SupplyChain.getAllCompanies(function(data){
		res.send(data);
	});
});

router.get("/data/localKeyStores", function(req, res){
	FiscoBcos.getLocalKeyStores(function(data){
		res.send(data);
	});
});


// router.get("/data/userNumber", function(req, res){
// 	FiscoBcos.getLocalKeyStores(function(data){
// 		res.send(data.length);
// 	});
// });

router.get("/data/getAllCompanies", function (req, res) {
	SupplyChain.getAllCompanies(function(data){
		res.send(data);
	});
});

router.get("/data/getAllInvoices", function(req, res){
	SupplyChain.getAllInvoices(function(data){
		res.send(data);
	});
}); 

router.post("/data/registerCompany", function(req, res){
	var companyName = req.body.companyInfo.companyName;
	SupplyChain.registerCompany(companyName, function(data){
		if (data.statusOK){
			res.send();
		}else {
			res.status(500).send();
		}
	});
});

router.post("/data/createInvoice", function(req, res){
	var payeeAddr = req.body.invoiceInfo.payeeAddr;
	var payerAddr = req.body.invoiceInfo.payerAddr;
	var amount    = req.body.invoiceInfo.amount;
	var remark    = req.body.invoiceInfo.remark;
	SupplyChain.createInvoice(payeeAddr, payerAddr, amount, remark, function(data){
		// console.log(data);
		if (data.statusOK){
			res.send();
		}else {
			res.status(500).send();
		}
	});
});

router.post("/bank/distributionToken", function(req, res){
	var toAddress = req.body.tokenInfo.toAddress;
	var value = req.body.tokenInfo.value;
	SupplyChainToken.distributionToken(toAddress, value, function(data){
		if (data.statusOK){
			res.send();
		}else {
			res.status(500).send();
		}
	});
});

router.post("/bank/depositMoney", function(req, res){
	var toAddress = req.body.tokenInfo.toAddress;
	var value = req.body.tokenInfo.value;
	SupplyChainToken.depositMoney(toAddress, value, function(data){
		if (data.statusOK){
			res.send();
		}else {
			res.status(500).send();
		}
	});
});

router.post("/bank/withdrawMoney", function(req, res){
	var toAddress = req.body.tokenInfo.toAddress;
	var value = req.body.tokenInfo.value;
	SupplyChainToken.withdrawMoney(toAddress, value, function(data){
		if (data.statusOK){
			res.send();
		}else {
			res.status(500).send();
		}
	});
});

router.get("/finance/getMoneyBalance", function(req, res){
	SupplyChainToken.getMoneyBalances(FiscoBcos.currentAddress, function(data){
		res.send(data);
	});
});

router.get("/finance/getPaymentBalance", function(req, res){
	SupplyChainToken.getPaymentBalance(FiscoBcos.currentAddress, function(data){
		res.send(data);
	});
});

router.post("/data/deleteCompany", function(req, res){
	var id = req.body.id;
	// console.log(req.body);
	SupplyChain.deleteCompanyById(id, function(data){
		// console.log(data);
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.get("/finance/getAllPaymentScheduleByAddress", function(req, res){
	SupplyChainToken.getAllPaymentScheduleByAddress(FiscoBcos.currentAddress, function(data){
		res.send(data);
	});
});

router.post("/finance/createPaymentSchedule", function(req, res){
	var address = req.body.paymentInfo.address;
	var dueTime = req.body.paymentInfo.dueTime;
	var amount = req.body.paymentInfo.amount;
	SupplyChainToken.createPaymentSchedule(address, dueTime, amount, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.get("/finance/getAllPaymentRequests", function(req, res){
	SupplyChainToken.getAllPaymentRequestByAddress(FiscoBcos.currentAddress, function(data){
		res.send(data);
	});
});

router.post("/finance/requestForPayment", function(req, res){
	var paymentID = req.body.paymentID;
	SupplyChainToken.requestForPayment(paymentID, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.post("/finance/deletePaymentRequest", function(req, res){
	var index = req.body.index;
	SupplyChainToken.deletePaymentRequest(FiscoBcos.currentAddress, index, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.post("/finance/payForPaymentSchedule", function(req, res){
	var toAddress = req.body.paymentInfo.toAddress;
	var paymentID = req.body.paymentInfo.paymentID;
	var amount = req.body.paymentInfo.amount;
	SupplyChainToken.payForPaymentSchedule(toAddress, paymentID, amount, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.post("/finance/transferPayment", function(req, res){
	var address = req.body.paymentInfo.address;
	var value = req.body.paymentInfo.value;
	SupplyChainToken.transferPayment(address, value, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.get("/loan/getAllLoanRequests", function(req, res){
	Loan.getAllLoanRequests(function(data){
		res.send(data);
	});
});

router.post("/loan/deleteLoanRequest", function(req, res){
	var index = req.body.index;
	Loan.deleteLoanRequest(index, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.post("/loan/requestLoad", function(req, res){
	var amount = req.body.amount;
	Loan.requestLoad(amount, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.post("/loan/acceptLoan", function(req, res){
	// console.log(req.body);
	var address = req.body.LoanRequest.address;
	var amount = req.body.LoanRequest.amount;
	console.log(FiscoBcos.currentAddress);
	Loan.acceptLoan(address, amount, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.get("/loan/getAllLoanInfos", function(req, res){
	Loan.getAllLoanInfos(function(data){
		res.send(data);
	});
});

router.post("/loan/updateLoanInfo", function(req, res){
	var index = req.body.LoanInfo.index;
	var interestAmount = req.body.LoanInfo.interestAmount;
	var paidAmount = req.body.LoanInfo.paidAmount;
	Loan.updateLoanInfo(index, interestAmount, paidAmount, function(data){
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.post("/asset/registerAsset", function(req, res){
	var assetName = req.body.Asset.assetName;
	var owner = req.body.Asset.owner;
	var value = req.body.Asset.value;
	// console.log(req.body.Asset);
	AssetManagement.registerAsset(assetName, owner, value, function(data){
		// console.log(data);
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	});
});

router.post("/asset/unregisterAsset", function(req, res){
	var assetName = req.body.Asset.assetName;
	var owner = req.body.Asset.owner;
	AssetManagement.unregisterAsset(assetName, owner, function(data){
		// console.log(req.body);
		// console.log(FiscoBcos.currentAddress);
		// console.log(data);
		if (data.statusOK){
			res.send();
		} else {
			res.status(500).send();
		}
	}); 
}); 

router.get("/asset/getAllAssets", function(req, res){
	AssetManagement.getAllAssets(function(data){
		res.send(data);
	});
});

module.exports = router;
