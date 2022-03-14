import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavService } from './lib/services/sidenav/sidenav.service';

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
    private sideNavService: SidenavService
  ) { }

  ngOnInit(): void {
    this.sideNavService.isDashboard.subscribe((toggletoolbar: boolean) => {
      this.toggleToolbar = toggletoolbar
    })
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
