import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from "../../lib/auth/auth.service";
import { HttpClient } from "@angular/common/http";
// --- FORT AWESOME ---
import { faEllipsisV, faBars } from "@fortawesome/free-solid-svg-icons";
import { environment } from 'src/environments/environment';

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

  postUrl: string = "https://qwde3c09pa.execute-api.us-east-1.amazonaws.com/nfid_v1/create_nfid";

  // --- Font Awesome ---
  faEllipsisV = faEllipsisV;
  faBars =faBars;

  @Output() sidenavToggle = new EventEmitter<Event>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(loggedin => this.isLoggedIn = loggedin)
  }

  public onToggleSidenav(event: Event) {
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

  coinbaseLogin() {
    localStorage.setItem('AtlanticId_Login', 'coinbase')
    const popup = window.open('http://localhost:4200/login',
                              '_blank',
                              'height=700,width=700')
  }

}
