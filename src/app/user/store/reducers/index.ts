import { createFeatureSelector } from '@ngrx/store';

import { UserStore } from '../../models';
import { listReducer, singleUserReducer } from '../reducers';

export * from './single-user.reducer';
export * from './users.reducer';

export const getUsers = createFeatureSelector<UserStore>('users');

export const reducers = { list: listReducer, single: singleUserReducer };
