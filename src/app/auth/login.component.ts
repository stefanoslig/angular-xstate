import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthMachineService } from './+xstate/auth-machine.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    unsubscribe = new Subject();
    emailCtr: AbstractControl;
    passwordCtr: AbstractControl;

    constructor(private fb: FormBuilder, private authMachineService: AuthMachineService) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: [{ value: '', disabled: false }, [Validators.email, Validators.required]],
            password: [{ value: '', disabled: false }, [Validators.required]]
        });

        this.emailCtr = this.loginForm.get('email');
        this.passwordCtr = this.loginForm.get('password');
    }

    submitForm() {
        this.authMachineService.authMachine.send({
            type: 'SUBMIT',
            username: this.emailCtr.value,
            password: this.passwordCtr.value
        });
    }

    ngOninit() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
