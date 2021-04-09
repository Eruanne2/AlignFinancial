import { RECEIVE_ACCOUNT, RECEIVE_ALL_ACCOUNTS, REMOVE_ACCOUNT } from '../../actions/account_actions';

const AccountsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_ACCOUNT:
      nextState[action.acct.id] = action.acct;
      return nextState;
    case RECEIVE_ALL_ACCOUNTS:
      nextState = action.accts;
      return nextState;
    case REMOVE_ACCOUNT:
      delete nextState[action.acctId]
      return nextState;
    default:
      return state;
  };
};

export default AccountsReducer;