import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/lib/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const loginType = localStorage.getItem('AtlanticID_Login')
    console.log('This is the redirect login...', loginType)
    console.log(this.activatedRoute.snapshot.queryParamMap.get('code'))
    // --- COINBASE LOGIN ---
    if (loginType === 'coinbase') {
      const code = this.activatedRoute.snapshot.queryParamMap.get('code') || ''
      this.makeCoinbaseLogin(code);
    }
  }

  makeCoinbaseLogin(code: string): void {
    let params = new HttpParams().set('code', code);
    this.makeLogin(params);
  }

  /*
    makeLogin: void
    This function makes an http GET request to the
    GitCrypto backend.
    
    PARAMETERS
    ----------
    params: HttpParams
        - The list of Http Parameters sent with the GET request.
  */
  makeLogin(params: HttpParams): void {
    this.httpClient.post(environment.AWS_COINBASE_SIGNIN, { params: params }).subscribe(data => {

      console.log('This is the data: ', data)

      // Store the JWT tokens from login.
      this.authService.storeJwtTokens(data);
  
      // Make the login TRUE.
      this.authService.updateLoggedIn(true);
  
      // Reload the original window and close the popup window.
      window.opener.location.reload();
      window.close();
    })
  }

}
