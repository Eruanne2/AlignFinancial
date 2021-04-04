import { RECEIVE_CURRENT_USER } from '../../actions/users_actions';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      let nextState = Object.assign({}, state);
      nextState[action.user.id] = action.user;
      return nextState;
    default:
      return state;
  };
};

export default UsersReducer;