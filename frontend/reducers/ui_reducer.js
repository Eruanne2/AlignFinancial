import { TOGGLE_SIDEBAR, TOGGLE_NIGHTMODE, TOGGLE_ACCESSIBILE_VIEW } from '../actions/ui_actions';
import { RECEIVE_CURRENT_USER, LOGOUT } from '../actions/session_actions';

const defaultState = { sidebar: false, nightMode: false, accessibleView: false }

const UIReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case TOGGLE_SIDEBAR:
      newState.sidebar = !state.sidebar;
      (newState.sidebar) ? 
        document.body.classList.add('modal')
        :
        document.body.classList.remove('modal')
      return newState;
    case RECEIVE_CURRENT_USER:
      if (state.sidebar) {
        newState.sidebar = false;
        document.body.classList.remove('modal')
      }
      return newState;
    case LOGOUT:
      if (state.sidebar) {
        newState.sidebar = false;
        document.body.classList.remove('modal')
      }
      if (state.nightMode) {
        newState.nightMode = false;
        document.body.classList.remove('night-mode')
      }
      return newState;
    case TOGGLE_NIGHTMODE:
      newState.nightMode = !state.nightMode;
      (newState.nightMode) ?
        document.body.classList.add('night-mode')
        :
        document.body.classList.remove('night-mode')
      return newState;
    case TOGGLE_ACCESSIBILE_VIEW:
      newState.accessibleView = !state.accessibleView;
      return newState;
    default:
      return state;
  };
};

export default UIReducer;