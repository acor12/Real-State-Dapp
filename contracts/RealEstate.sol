pragma solidity ^0.5.0;

contract RealEstate {
    address payable public seller;
    uint private balance;

    struct PublishedProperty {
        string hash;
        string description;
        uint value;
    }

    PublishedProperty[] public publishedProperties;
    PublishedProperty[] public soldProperties;

    event newProperty(string hash, string description, uint value);

    constructor() public {
        seller = msg.sender;
    }

    modifier onlySeller {
        require (msg.sender == seller, "We have detected that your not our real estate seller. Try again.");
        _;
    }
    modifier onlyBuyer {
        require (msg.sender != seller, "Our real estate seller can't be a buyer");
        _;
    }
    modifier withdrawalBalance {
        require (balance != 0, "You have nothing to withdraw");
        _;
    }

    function newPropertyPublication(string memory hash, string memory description, uint value) public onlySeller {
        publishedProperties.push(PublishedProperty(hash, description, value));
        emit newProperty(hash, description, value);
    }
    function properitiesCount() public view returns (uint) {
        return publishedProperties.length;
    }
    function buyAProperity(uint index) public payable onlyBuyer returns (string memory) {
        balance += msg.value;
        soldProperties.push(publishedProperties[index]);

        delete publishedProperties[index];

        return "Welcome! Home Sweet Home.";
    }
    function getBalance() public view onlySeller returns (uint) {
        return balance;
    }
    function soldPropertiesCount() public view returns (uint) {
        return soldProperties.length;
    }
    function transferBalance() public payable onlySeller withdrawalBalance returns (string memory) {
        seller.transfer(balance);
        balance = 0;
        return "You have successfully withdrawn your balance";
    }
}