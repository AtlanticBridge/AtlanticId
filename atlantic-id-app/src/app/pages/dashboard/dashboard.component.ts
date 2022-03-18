import { Component, OnInit } from '@angular/core';
import { Web3modalService } from 'src/app/lib/services/web3modal/web3modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isConnected: boolean = true;
  web3Connected: boolean = true;

  constructor(
    private web3modalService: Web3modalService
  ) { }

  ngOnInit(): void {
    this.web3modalService.isConnected().then((data:boolean) => {
      // TODO: Show a loading wheel until there is a return on this component
      this.web3Connected = data
    })
  }

  async connectWeb3Modal() {
    try {
      await this.web3modalService.connectAccount();
      this.web3Connected = true;
    } catch (error) {
      alert('Did not connect')
    }
    
  }

}
