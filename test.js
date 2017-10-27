var tokenEthRate = 0.00036;
var etherscanApiKey = 'api-here';
var tokenAddress = "address-here";
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var api = require('etherscan-api').init(etherscanApiKey);

web3.eth.defaultAccount = tokenAddress;
var abiArray = JSON.parse(fs.readFileSync('contract.json', 'utf-8'));
var contractAddress = "0x7D5Edcd23dAa3fB94317D32aE253eE1Af08Ba14d";
var tokenPassword = "password";
//var contract = new web3.eth.Contract(abiArray);
function lala(){
var array = fs.readFileSync('tx.csv').toString().split("\n");
var highBlock = 0;
for(i in array) {
    if(parseInt(array[i]) > highBlock){
highBlock = parseInt(array[i]);
}
}
var txlist = api.account.txlist(tokenAddress, highBlock + 1);
txlist.then(function(txData){
e = txData['result'];
//console.log(e[i]['blockNumber']);
fs.readFile("tx.csv", function (err, data) {
for (var i = 0; i < e.length; i++){
console.log(i);
  if (err) throw err;
fs.appendFile("tx.csv", e[i]['blockNumber'] + "\n", function(err) {
    if(err) {
        return console.log(err);
    }
}); 

if (e[i]['from'].toString() != tokenAddress){
var contributorAdd = e[i]['from'];
web3.personal.unlockAccount(tokenAddress,tokenPassword);


estGas = web3.eth.estimateGas({from: tokenAddress, to: contributorAdd, data:web3.eth.contract(abiArray).at(contractAddress).transfer.getData(contributorAdd, (parseFloat(e[i]['value']) / 0.00036), {from: tokenAddress})});
console.log(estGas);
web3.eth.sendTransaction({from: tokenAddress, to: contributorAdd, data:web3.eth.contract(abiArray).at(contractAddress).transfer.getData(contributorAdd, (parseFloat(e[i]['value']) / tokenEthRate), {from: tokenAddress})}, function (err, data){

if (!err){
console.log(data);
}
else{
console.log(err);
}
});


    }
}
});
});
}
lala();
setInterval(lala, 5000);/*
}

/*
*/
