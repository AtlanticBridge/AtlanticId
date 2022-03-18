import { Injectable } from '@angular/core';
import Fortmatic from "fortmatic";
// import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import { INFURA_ID } from "./web3modal.constants";
import Web3 from 'web3';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Web3modalService {

    public web3Modal: Web3Modal | any
    public provider: any
    private accounts: any
    private web3js: any

    // --- SUBJECTS & BEHAVIOR SUBJECTS ---
    private accountStatusSource   = new Subject<any>();
    private isConnectedSource     = new BehaviorSubject<boolean>(false);
    private walletAccountsSource  = new BehaviorSubject<string[]>(['']);
    private currentProviderSource = new BehaviorSubject<string>('');
    private chainIdSource         = new BehaviorSubject<string>('');

    // --- OBSERVABLES to BEHAVIOR SUBJECTS ---
    // We want to omit the "next value" to everything that is subscibed to it.
    public accountStatus$   = this.accountStatusSource.asObservable();
    public isConnected$     = this.isConnectedSource.asObservable();
    public walletAccounts$  = this.walletAccountsSource.asObservable();
    public currentProvider$ = this.currentProviderSource.asObservable();
    public chainId$         = this.chainIdSource.asObservable();

    constructor() {
      this.web3Modal = this.getWeb3Modal()
    }

    

    async connectAccount() {
        this.web3Modal.clearCachedProvider()

        // --- Connect the Provider ---
        this.provider = await this.web3Modal.connect()
        this.web3js = new Web3(this.provider)

        // --- Connect the Account(s) ---
        this.accounts = await this.web3js.eth.getAccounts()

        // --- Update Srouces / Behavior Subjects ---
        this.accountStatusSource.next(this.accounts);
        this.isConnectedSource.next(true);
        this.walletAccountsSource.next(this.accounts);
        this.getChainId();

        // --- Update Local Storage ---

        // return this.web3ModalSetup.connect()
    }

    public async getChainId(): Promise<void> {
        window.ethereum.request({ method: 'eth_chainId' })
          .then(async (chainId: string) => {
            let providerName = this.getProviderName(chainId);
            this.chainIdSource.next(providerName)
          })
    }

    async isConnected(): Promise<boolean> {
        let web3: any
        if (window.ethereum) {
          web3 = new Web3(window.ethereum)
        } else if (window.web3) {
          web3 = new Web3(window.web3.currentProvider)
        } else {
          return false
        }
        let addr = await web3.eth.getAccounts()
        if (addr.length < 1) {
          return false
        } else {
          return true
        }
    }

    public changeAccounts(accnt: string[]) {
        this.walletAccountsSource.next(accnt);
    }

    /*
    This function is not currently used. 

    MetaMask API does not have a direct way to disconnect a user's
    connected wallet from a dApp right now. Since there is no clean
    way to do it, there is no functionality within the dApp.
    */
    public async logout() {
        await this.web3Modal.clearCachedProvider(); 
        this.isConnectedSource.next(false);
    }

    // ======================
    // --- PRIVATE METHODS ---
    // ======================

    private getProviderName(chainId: string): string {

        if (chainId == '0x1') {
          return 'Ethereum'
        }
      
        if (chainId == '0x3') {
          return 'Ropsten'
        }
      
        if (chainId == '0x4') {
          return 'Rinkeby'
        }
      
        if (chainId == '0x5') {
          return 'Goerli'
        }
      
        if (chainId == '0x2a') {
          return 'Kovan'
        }
      
        if (chainId == '0x539') {
          return 'Ganache'
        }
      
        if (chainId == '0x7a69') {
          return 'Hardhat Node'
        }
      
        else {
          return 'unknown'
        }
    }

    private getWeb3Modal(): Web3Modal {
        return new Web3Modal({
            network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
            cacheProvider: true, // optional
            theme: "light", // optional. Change to "dark" for a dark theme.
            providerOptions: {
              walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                  bridge: "https://polygon.bridge.walletconnect.org",
                  infuraId: INFURA_ID,
                  rpc: {
                    10: "https://mainnet.optimism.io", // xDai
                    100: "https://rpc.gnosischain.com", // xDai
                    137: "https://polygon-rpc.com",
                    31337: "http://localhost:8545",
                    42161: "https://arb1.arbitrum.io/rpc",
                    80001: "https://rpc-mumbai.maticvigil.com"
                  },
                },
              },
              portis: {
                display: {
                  logo: "https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png",
                  name: "Portis",
                  description: "Connect to Portis App",
                },
                package: Portis,
                options: {
                  id: "6255fb2b-58c8-433b-a2c9-62098c05ddc9",
                },
              },
              fortmatic: {
                package: Fortmatic, // required
                options: {
                  key: "pk_live_5A7C91B2FC585A17", // required
                },
              },
              // torus: {
              //   package: Torus,
              //   options: {
              //     networkParams: {
              //       host: "https://localhost:8545", // optional
              //       chainId: 1337, // optional
              //       networkId: 1337 // optional
              //     },
              //     config: {
              //       buildEnv: "development" // optional
              //     },
              //   },
              // },
              // "custom-walletlink": {
              //   display: {
              //     logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
              //     name: "Coinbase",
              //     description: "Connect to Coinbase Wallet (not Coinbase App)",
              //   },
              //   package: walletLinkProvider,
              //   connector: async (provider, _options) => {
              //     await provider.enable();
              //     return provider;
              //   },
              // },
              authereum: {
                package: Authereum, // required
              },
            },
            })
    }
}
