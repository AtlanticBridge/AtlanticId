import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const loginType = localStorage.getItem('AtlanticId_Login')
    console.log('Your login type: ', loginType)

    // --- COINBASE LOGIN ---
    if (loginType == 'coinbase') {
      const code = this.activatedRoute.snapshot.queryParamMap.get('code') || ''
      console.log('This is your Coinbase login code: ', code)
      this.makeCoinbaseLogin(code)
    }

    // localStorage.removeItem('AtlanticId_Login')
  }

  private makeCoinbaseLogin(code: string): void {
    if (code == '') {
      alert('App did not recieve the Coinbase code to process your login.')
    } else {
      let params = new HttpParams().set('code', code)
      let headers = new HttpHeaders().set("x-api-key", "pJqBI74C6L9Q3lKQQxorc5EMsaHvVceS6xArF5Vc")
      this.makeLogin(params, headers)
    }
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
  makeLogin(_params: HttpParams, header: HttpHeaders): void {
    console.log('Sending post request...')
    let _res = this.httpClient.post(environment.AWS_COINBASE_LOGIN, null, { headers: header, params: _params })

    _res.subscribe((data: any) => {
      console.log('Here is the data: ', data)
      // this.authService.storeJwtTokens(data);
      this.authService.storeNfid(data)
      this.authService.updateLoggedIn(true);
      window.opener.location.reload();
      window.close();
    })
  }
}
