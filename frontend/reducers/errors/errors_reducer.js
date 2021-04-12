import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import UserErrorsReducer from './user_errors_reducer';
import AccountErrorsReducer from './account_errors_reducer';
import TransferErrorsReducer from './transfer_errors.reducer';

const ErrorsReducer = combineReducers({
  sessionErrors: SessionErrorsReducer,
  userErrors: UserErrorsReducer,
  accountErrors: AccountErrorsReducer,
  transferErrors: TransferErrorsReducer
});

export default ErrorsReducer;