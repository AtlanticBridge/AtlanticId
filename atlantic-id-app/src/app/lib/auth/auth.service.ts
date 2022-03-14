import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface Tokens {
    accessToken: string,
    refreshToken: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // --- LOCAL VARIABLES ---
    loggedInUser:  string = 'unknown';
    ACCESS_TOKEN:  string = 'ACCESS_TOKEN';
    REFRESH_TOKEN: string = 'REFRESH_TOKEN';

    // --- BEHAVIOR SUBJECTS ---
    private userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoggedIn = this.userLoggedIn.asObservable();


    // Create Public & Private Variables
    // public currentUser: Observable<User>
    // private currentUserSubject: BehaviorSubject<User>

    constructor(
        private http: HttpClient
    ) { }

    // ======================
    // --- PUBLIC METHODS ---
    // ======================

    public isAuthenticated(): boolean {

        if(localStorage.getItem(this.ACCESS_TOKEN)) {
            this.updateLoggedIn(true);
            return true
        }
        return false
    }

    /**
     * coinbaseLogin
     */
    public coinbaseLogin() {
        const popup = window.open('https://qwde3c09pa.execute-api.us-east-1.amazonaws.com/nfid_v1/create_nfid',
                                  '_blank',
                                  'height=700,width=700');
    }


    /**
     * updateLoggedIn
     */
    public updateLoggedIn(loggedin: boolean) {
        this.userLoggedIn.next(loggedin);
    }


    /**
     * logout
     */
    public logout() {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    }


    /**
     * getJwtToken
     */
    public getJwtToken() {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    /**
     * storeJwtTokens
     */
    public storeJwtTokens(tokens: any) {
        localStorage.setItem(this.ACCESS_TOKEN, tokens.authToken.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.authToken.accessToken);
    }

    // public queryJwtTokens(): Observable<ApolloQueryResult> {
    //     return this.apollo.watchQuery({
    //         query: gql``
    //     })
    // }

    // public refreshToken() {
    //     return this.http.post<any>(`${config.apiUrl}/refresh`, {
    //       'refreshToken': this.getRefreshToken()
    //     }).pipe(tap((tokens: Tokens) => {
    //       this.storeJwtToken(tokens.jwt);
    //     }));
    //   }

    // =======================
    // --- PRIVATE METHODS ---
    // =======================

    private doLoginUser(username: string, tokens: Tokens) {
        this.loggedInUser = username;
        this.storeTokens(tokens);
    }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }

    private getUserBackend() {
        return("hello")
    }

    private storeJWTToken() {
        return("token")
    }

}