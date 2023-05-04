import { reducer } from './reducers/users.reducer';

export * from './actions';
export * from './selectors';
export * from './effects';

export const reducers = { list: reducer };
