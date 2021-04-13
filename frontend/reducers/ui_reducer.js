import { TOGGLE_SIDEBAR, TOGGLE_NIGHTMODE, TOGGLE_ACCESSIBILE_VIEW } from '../actions/ui_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const defaultState = { sidebar: false, nightMode: false, accessibleView: false }

const UIReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case TOGGLE_SIDEBAR:
      newState.sidebar = !state.sidebar;
      (newState.sidebar) ? 
        document.querySelector('#background-modal').classList.add('modal') 
        :
        document.querySelector('#background-modal').classList.remove('modal')
      return newState;
    case RECEIVE_CURRENT_USER:
      if (state.sidebar) {
        newState.sidebar = false;
        document.querySelector('#background-modal').classList.remove('modal') 
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