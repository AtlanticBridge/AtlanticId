import { Component, OnInit } from '@angular/core';
import { NfidContractService } from 'src/app/lib/contracts/AtlanticNfid/nfid-contract.service';

@Component({
  selector: 'app-nfid-card',
  templateUrl: './nfid-card.component.html',
  styleUrls: ['./nfid-card.component.scss']
})
export class NfidCardComponent implements OnInit {

  public canMint: boolean = true
  public nfidToken: string = 'No NFID token for this address'
  public userNfid: string = ''

  /**
   * TODO:
   * 
   *    [1] Request Mint method 
   *    [1a] Add a backend lambda function that returns a user's 
   */

  constructor(
    private nfidContractService: NfidContractService
  ) { }

  ngOnInit(): void {
    this.userNfid = localStorage.getItem("USER_NFID") || ''
  
  }

  requestMint() {
    alert('Requesting your Mint auth')
    // this.nfidContractService.requestMint('')
  }

}
