import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'login',
  styleUrls: [ 'login.style.scss' ],
  templateUrl: 'login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login {
  constructor() {

  }
}
