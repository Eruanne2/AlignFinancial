import { RECEIVE_ACCOUNT_ERRORS, RECEIVE_ACCOUNT } from '../../actions/account_actions';

const AccountErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_ACCOUNT_ERRORS:
      return action.errors;
    case RECEIVE_ACCOUNT:
      return [];
    default:
      return state;
  };
};

export default AccountErrorsReducer;