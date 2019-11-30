pragma solidity ^0.4.24;
import "./Ownable.sol";


contract PublicKeyManagement is Ownable{
    
    mapping(address => string) signaturePublicKey;
    
    mapping(address => string) paillierPublicKey;
    
    function registerSignaturePublicKey(address addr, string key) public self_OR_Owner(addr){
        // require(msg.sender == addr || msg.sender == currentOwner);
        signaturePublicKey[addr] = key;    
    }
    
    function registerPaillierPublicKey(address addr, string key) public self_OR_Owner(addr){
        paillierPublicKey[addr] = key;
    }
    
    function getSignaturePublicKey(address addr) public view returns(string){
        return signaturePublicKey[addr];
    }
    
    function getPaillierPublicKey(address addr) public view returns (string){
        return paillierPublicKey[addr];
    }
}