import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthMachine } from 'src/app/auth/+xstate/auth-machine.service';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors$: Observable<string[]>;
  unsubscribe$: Subject<void> = new Subject();

  constructor(private authMachineService: AuthMachine) {}

  ngOnInit() {
    this.errors$ = this.authMachineService.authState$.pipe(map(state => state.context.errors));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
