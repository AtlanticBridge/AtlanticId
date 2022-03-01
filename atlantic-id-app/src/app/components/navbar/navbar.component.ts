import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from "../../lib/auth/auth.service";
import { HttpClient } from "@angular/common/http";
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

  postUrl: string = "https://qwde3c09pa.execute-api.us-east-1.amazonaws.com/nfid_v1/create_nfid";

  // --- Font Awesome ---
  faEllipsisV = faEllipsisV;
  faBars =faBars;

  @Output() sidenavToggle = new EventEmitter<Event>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    // this.httpClient.get("https://qwde3c09pa.execute-api.us-east-1.amazonaws.com/nfid_v1/create_nfid").subscribe();
  }

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

  // https://www.coinbase.com/oauth/authorize
  //  - response_type=code
  //  - client_id=YOUR_CLIENT_ID
  //  - redirect_uri=YOUR_REDIRECT_URL
  //  - state=SECURE_RANDOM
  //  - scope=wallet:accounts:read
  coinbaseLogin() {
    localStorage.setItem('GitCrypto_Login', 'coinbase')
    const payload = {

    }
    console.log('Coinbase Login')
    // this.httpClient.post(this.postUrl, )
  }

}
