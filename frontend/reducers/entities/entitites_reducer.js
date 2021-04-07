import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import AccountsReducer from './accounts_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  accounts: AccountsReducer
});

export default EntitiesReducer;