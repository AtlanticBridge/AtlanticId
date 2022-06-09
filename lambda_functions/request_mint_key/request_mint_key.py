import json
import logging
import os
import hashlib
from web3 import Web3
from dotenv import load_dotenv

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):

    load_dotenv()
    MINT_PRIVATE_KEY = os.getenv("MINT_PRIVATE_KEY")
    
    try:
        # Import Contract ABI
        with open('abis/AtlanticId.json', 'r') as f:
            data = json.load(f)

        # Connect Web3 Provider
        print('Connecting Web3 provider...')
        infura_url = 'https://kovan.infura.io/v3/3e8a59968db64abcbfca1038e63e781e'
        # infura_wss = 'wss://kovan.infura.io/ws/v3/3e8a59968db64abcbfca1038e63e781e'
        web3 = Web3(Web3.HTTPProvider(infura_url))

        # Set factory parameters
        factory_abi = data.get("abi")
        factory_address = '0xfe8e03864Cfb9e401f7f36C341E7b35ca9DAb8F5'
        factory_contract = web3.eth.contract(address=factory_address, abi=factory_abi)

        # Get the approved address to mint to
        approved_address = event["body"]["address"]

        # Generate an approval key
        approval_key = hashlib.sha256((approved_address.encode() + os.urandom(32))).hexdigest()
        logging.info(approval_key)

        # Send the Updated Mint Key to the Contract
        nonce = web3.eth.get_transaction_count(approved_address)
        tx_hash = factory_contract.functions.approveMint(approval_key, approved_address).buildTransaction({
            'chainId':42,
            'gas': 70000,
            'maxFeePerGas': web3.toWei('2', 'gwei'),
            'maxPriorityFeePerGas': web3.toWei('1', 'gwei'),
            'nonce': nonce,
        })
        signed_tx = web3.eth.account.sign_transaction(tx_hash, private_key=MINT_PRIVATE_KEY)
        hash_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        tx_receipt = web3.eth.wait_for_transaction_receipt(hash_tx)
        logging.info(tx_receipt)
    
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 401,
            'body': json.dumps('Transaction to contract failed!')
        }
    
    return {
        'statusCode': 200,
        'body': json.dumps(approval_key)
    }


if __name__ == "__main__":
    lambda_handler(None, None)