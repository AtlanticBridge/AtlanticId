const FooContract = artifacts.require('FooContract')

var fs = require('fs')


module.exports = async function(deployer, network, accounts) {
    console.log('---------------------------------')
    console.log('NETWORK: ')
    console.log(network)
    console.log('---------------------------------')
    console.log('ACCOUNTS: ')
    console.log(accounts)
    console.log('---------------------------------')
    console.log('DEPLOYER: ')
    // console.log(deployer)
    console.log('---------------------------------')

    // Check if 'outputs' directory
    fs.access("outputs", function(error) {
        if (error) {
          console.log("Creating *outputs* directory...")
          fs.mkdirSync("outputs")
        }
    })

    console.log('============================================')
    console.log(`|   Connection to the ${network} network   |`)
    console.log('============================================')

    if (network == 'ganache') {

        /** DEPLOY CONTRACT(S) */
        await deployer.deploy(FooContract)
        /** ------------------ */
        const instance = await FooContract.deployed()

        let data = {
            "owner": accounts[0],
            "contract_address": instance.address,
            "network": network,
            "addresses": accounts
        }

        var jsonData = JSON.stringify(data);
        fs.writeFileSync("outputs/1_ganacheCli_FooContract.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        })
    }

    else if (network == 'ganacheCli') {

        /** DEPLOY CONTRACT(S) */
        await deployer.deploy(FooContract)
        /** ------------------ */
        const instance = await FooContract.deployed()

        let data = {
            "owner": accounts[0],
            "contract_address": instance.address,
            "network": network,
            "addresses": accounts
        }

        var jsonData = JSON.stringify(data);
        fs.writeFileSync("outputs/1_ganacheCli_FooContract.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        })
    }

    else if (network == 'kovan') {
        console.log('=========================================')
        console.log(`|   Welcome to the ${network} network   |`)
        console.log('=========================================')

        /** DEPLOY CONTRACT(S) */
        await deployer.deploy(FooContract)
        /** ------------------ */
        const instance = await FooContract.deployed()

        let data = {
            "owner": accounts[0],
            "contract_address": instance.address,
            "network": network,
            "addresses": accounts
        }

        var jsonData = JSON.stringify(data);
        fs.writeFileSync("outputs/1_kovan_FooContract.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        })
    }

    else if (network == 'rinkeby') {
        console.log('This is the rinkeby network')
    }

    else if (network == 'mainnet') {
        console.log('This is the local host')
    }

    else {
        console.log(`Network specified (${network}) not available...`)
    }
}