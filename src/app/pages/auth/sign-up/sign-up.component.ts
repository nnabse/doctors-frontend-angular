import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public showPassword = false;
  public showPasswordRepeat = false;

  constructor(private router: Router) {}

  public redirect(): void {
    this.router.navigate(['main']);
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let passwordRepeat = group.get('passwordRepeat')?.value;

    if (password !== passwordRepeat)
      group.get('passwordRepeat')?.setErrors({ noRepeat: true });
    return null;
  };

  public RegisterForm: FormGroup = new FormGroup(
    {
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
      passwordRepeat: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]*$'),
        Validators.minLength(6),
        Validators.maxLength(24),
      ]),
    },
    { validators: this.checkPasswords }
  );

  get passwordInput() {
    return this.RegisterForm.get('password');
  }

  get passwordRepeatInput() {
    return this.RegisterForm.get('passwordRepeat');
  }

  public passwordRepeatGetError(): string {
    return this.passwordRepeatInput?.hasError('noRepeat')
      ? 'Passwords do not match'
      : '';
  }
}
