import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthMachine } from './+xstate/auth-machine.service';
import { map } from 'rxjs/operators';
import { LoginSubmit } from './+xstate/auth-machine.events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailCtr: AbstractControl;
  passwordCtr: AbstractControl;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authMachineService: AuthMachine
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

    this.loading$ = this.authMachineService.authState$.pipe(
      map(state => state.matches('loading'))
    );
  }

  submitForm() {
    this.authMachineService.send(
      new LoginSubmit(this.emailCtr.value, this.passwordCtr.value)
    );
  }
}
