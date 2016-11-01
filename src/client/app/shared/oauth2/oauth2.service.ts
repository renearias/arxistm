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

export const contentHeadersWithToken = new Headers({ 'Content-Type': 'application/json' });
contentHeadersWithToken.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
//contentHeadersWithToken.append('Content-Type', 'application/json');
export const requestDefaultOptions = new RequestOptions({ headers: contentHeadersWithToken });


@Injectable()
export class OAuth2Service {
  
    
  /* public redirectUri = '';
   public scope = '';
   public rngUrl = '';
   public oidc = false;
   public options: any;
   public state = '';
   public issuer = '';
   public validationHandler: any;
   public logoutApiUrl = '';*/
   
      
  refreshSubscription: any;
  user: Object;
  currentToken: any;
  //zoneImpl: NgZone;
  public loginApiUrl: string = Config.API+'oauth/v2/token';
  private loggedIn = false;

  public setStorage(storage: Storage) {
        this._storage = storage;
    }
    
  private _storage: Storage = localStorage;
  
  constructor(private router: Router, private http: Http) {
   // this.zoneImpl = zone;
   // this.user = JSON.parse(localStorage.getItem('profile'));
    this.loggedIn = !!localStorage.getItem('id_token');
    this.currentToken = JSON.parse(localStorage.getItem('id_token'));
  }
  
 /* callEventIfExists(options: any) {
        var that = this;
        if (options.onTokenReceived) {
            var tokenParams = { 
                idClaims: that.getIdentityClaims(),
                idToken: that.getIdToken(),
                accessToken: that.getAccessToken(),
                state: that.state
            };
            options.onTokenReceived(tokenParams);
        }
    }*/
    
    getAccessToken() {
        return this._storage.getItem('access_token');
    };
    
    hasValidAccessToken() {
        if (this.getAccessToken()) {

            var expiresAt = this._storage.getItem('expires_at');
            var now = new Date();
            if (expiresAt && parseInt(expiresAt) < now.getTime()) {
                return false;
            }

            return true;
        }

        return false;
    };
    
    processToken(token: any){
        //if (savedNonce === nonceInState) {
            this._storage.setItem('access_token', token['access_token']);
            this._storage.setItem('refresh_token', token['refresh_token']);
            var expiresIn = token['expires_in'];

            if (expiresIn) {
                var expiresInMilliSeconds = parseInt(expiresIn) * 1000;
                var now = new Date();
                var expiresAt = now.getTime() + expiresInMilliSeconds;
                this._storage.setItem('expires_at', '' + expiresAt);
            }
            /*if (stateParts.length > 1) {
                this.state = stateParts[1];
            }*/

            //oauthSuccess = true;

                        //}
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
                        this._storage.setItem('token', JSON.stringify(this.currentToken));
                        this.processToken(this.currentToken);
                        
                        
                        
                        
                    })
                    .catch(this.handleLoginError);
  }
  
  public tryLoginWithFacebook(facebookToken: string) {

        let bodyRequest = {
          'client_id': Config.OAUTH_CLIENT_ID,
          'client_secret': Config.OAUTH_CLIENT_SECRET,
          'grant_type': 'https://facebook.com/',
          'facebook_access_token': facebookToken
      };
      
      return this.http.post(this.loginApiUrl,bodyRequest)
                    .toPromise()   
                    .then((res: Response) => {
                        this.currentToken = res.json();
                        this.loggedIn = true;
                        this._storage.setItem('token', JSON.stringify(this.currentToken));
                        this.processToken(this.currentToken);
                    })
                    .catch(this.handleLoginError);
  }
  
  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('token');
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
