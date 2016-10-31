import {Injectable, NgZone} from '@angular/core';
import { Config } from '../index';
import {Router} from '@angular/router';
//import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Http, Headers, Response, RequestOptions } from '@angular/http';


//export let token = localStorage.getItem('id_token');
//let config = new ConfigService();
//export const urlApi = config.config.urlApi;

export const contentHeaders = new Headers();
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('Accept', 'application/json');

/*export const contentHeadersWithToken = new Headers();
contentHeadersWithToken.append('Authorization', 'Bearer ' + token);
contentHeadersWithToken.append('Content-Type', 'application/json');*/


//import {urlApi, contentHeaders} from '../http/http';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class OAuth2Service {
  //lock = new Auth0Lock('YOUR_AUTH0_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');
  refreshSubscription: any;
  user: Object;
  //zoneImpl: NgZone;
  loginApiUrl: string = Config.API+'oauth/v2/token';
  private loggedIn = false;

  constructor(private router: Router, private http: Http) {
   // this.zoneImpl = zone;
   // this.user = JSON.parse(localStorage.getItem('profile'));
    this.loggedIn = !!localStorage.getItem('id_token');
    this.currentToken=JSON.parse(localStorage.getItem('id_token'));
  }

  /*public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }*/

   public tryLoginWithUsernameAndPassword(username: string, password: string) {

        let bodyRequest = {
          'client_id': Config.OAUTH_CLIENT_ID,
          'client_secret': Config.OAUTH_CLIENT_SECRET,
          'grant_type': 'password',
          'username': username,
          'password': password
      };
      
    //let headers = contentHeaders;
    /*let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });*/
      return this.http.post(this.loginApiUrl,bodyRequest)
                    .toPromise()   
                    .then((res: Response) => {
                        this.currentToken = res.json();
                        this.loggedIn = true;
                        localStorage.setItem('id_token', JSON.stringify(this.currentToken));
                    })
                    .catch(this.handleLoginError);
  }
  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    localStorage.removeItem('jwt');
    //this.zoneImpl.run(() => this.user = null);
    this.router.navigate(['login']);
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  
  public handleLoginError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = body.error_description;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      //return Observable.throw(errorMsg);
      return Promise.reject(errMsg);
  }
}
