import { Injectable } from '@angular/core';
import { local } from 'web3modal';
import { NfidInjectable } from './nfid-contract.injectable';

@Injectable({
  providedIn: 'root'
})
export class NfidContractService {

    public nfidAddress: string = ''
    public currentWallet: string = ''

    constructor(
        private nfidContract: NfidInjectable
    ) {
        this.getAccount().then(wallet => {
            window.localStorage.setItem("wallet", wallet)
            this.currentWallet = wallet
        });
    }

    async getAccount() {
        let accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        })
        return accounts[0]
    }

    /**
     * SET ALL OF THE Atlantic NFID Contract Methods HERE
     * 
     * METHODS
     * -------
     * 
     */
    requestMint(addr: string) {
        
    }

    mint(addr:string) {

    }
}
