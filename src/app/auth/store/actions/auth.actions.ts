import { createActionGroup, props } from '@ngrx/store';
import {
  LoginDTO,
  LoginResponse,
  LoginResponseFailure,
  RegisterResponse,
  RegisterResponseFailure,
} from '../../model';

export const actions = createActionGroup({
  source: 'Auth',
  events: {
    'Register User': props<{ payload: LoginDTO }>(),
    'Register User Success': props<{ payload: RegisterResponse }>(),
    'Register User Failure': props<{ payload: RegisterResponseFailure }>(),
    'Login User': props<{ payload: LoginDTO }>(),
    'Login User Success': props<{ payload: LoginResponse }>(),
    'Login User Failure': props<{ payload: LoginResponseFailure }>(),
  },
});
