import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// http client
import { HttpClientModule } from '@angular/common/http';

// components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './service/auth.service';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: [LoginComponent, SignupComponent],
  providers: [AuthService],
  exports: [SignupComponent, LoginComponent],
})
export class AuthModule {}
