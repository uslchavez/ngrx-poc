import { createActionGroup, props } from '@ngrx/store';

export const routerActions = createActionGroup({
  source: 'Router',
  events: {
    Go: props<{ payload: string[] }>(),
  },
});
