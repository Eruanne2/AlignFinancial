import * as SessionApi from '../utils/session_api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const LOGOUT = 'LOGOUT';

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  }
}

export const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
};

export const logoutUser = () => {
  return { type: LOGOUT }
};

// thunk action creators

export const login = userCreds => dispatch => {
  return SessionApi.createSession(userCreds)
    .then(res => dispatch(receiveCurrentUser(res)))
    .fail(res => dispatch(receiveSessionErrors(res.responseJson)));
};

export const logout = () => dispatch => {
  return SessionApi.destroySession()
    .then(() => dispatch(logoutUser()));
};