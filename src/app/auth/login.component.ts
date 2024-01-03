import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthMachineFacade } from './+xstate/auth-machine.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailCtr: AbstractControl;
  passwordCtr: AbstractControl;
  loading$: Observable<boolean> = this.authMachineFacade.loading$;

  constructor(
    private fb: FormBuilder,
    private authMachineFacade: AuthMachineFacade
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        { value: '', disabled: false },
        [Validators.email, Validators.required]
      ],
      password: [{ value: '', disabled: false }, [Validators.required]]
    });
    this.emailCtr = this.loginForm.get('email');
    this.passwordCtr = this.loginForm.get('password');
  }

  submitForm() {
    this.authMachineFacade.login(this.emailCtr.value, this.passwordCtr.value);
  }
}
