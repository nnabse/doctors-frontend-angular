import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public showPassword = false;

  constructor(private router: Router) {}

  public LoginForm: FormGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$'),
      Validators.minLength(6),
      Validators.maxLength(18),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9]*$'),
      Validators.minLength(6),
      Validators.maxLength(24),
    ]),
  });

  public redirect(): void {
    this.router.navigate(['main']);
  }

  get loginInput() {
    return this.LoginForm.get('login');
  }

  get passwordInput() {
    return this.LoginForm.get('password');
  }
}
