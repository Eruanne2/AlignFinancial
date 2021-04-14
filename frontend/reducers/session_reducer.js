import { RECEIVE_CURRENT_USER, LOGOUT } from '../actions/session_actions';

const SessionReducer = (state = { id: null}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      window.currentUser = action.user;
      newState.currentLogin = new Date();
      newState.id = action.user.id;
      return newState;
    case LOGOUT:
      window.currentUser = null;
      if (newState.currentLogin) newState.lastLogin = newState.currentLogin;
      newState.currentLogin = null;
      newState.id = null;
      return newState;
    default:
      return state;
  };
};

export default SessionReducer;