pragma solidity ^0.5.0;

contract RealEstate {
    address payable public seller;
    uint private balance;
    uint[] public index;

    struct PublishedProperty {
        string hash;
        string name;
        string description;
        uint price;
        bool sold;
    }

    PublishedProperty[] public publishedProperties;

    event newProperty(string hash, string name, string description, uint price);

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

    function newPropertyPublication(string memory hash, string memory name, string memory description, uint price) public onlySeller {
        publishedProperties.push(PublishedProperty(hash, name, description, price, false));
        index.push(publishedProperties.length);
        emit newProperty(hash, name, description, price);
    }
    function properitiesCount() public view returns (uint[] memory) {
        return index;
    }
    function getProperty(uint _index) public view returns (string memory, string memory, string memory, uint, bool) {
        PublishedProperty memory property = publishedProperties[_index];
        return (property.hash, property.name, property.description, property.price, property.sold);
    }
    function buyAProperity(uint _index) public payable onlyBuyer returns (string memory) {
        balance += msg.value;
        publishedProperties[_index].sold = true;

        return "Welcome! Home Sweet Home.";
    }
    function getBalance() public view onlySeller returns (uint) {
        return balance;
    }
    function transferBalance() public payable onlySeller withdrawalBalance returns (string memory) {
        seller.transfer(balance);
        balance = 0;
        return "You have successfully withdrawn your balance";
    }
}