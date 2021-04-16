import { RECEIVE_ACCOUNT_ERRORS, RECEIVE_ACCOUNT, RECEIVE_ALL_ACCOUNTS } from '../../actions/account_actions';
import { CLEAR_ERRORS } from '../../actions/ui_actions';

const AccountErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_ACCOUNT_ERRORS:
      return action.errors;
    case RECEIVE_ACCOUNT:
      return [];
    case RECEIVE_ALL_ACCOUNTS:
      return [];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  };
};

export default AccountErrorsReducer;