import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthMachineService } from 'src/app/auth/+xstate/auth-machine.service';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors$: Observable<string[]>;
  unsubscribe$: Subject<void> = new Subject();

  constructor(private authMachineService: AuthMachineService) {}

  ngOnInit() {
    this.errors$ = this.authMachineService.authState$.pipe(map(state => {
      const e = state.context.errors;
      return Object.keys(e || {}).map(key => `${key} ${e[key]}`);
    }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
