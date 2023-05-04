import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ListUserResponse, SingleUserResponse } from '../../models';

export const actions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': props<{ payload: { page: number } }>(),
    'Load Users Success': props<{ payload: ListUserResponse }>(),
    'Load Single User': props<{ payload: { userId: number } }>(),
    'Load Single User Success': props<{ payload: SingleUserResponse }>(),
    'Load Single User Not Found': emptyProps(),
  },
});
