import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Output() submitBtnFn = new EventEmitter();
  @Input()
  set formFor(value: 'Sign In' | 'Sign Up') {
    this.formType = value;
    if (this.formType === 'Sign In') {
      this.authForm.removeControl('passwordRepeat');
    }
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

  public authForm: FormGroup = new FormGroup(
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

  get passwordRepeatInput() {
    return this.authForm.get('passwordRepeat');
  }

  public passwordRepeatGetError(): string {
    return this.passwordRepeatInput?.hasError('noRepeat')
      ? 'Passwords do not match!'
      : '';
  }

  public buttonFunction(): void {
    this.submitBtnFn.emit();
  }

  public showPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  public showPasswordRepeatToggle(): void {
    this.showPasswordRepeat = !this.showPasswordRepeat;
  }

  labels = {
    'Sign In': {
      title: 'Login',
      btnText: 'Login',
      redirectText: 'Not registered yet?',
      link: '/signUp',
      redirectBtnText: 'Register',
    },
    'Sign Up': {
      title: 'Register',
      btnText: 'Register',
      showPassRepeat: true,
      redirectText: 'Already have an account?',
      link: '/signIn',
      redirectBtnText: 'Login',
    },
  };

  public formType: 'Sign In' | 'Sign Up' = 'Sign In';

  public loginMaxLength = 18;
  public passMaxLength = 24;
  public showPassword = false;
  public showPasswordRepeat = false;
  public showPassRepeat = false;

  public title = '';
  public btnText = '';
  public redirectText = '';
  public link = '';
  public redirectBtnText = '';
}
