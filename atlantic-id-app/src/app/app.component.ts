import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthService } from './lib/auth/auth.service';
import { SidenavService } from './lib/services/sidenav/sidenav.service';
import { Web3modalService } from './lib/services/web3modal/web3modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'atlantic-id-app';
  toggleActive: boolean = false
  toggleToolbar: boolean = false
  public clickedEvent: Event | any
  @ViewChild(SidenavComponent) public sidenavComponent: SidenavComponent | any

  constructor(
    private sideNavService: SidenavService,
    private authService: AuthService,
    private web3ModalService: Web3modalService
  ) {
    window.ethereum.on('accountsChanged', (accounts: any) => {
        this.web3ModalService.changeAccounts(accounts)
    })
  }

  ngOnInit(): void {
    this.sideNavService.isDashboard.subscribe((toggletoolbar: boolean) => {
      this.toggleToolbar = toggletoolbar
    })

    // this.authService.
  }

  ngAfterViewInit(): void {
      this.sideNavService.setSideNav(this.sidenavComponent.sideNav)
  }

  clickMenu() {
    this.toggleActive = !this.toggleActive;
    this.sideNavService.toggle();
  }

  childEventClicked($event: Event) {
    this.toggleActive = !this.toggleActive;
    this.sideNavService.toggle();
  }
}
