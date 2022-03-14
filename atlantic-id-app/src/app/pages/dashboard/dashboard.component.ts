import { Component, OnInit } from '@angular/core';
import { Web3modalService } from 'src/app/lib/services/web3modal/web3modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isConnected: boolean = false;

  constructor(
    private web3modalService: Web3modalService
  ) { }

  ngOnInit(): void {
  }

  async connectWeb3Modal() {
    try {
      await this.web3modalService.connectAccount();
    } catch (error) {
      alert('Did not connect')
    }
    this.isConnected = true;
  }

}
