import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from "../../lib/auth/auth.service";
// --- FORT AWESOME ---
import { faEllipsisV, faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  toggleActive: boolean = false;
  isLoggedIn:   boolean = false;

  showNavRow: boolean = false;
  sendHover: string = "";

  // --- Font Awesome ---
  faEllipsisV = faEllipsisV;
  faBars =faBars;

  @Output() sidenavToggle = new EventEmitter<Event>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(loggedin => this.isLoggedIn = loggedin)
  }

  public onToggleSidenav(event: Event) {
    console.log('Toggle the sidenav')
    this.sidenavToggle.emit(event);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public logout() {
    this.authService.logout();
    location.reload();
  }

  setHover(setSendHover: string) {
    this.sendHover = setSendHover;
  }

  turnOff(b:boolean) {
    this.showNavRow = false;
  }

}
