pragma solidity ^0.4.24;

/// Provides basic authorization control
contract Ownable {
    address private currentOwner;

    event TransferOwnership(address indexed oldOwner, address indexed newOwner);

    // Assign the contract to an owner
    constructor () internal {
        currentOwner = msg.sender;
        emit TransferOwnership(address(0), currentOwner);
    }

    function owner() public view returns (address) {
        return currentOwner;
    }

    // Define a function modifier 'onlyOwner'
    modifier onlyOwner() {
        require(msg.sender == currentOwner);
        _;
    }

    modifier self_OR_Owner(address addr){
        require(msg.sender == currentOwner || msg.sender == addr);
        _;
    }

    /// Define a function to renounce ownerhip
    function renounceOwnership() public onlyOwner {
        emit TransferOwnership(currentOwner, address(0));
        currentOwner = address(0);
    }

    /// Define a public function to transfer ownership
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit TransferOwnership(currentOwner, newOwner);
        currentOwner = newOwner;
    }
}
