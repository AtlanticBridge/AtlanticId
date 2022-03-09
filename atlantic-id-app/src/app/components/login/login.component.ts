import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private httpClient: HttpClient
    ) { }

    ngOnInit(): void {
        localStorage.setItem('AtlanticID_Login', 'coinbase')
        // this.httpClient.get(environment.AWS_COINBASE_LOGIN_ENDPOINT)
    }

}
