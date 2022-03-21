import json
from web3.web3 import Web3

def lambda_handler(event, context):
    
    try:
        # Import Contract ABI
        with open('abis/AtlanticId.json', 'r') as f:
            data = json.load(f)

        # Connect Web3 Provider
        infura_url = 'INSERTYOURINFRAURLHERE'
        web3 = Web3(Web3.HTTPProvider(infura_url))

        # Set factory parameters
        factory_abi = json.loads(data.abi)
        factory_address = '0x1FDcFf805E9dEB9619f1EddbDb730ca289d0301b'
        factory_contract = web3.eth.contract(factory_address, factory_abi)

        # Generate an approval key
        approval_key = ''
        
        # Get the approved address to mint to
        approved_address = ''

        # Send the Updated Mint Key to the Contract
        tx_hash = factory_contract.functions.approveMint(approval_key, approved_address).transact(({"from": config.ADMIN_ADDRESS}))
        tx_receipt = web3.eth.waitForTransactionReceipt(tx_hash)
    
    except:
        return {
            'statusCode': 401,
            'body': json.dumps('Transaction to contract failed!')
        }
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
