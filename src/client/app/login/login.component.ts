import { Component, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { Config } from '../shared/index';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OAuth2Service } from '../shared/index';

declare var FB: any;

@Component({
  moduleId: module.id,
  selector: 'login',
  styleUrls: [ 'login.style.css' ],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class LoginComponent {
  
  username: string;
  password: string;
  hasError: boolean = false;
  errorMsg: string = '';
  constructor(private oAuth2: OAuth2Service, private router: Router) {
        
  }
  login(): any {
      
      return this.oAuth2.tryLoginWithUsernameAndPassword(this.username,this.password)
                    .then((res)=>{
                        this.router.navigate(['/']);
                    })
                    .catch((error)=>{
                                   this.errorMsg = <any>error;
                                   this.hasError = true;
                               });
        
      
  }
  facebookLogin(): any {
      console.log("facebook login");
      var that = this;
      FB.login(function(response: any) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ',response.authResponse.accessToken);
             let acces_token = response.authResponse.accessToken;
             this.oAuth2.tryLoginWithFacebook(acces_token)
                    .then((res: any)=>{
                        this.router.navigate(['/']);
                    })
                    .catch((error: any)=>{
                                   this.errorMsg = <any>error;
                                   this.hasError = true;
                               });
             FB.api('/me', function(response: any) {
               console.log('Good to see you, ' + response.name + '.');
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        }.bind(this));
  }
  private processLogin(res: Response) {
      console.log("map ok", res);
      //this.router.navigate(['/']);
  }
}
