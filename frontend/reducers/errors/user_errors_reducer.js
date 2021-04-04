import { RECEIVE_USER_ERRORS, RECEIVE_USER } from '../../actions/users_actions';

const UserErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_USER_ERRORS:
      return state.concat(action.errors);
    case RECEIVE_USER:
      return [];
    default:
      return state;
  };
};

export default UserErrorsReducer;