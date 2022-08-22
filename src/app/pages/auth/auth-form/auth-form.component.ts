import {
  Component,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnChanges {
  @Output() submitBtnFn = new EventEmitter();
  @Input() formFor: 'Sign In' | 'Sign Up' = 'Sign In';

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      const changedProp = changes[propName];
      this.formType = changedProp.currentValue;
      if (this.formType === 'Sign In') {
        this.authForm.removeControl('passwordRepeat');
      }
    }
  }

  checkPasswords(group: AbstractControl) {
    const password = group.get('password')?.value;
    const passwordRepeat = group.get('passwordRepeat')?.value;
    if (password !== passwordRepeat) {
      group.get('passwordRepeat')?.setErrors({ noRepeat: true });
    }
    return null;
  }

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
    return this.authForm.get('passwordRepeat')?.hasError('noRepeat')
      ? 'Passwords do not match!'
      : '';
  }

  public buttonFunction(): void {
    if (this.formType === 'Sign Up') {
      this.authService.register(this.authForm.value);
      return;
    }
    this.authService.login(this.authForm.value);
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

  constructor(private authService: AuthService) {}
}
