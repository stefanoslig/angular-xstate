import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { AuthMachineService } from './+xstate/auth-machine.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  unsubscribe = new Subject();
  emailCtr: AbstractControl;
  passwordCtr: AbstractControl;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private authMachineService: AuthMachineService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [{ value: '', disabled: false }, [Validators.email, Validators.required]],
      password: [{ value: '', disabled: false }, [Validators.required]]
    });
    this.emailCtr = this.loginForm.get('email');
    this.passwordCtr = this.loginForm.get('password');

    this.loading$ = this.authMachineService.authState$.pipe(map(state => state.matches('loading')));
  }

  submitForm() {
    this.authMachineService.authMachine.send({
      type: 'SUBMIT',
      username: this.emailCtr.value,
      password: this.passwordCtr.value
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
