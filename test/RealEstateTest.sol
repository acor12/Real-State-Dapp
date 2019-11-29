pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "../contracts/RealEstate.sol";
import "truffle/DeployedAddresses.sol";

contract RealEstateTest {
    uint public initialBalance = 10 ether;
    function testIsASellerOfDeployedContract() public {
        RealEstate realEstate = RealEstate(DeployedAddresses.RealEstate());
        Assert.equal(realEstate.seller(), msg.sender, "Your not the seller");
    }
    function testGetAllBalance() public {
        RealEstate realEstate = new RealEstate();
        Assert.equal(realEstate.getBalance(), 0, "Your balance is different than 0");
    }
    function testGetSoldProperitiesCount() public {
        RealEstate realEstate = new RealEstate();
        Assert.equal(realEstate.soldPropertiesCount(), 0, "Sold properties count is different than 0");
    }
}
