import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    // private authService: AuthService
  ) { }

  ngOnInit(): void {
    const loginType = localStorage.getItem('GitCrypto_Login')
    const code = this.activatedRoute.snapshot.queryParamMap.get('code')
    console.log('The redirect URL code is: ', code)
    // --- COINBASE LOGIN ---
    if (loginType === 'coinbase') {
      const code = this.activatedRoute.snapshot.queryParamMap.get('code')
      // this.makeCoinbaseLogin(code);
      console.log('Hello!')
    }
  }

}
