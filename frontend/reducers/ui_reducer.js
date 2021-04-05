import { TOGGLE_SIDEBAR } from '../actions/ui_actions';

const defaultState = { sidebar: false }

const UIReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case TOGGLE_SIDEBAR:
      newState.sidebar = !state.sidebar;
      return newState;
    default:
      return state;
  };
};

export default UIReducer;