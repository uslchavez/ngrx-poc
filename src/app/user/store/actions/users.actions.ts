import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ListUserResponse, SingleUserResponse, User } from '../../models';

export const actions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': props<{ payload: { page: number } }>(),
    'Load Users Success': props<{ payload: ListUserResponse }>(),
    'Load Single User': props<{ payload: { userId: number } }>(),
    'Load Single User Success': props<{ payload: SingleUserResponse }>(),
    'Load Single User Not Found': emptyProps(),
    'Update User': props<{ payload: User }>(),
    'Update User Success': props<{ payload: User }>(),
    'Update User Failure': emptyProps(),
    'Create User': props<{ payload: User }>(),
    'Create User Success': props<{ payload: User }>(),
    'Create User Failure': emptyProps(),
    'Delete User': props<{ payload: User }>(),
    'Delete User Success': props<{ payload: User }>(),
    'Delete User Failure': emptyProps(),
  },
});
