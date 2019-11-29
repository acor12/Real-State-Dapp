const RealEstate = artifacts.require("RealEstate");
const truffleAssert = require("truffle-assertions");

contract("RealEstate", (accounts) => {
    let realEstate;
    let firstAccount = accounts[0];
    let secondAccount = accounts[1];

    beforeEach(async () => {
        realEstate = await RealEstate.new({ from: firstAccount });
    })

    it("set a Seller", async () => {
        assert.equal(await realEstate.seller.call(), firstAccount);
    })
    it("add a new properity", async () => {
        let property = await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'asdd', 0);
        truffleAssert.eventEmitted(property, 'newProperty', (event) => {
            return (event.hash == '0x.' + '0'.repeat(64) && event.description == 'asdd', event.value == 0);
        })

    })
    it("get properities count", async () => {
        assert.equal(await realEstate.properitiesCount(), 0);
    })
    it("buy a new property", async () => {
        await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'asdd', 10);
        truffleAssert.passes(realEstate.buyAProperity(0, { from: secondAccount, value: 10 }));
    })
    it("get all balance", async () => {
        truffleAssert.passes(realEstate.getBalance(), 0, "Your balance is different than 0");
    })
    it("get sold properities count", async () => {
        assert.equal(await realEstate.soldPropertiesCount(), 0);
    })
    it("withdrawal Balance", async () => {
        await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'asdd', 10);
        truffleAssert.passes(realEstate.buyAProperity(0, { from: secondAccount, value: 10 }));
        truffleAssert.passes(realEstate.transferBalance({ to: firstAccount, value: realEstate.balance }))
    })
});
