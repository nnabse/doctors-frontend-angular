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
  constructor(private router: Router) {}

  public redirectToMainPage(): void {
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

  public registerForm: FormGroup = new FormGroup(
    {
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]+$'),
        Validators.minLength(6),
        Validators.maxLength(18),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_\\W]*$'),
        Validators.minLength(6),
        Validators.maxLength(24),
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_\\W]*$'),
        Validators.minLength(6),
        Validators.maxLength(24),
      ]),
    },
    { validators: this.checkPasswords }
  );

  get passwordInput() {
    return this.registerForm.get('password');
  }

  get passwordRepeatInput() {
    return this.registerForm.get('passwordRepeat');
  }

  public passwordRepeatGetError(): string {
    return this.passwordRepeatInput?.hasError('noRepeat')
      ? 'Passwords do not match!'
      : '';
  }
}
