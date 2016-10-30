import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

/*export const routes = [
  { path: '', component: Login, pathMatch: 'full' }
];*/

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  
})
export class LoginModule {}
  
