import { RECEIVE_USER } from '../../actions/users_actions';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_USER:
      let nextState = Object.assign({}, state);
      nextState[action.user.id] = action.user;
    default:
      return state;
  };
};

export default UsersReducer;