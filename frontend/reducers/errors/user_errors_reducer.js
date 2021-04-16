import { CLEAR_ERRORS } from '../../actions/ui_actions';
import { RECEIVE_USER_ERRORS, RECEIVE_CURRENT_USER } from '../../actions/users_actions';

const UserErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  };
};

export default UserErrorsReducer;