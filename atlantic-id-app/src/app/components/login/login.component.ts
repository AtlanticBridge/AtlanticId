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
    ) {
        console.log('We are going to send the get request now....')
    }

    ngOnInit(): void {
        console.log('We are going to send the get request now....')
        const endpoint = environment.AWS_COINBASE_LOGIN_ENDPOINT
        const params = new HttpParams().set(
            'Access-Control-Allow-Origin',
            'http://localhost:4200'
        )
        const httpParams = {
            headers: new HttpHeaders({
                'x-api-key': environment.AWS_COINBASE_KEY
            }),
            params
        }
        console.log('We are going to send the get request now....')
        this.httpClient.get(endpoint, httpParams).subscribe(data => {
            console.log('You got it!', data)
        })



    }

}
