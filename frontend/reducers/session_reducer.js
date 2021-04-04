import { RECEIVE_CURRENT_USER, LOGOUT } from '../actions/session_actions';

const SessionReducer = (state = { id: null}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return { id: action.user.id};
    case LOGOUT:
      return { id: null };
    default:
      return state;
  };
};

export default SessionReducer;