import { authReducer } from './reducers/auth.reducer';

export * from './actions/auth.actions';
export * from './selectors';
export * from './effects';

export const reducers = { state: authReducer };
