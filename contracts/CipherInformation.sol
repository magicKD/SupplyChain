pragma solidity ^0.4.24;

contract CipherInformation{
        //账单调查
    struct BalanceSurvey{
        string ciphertext;
        string paillierPublicKey;
    }
    
    BalanceSurvey[] balanceSurveys;
    
    function createBalanceSurvey(string ciphertext, string paillierPublicKey) public returns(uint index){
        balanceSurveys.push(BalanceSurvey(ciphertext, paillierPublicKey));
        return balanceSurveys.length - 1;
    }
    
    function getBalanceSurvey(uint index) public returns(string ciphertext, string paillierPublicKey){
        uint len = balanceSurveys.length;
        require(index >=0 && index < len, "out of range");
        return (balanceSurveys[index].ciphertext, balanceSurveys[index].paillierPublicKey);
    }
    
    function updateBalance(uint index, string ciphertext) public{
        balanceSurveys[index].ciphertext = ciphertext;
    } 
}