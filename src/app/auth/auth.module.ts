import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from '../routing/routing.module';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../materials/materials.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RoutingModule,
    SharedModule,
    FormsModule,
    MaterialsModule,
  ],
})
export class AuthModule {}
