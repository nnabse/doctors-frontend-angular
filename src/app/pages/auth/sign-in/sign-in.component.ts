import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(private router: Router) {}

  public loginForm: FormGroup = new FormGroup({
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
    return this.loginForm.get('login');
  }

  get passwordInput() {
    return this.loginForm.get('password');
  }
}
