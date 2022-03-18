import { Inject, Injectable } from '@angular/core';
import { Contract, providers } from 'ethers';

// // --- THE CONTRACT DATA ---
import ContractJson from '../../../../artifacts/abis/AtlanticId.json'
import { EthersProvider } from '../providers.injectable';


/**
 * This is an Angular Injectable class for connecting the client to the 
 * lending Contract through the HardHat RPC localhost network. 
 * 
 */
@Injectable({ providedIn: 'root' })
export class NfidInjectable extends Contract {

    constructor(
        @Inject(EthersProvider) web3Provider: providers.Web3Provider
    ) {
        // --- Contract Address ---
        let nfidAddress = "0x1FDcFf805E9dEB9619f1EddbDb730ca289d0301b";

        // --- METAMASK Signer ---
        let signer = web3Provider.getSigner()

        // --- Ethers Contract Class Intialized Parameters ---
        super(nfidAddress, ContractJson.abi, signer);
    }
}