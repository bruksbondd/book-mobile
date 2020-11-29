import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import  ThunkMiddleware, { ThunkAction as ThankAc } from 'redux-thunk';

import { contactsReducer } from './contactReducer'

const rootReducer = combineReducers({
  contact: contactsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {
    [keys: string]: (...args: any[]) => infer U;
  }
  ? U
  : never;

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
  > = ThankAc<R, AppStateType, unknown, A>;

export const store = createStore(
  rootReducer,
  compose(applyMiddleware( ThunkMiddleware))
);