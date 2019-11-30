pragma solidity ^0.4.24;

import "./Ownable.sol";

contract AssetManagement is Ownable{
    
    struct Asset{
        string assetName;
        address owner;
        uint value;
    }
    
    Asset[] assets;
    
    function registerAsset(string assetName, address owner, uint value) public onlyOwner{
        assets.push(Asset(assetName, owner, value));
    }
    
    function getAssetsNumber() public view returns(uint){
        return assets.length;
    }
    
    function getAsset(uint index) public view returns(string assetName, address owner, uint value){
        uint len = assets.length;
        require(index >= 0 && index < len, "out of range");
        return (assets[index].assetName, assets[index].owner, assets[index].value);
    }
    
    function unregisterAsset(string assetName, address owner) public onlyOwner{
        for (uint i = 0; i < assets.length; i++){
            if (equalTo(assets[i].assetName, assetName) && assets[i].owner == owner){
                deleteAsset(i);
            }
        }
    }
    
    function deleteAsset(uint index) internal{
        uint len = assets.length;
        require(index >= 0 && index < len, "out of range");
        assets[index] = assets[len - 1];
        assets.length -= 1;
    }
    
    function equalTo(string _a, string _b) private pure returns (bool){
        return keccak256(_a) == keccak256(_b);
    }
}