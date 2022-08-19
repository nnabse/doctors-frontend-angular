import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Output() submitBtnFn = new EventEmitter();
  @Input()
  set formFor(value: string) {
    this.formType = value;
    if (this.formType === 'Sign In') {
      this.title = this.loginTexts;
      this.btnText = this.loginTexts;
      this.redirectText = this.loginRedirectText;
      this.link = '/signUp';
      this.redirectBtnText = this.registerTexts;
      return;
    }
    if (this.formType === 'Sign Up') {
      this.title = this.registerTexts;
      this.btnText = this.registerTexts;
      this.showPassRepeat = true;
      this.redirectText = this.registerRedirectText;
      this.link = '/signIn';
      this.redirectBtnText = this.loginTexts;
      return;
    }
  }

  @Input()
  set formGroup(value: FormGroup) {
    this.formGroupName = value;
  }

  @Input()
  set formControl(value: AbstractControl) {
    this.formControlName = value as FormControl;
  }

  @Input()
  set passwordRepeatError(value: string) {
    this.errorText = value;
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

  public formType = '';

  public loginTexts = 'Login';
  public loginRedirectText = 'Not registered yet?';
  public registerTexts = 'Register';
  public registerRedirectText = 'Already have an account?';

  public loginMaxLength = 18;
  public passMaxLength = 24;
  public showPassword = false;
  public showPasswordRepeat = false;
  public showPassRepeat = false;

  public formGroupName: FormGroup = new FormGroup({});
  public formControlName: FormControl = new FormControl();

  public title = '';
  public errorText = '';
  public btnText = '';
  public redirectText = '';
  public link = '';
  public redirectBtnText = '';
}
