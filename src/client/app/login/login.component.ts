import { Component, ViewEncapsulation } from '@angular/core';

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
  constructor() {

  }
}
