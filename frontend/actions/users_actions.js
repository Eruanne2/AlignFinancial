import * as UsersApi from '../utils/users_api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';


export const receiveUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

export const recieveUserErrors = errors => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors
  };
};

// thunk action creators
export const createUser = userData => dispatch => {
  return UsersApi.createUser(userData)
    .then(res => dispatch(receiveUser(res)))
    .fail(res => dispatch(recieveUserErrors(res.responseJSON)));
};

export const fetchUser = userId => dispatch => {
  return UsersApi.getUser(userId)
    .then(res => dispatch(receiveUser(res)))
    .fail(res => dispatch(recieveUserErrors(res.responseJSON)));
}

export const updateUser = userData => dispatch => {
  return UsersApi.updateUser(userData)    // userData MUST include id!!!!!!
    .then(res => dispatch(receiveUser(res)))
    .fail(res => dispatch(recieveUserErrors(res.responseJSON)));
};