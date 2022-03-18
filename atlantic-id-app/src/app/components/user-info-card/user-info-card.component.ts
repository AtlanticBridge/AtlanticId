import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent implements OnInit {

  public nfidWalletAddress: string = 'N/A'
  public userNfid: string = 'your'

  constructor() { }

  ngOnInit(): void {
  }

}
