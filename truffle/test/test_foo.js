const FooContract = artifacts.require('FooContract')
// const truffleAssert = require('truffle-assertions')

contract('FooContract Function Testing for Roles', async accounts => {
    /** Full Test Variables */
    const owner = accounts[0]
    const acnt1 = accounts[1]
    const acnt2 = accounts[2]
    const acnt3 = accounts[3]
    const acnt4 = accounts[4]
    const acnt5 = accounts[5]
    const acnt6 = accounts[6]
    const acnt7 = accounts[7]
    const acnt8 = accounts[8]
    const acnt9 = accounts[9]
    var fooContractInstance

    /** TEST SETUP */
    before('Setup Contract', async function() {
        fooContractInstance = await FooContract.deployed()
    })

    describe("Check Roles are properly assigned.", async () => {
        /** TEST #1 */
        // it("Check if DEFAULT_ADMIN_ROLE is assigned", async () => {
        //     let role = web3.utils.asciiToHex("DEFULAT_ADMIN_ROLE")
        //     let acnt = await fooContractInstance.hasRole(role, owner)
        //     assert.equal(acnt,true)
        // })

        /** TEST #2 */
        it("Check if MINTER_ROLE is assigned", async () => {
            // let role = web3.utils.asciiToHex("MINTER_ROLE")
            let role = web3.utils.keccak256("MINTER_ROLE")
            let acnt = await fooContractInstance.hasRole(role, owner)
            assert.equal(acnt,true)
        })

        // it("Check MINTER_ROLE event emitted", async () => {

        // })

        /** TEST #3 */
        // it("Check if PAUSER_ROLE is assigned", async () => {
        //     let role = web3.utils.asciiToHex("PAUSER_ROLE")
        //     let acnt = await fooContractInstance.hasRole(role, owner)
        //     assert.equal(acnt,true)
        // })

        // /** TEST #4 */
        // it("Check if BURNER_ROLE is assigned", async () => {
        //     let role = web3.utils.asciiToHex("BURNER_ROLE")
        //     let acnt = await fooContractInstance.hasRole(role, owner)
        //     assert.equal(acnt,true)
        // })

        // /** TEST #5 */
        // it("Check if TRANSFER_ROLE is assigned", async () => {
        //     let role = web3.utils.asciiToHex("TRANSFER_ROLE")
        //     let acnt = await fooContractInstance.hasRole(role, owner)
        //     assert.equal(acnt,true)
        // })
    })
})