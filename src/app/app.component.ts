import { Component } from '@angular/core';
import { AuthMachineFacade } from './auth/+xstate/auth-machine.facade';
import { Observable } from 'rxjs';
import { User } from './shared/api/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean> = this.authMachineFacade.isLoggedIn$;
  user$: Observable<User> = this.authMachineFacade.user$;

  constructor(private authMachineFacade: AuthMachineFacade) {}


}
