import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import AccountsReducer from './accounts_reducer';
import TransfersReducer from './transfers_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  accounts: AccountsReducer,
  transfers: TransfersReducer
});

export default EntitiesReducer;