import json
import os
import hashlib
from web3 import Web3
from dotenv import load_dotenv


def main():
    load_dotenv()
    OWNER = os.getenv("OWNER")
    INFURA_URL = os.getenv("INFURA_HTTP_ENDPOINT")

    try:
        with open('abis/AtlanticId.json', 'r') as f:
            data = json.load(f)

        # Connect Web3 Provider
        print('Connecting Web3 provider...')
        infura_url = INFURA_URL
        web3 = Web3(Web3.HTTPProvider(infura_url))

        # Set factory parameters
        factory_abi = data.get("abi")
        factory_address = '0x1FDcFf805E9dEB9619f1EddbDb730ca289d0301b'
        factory_contract = web3.eth.contract(address=factory_address, abi=factory_abi)

        role = Web3.keccak(text="MINTER_ROLE")
        tx = factory_contract.functions.hasRole(role, "0x9F9697CdaAE1D375f5Fc6a5E34EC170cdaA305C7").call()
        print(tx)

        # tx = factory_contract.functions.getRoleAdmin(Web3.toBytes(text="MINTER_ROLE")).call()
        # print(Web3.toHex(tx))

        # # Send the Updated Mint Key to the Contract
        # nonce = web3.eth.get_transaction_count("0x9F9697CdaAE1D375f5Fc6a5E34EC170cdaA305C7") 
        # tx_hash = factory_contract.functions.grantRole(Web3.toBytes(text="MINTER_ROLE"), "0xC0b284aC2110BB0DdfAa743345dCae1b756d8f46").buildTransaction({
        #     'chainId':42,
        #     'gas': 70000,
        #     'maxFeePerGas': web3.toWei('2', 'gwei'),
        #     'maxPriorityFeePerGas': web3.toWei('1', 'gwei'),
        #     'nonce': nonce,
        # })
        # signed_tx = web3.eth.account.sign_transaction(tx_hash, private_key=OWNER)
        # hash_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        # tx_receipt = web3.eth.wait_for_transaction_receipt(hash_tx)
        # print(tx_receipt)

    except Exception as e:
        print('what happened?')
        print(e)
    return

if __name__ == "__main__":
    main()