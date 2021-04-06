import { TOGGLE_SIDEBAR, TOGGLE_NIGHTMODE, TOGGLE_ACCESSIBILE_VIEW } from '../actions/ui_actions';

const defaultState = { sidebar: false, nightMode: false, accessibleView: false }

const UIReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case TOGGLE_SIDEBAR:
      newState.sidebar = !state.sidebar;
      return newState;
    case TOGGLE_NIGHTMODE:
      newState.nightMode = !state.nightMode;
      return newState;
    case TOGGLE_ACCESSIBILE_VIEW:
      newState.accessibleView = !state.accessibleView;
      return newState;
    default:
      return state;
  };
};

export default UIReducer;