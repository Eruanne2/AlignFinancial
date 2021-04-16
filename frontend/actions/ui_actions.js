export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_NIGHTMODE = 'TOGGLE_NIGHTMODE';
export const TOGGLE_ACCESSIBILE_VIEW = 'TOGGLE_ACCESSIBILE_VIEW';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const toggleSidebar = () => {
  return {type: TOGGLE_SIDEBAR}
};

export const toggleNightMode = () => {
  return { type: TOGGLE_NIGHTMODE }
};

export const toggleAccessibleView = () => {
  return { type: TOGGLE_ACCESSIBILE_VIEW }
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS }
}
