import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of, take } from 'rxjs';

import { RouterEffects } from './router.effect';
import { cold, hot } from 'jasmine-marbles';
import { routerActions } from '../actions';

describe('router effect', () => {
  let router: Router;
  let actions$ = new Observable<Action>();
  let effect: RouterEffects;

  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [RouterEffects, provideMockActions(() => actions$)],
    });

    router = TestBed.inject(Router);
    effect = TestBed.inject(RouterEffects);

    navigateSpy = spyOn(router, 'navigate');
  });

  it('should call router.navigate on routerActions.go action', () => {
    actions$ = of(routerActions.go({ payload: ['page1'] }));

    effect.Go$.pipe(take(1)).subscribe();

    expect(navigateSpy).toHaveBeenCalledWith(['page1']);
  });
});
