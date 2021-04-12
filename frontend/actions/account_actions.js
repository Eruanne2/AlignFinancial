import * as AccountsApi from '../utils/accounts_api';

export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';
export const RECEIVE_ALL_ACCOUNTS = 'RECEIVE_ALL_ACCOUNTS';
export const RECEIVE_ACCOUNT_ERRORS = 'RECEIVE_ACCOUNT_ERRORS';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export const receiveAccount = acct => {
  return {
    type: RECEIVE_ACCOUNT,
    acct
  }
};

export const receiveAllAccounts = accts => {
  return {
    type: RECEIVE_ALL_ACCOUNTS,
    accts
  }
};

export const receiveAccountErrors = errors => {
  return {
    type: RECEIVE_ACCOUNT_ERRORS,
    errors
  }
};

export const removeAccount = acctId => {
  return {
    type: REMOVE_ACCOUNT,
    acctId
  }
};



export const fetchAccount = acctId => dispatch => {
  return AccountsApi.getAccount(acctId)
    .then(res => dispatch(receiveAccount(res)))
    .fail(res => dispatch(receiveAccountErrors(res.responseJSON)));
};

export const fetchAllAccounts = () => dispatch => {
  return AccountsApi.getAllAccounts()
    .then(res => dispatch(receiveAllAccounts(res)))
    .fail(res => dispatch(receiveAccountErrors(res.responseJSON)));
};

export const createAccount = acctData => dispatch => {
  return AccountsApi.createAccount(acctData)
    .then(res => dispatch(receiveAccount(res)))
    .fail(res => dispatch(receiveAccountErrors(res.responseJSON)));
};

export const updateAccount = acctData => dispatch => {
  return AccountsApi.patchAccount(acctData)
    .then(res => dispatch(receiveAccount(res)))
    .fail(res => dispatch(receiveAccountErrors(res.responseJSON)));
};

export const deleteAccount = acctId => dispatch => {
  return AccountsApi.destroyAccount(acctId)
    .then(res => dispatch(removeAccount(res.id)))
    .fail(res => dispatch(receiveAccountErrors(res.responseJSON)));
}