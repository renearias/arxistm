//import * as firebase from 'firebase';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDl-A1af2TTgOPTwlEtHDZzZAdFkKrX8vk',
  authDomain: 'arxistm-43156.firebaseapp.com',
  databaseURL: 'https://arxistm-43156.firebaseio.com',
  storageBucket: 'arxistm-43156.appspot.com',
  messagingSenderId: "490253814290"
};

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes),
                     AngularFireModule.initializeApp(firebaseConfig),
                      AboutModule, HomeModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
