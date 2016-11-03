import { Component, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { Config } from '../shared/index';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OAuth2Service } from '../shared/index';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';



declare var FB: any;
declare var gapi: any;

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
  constructor(public af: AngularFire, private oAuth2: OAuth2Service, private router: Router) {
      
  }
  ngOnInit(){
        /*gapi.signin2.render('my-signin2', {    
            'scope': 'profile email https://www.googleapis.com/auth/drive',
            'width': 160,
           // 'height': 50,
            'longtitle': true,
           //'theme': 'dark',
            'onsuccess': function(googleUser: any){
                console.log('asdasdasd');
            },
            'onfailure': function onFailure(error: any) {
                          console.log(error);
                        }
          });*/
 
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
  googleLogin(): any{
      this.af.auth.subscribe(auth =>{
       console.log(auth)
       this.oAuth2.tryLoginWithGoogle(acces_token)
                    .then((res: any)=>{
                        this.router.navigate(['/']);
                    })
                    .catch((error: any)=>{
                                   this.errorMsg = <any>error;
                                   this.hasError = true;
                               });
      });  
      this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
      scope: ['https://www.googleapis.com/auth/drive'],
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

