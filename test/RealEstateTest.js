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
        let property = await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'test', 'foo', 10);
        truffleAssert.eventEmitted(property, 'newProperty', (event) => {
            return (event.hash == '0x.' + '0'.repeat(64) && event.name == 'test' && event.description == 'foo', event.price == 10);
        })

    })
    it("get properties count", async () => {
        assert.equal(await realEstate.propertiesCount.call(), 0);
    })
    it("get properity", async () => {
        await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'test', 'foo', 10);
        truffleAssert.passes(realEstate.getProperty(0));
    })
    it("get throw on trying to add a  property", async () => {
        truffleAssert.fails(realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'test', 'foo', 10, { from: secondAccount }));
    })
    it("buy a new property", async () => {
        await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'test', 'foo', 10);
        truffleAssert.passes(realEstate.buyAProperty(0, { from: secondAccount, value: 10 }));
    })

    it("throw buy a new property", async () => {
        await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'test', 'foo', 10);
        truffleAssert.fails(realEstate.buyAProperty(0, { from: firstAccount, value: 10 }));
    })

    it("get all balance", async () => {
        truffleAssert.passes(realEstate.getBalance(), 0, "Your balance is different than 0");
    })
    it("withdrawal Balance", async () => {
        await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'test', 'foo', 10);
        truffleAssert.passes(realEstate.buyAProperty(0, { from: secondAccount, value: 10 }));
        truffleAssert.passes(realEstate.transferBalance({ to: firstAccount, value: realEstate.balance }))
    })

    it("throw trying to withdrawal Balance", async () => {
        truffleAssert.fails(realEstate.transferBalance({ to: firstAccount, value: realEstate.balance }))
    })

    it("get sold properties count", async () => {
        await realEstate.newPropertyPublication('0x.' + '0'.repeat(64), 'test', 'foo', 10);
        realEstate.buyAProperty(0, { from: secondAccount, value: 10 });
        let result = await realEstate.soldPropertiesCount.call();
        assert.equal(result.length, 1);
    })
});
