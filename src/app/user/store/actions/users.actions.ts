import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ListUserResponse } from '../../models';

export const actions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': props<{ payload: { page: number } }>(),
    'Load Users Success': props<{ payload: ListUserResponse }>(),
  },
});
