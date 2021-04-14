import * as TransfersApi from '../utils/transfers_api';

export const RECEIVE_TRANSFER = 'RECEIVE_TRANSFER';
export const RECEIVE_ALL_TRANSFERS = 'RECEIVE_TRANSFERS';
export const RECEIVE_TRANSFER_ERRORS = 'RECEIVE_TRANSFER_ERRORS';

export const receiveTransfer = transfer => {
  return {
    type: RECEIVE_TRANSFER,
    transfer
  }
};

export const receiveAllTransfers = transfers => {
  return {
    type: RECEIVE_ALL_TRANSFERS,
    transfers
  }
};

export const receiveTransferErrors = errors => {
  return {
    type: RECEIVE_TRANSFER_ERRORS,
    errors
  }
};


export const fetchTransfer = transferId => dispatch => {
  return TransfersApi.getTransfer(transferId)
    .then(res => dispatch(receiveTransfer(res)))
    .fail(res => dispatch(receiveTransferErrors(res.responseJSON)))
};

export const fetchAllTransfers = () => dispatch => {
  return TransfersApi.getAllTransfers()
    .then(res => dispatch(receiveAllTransfers(res)))
    .fail(res => dispatch(receiveTransferErrors(res.responseJSON)))
};

export const createTransfer = transferData => dispatch => {
  return TransfersApi.createTransfer(transferData)
    .then(res => dispatch(receiveTransfer(res)))
    .fail(res => dispatch(receiveTransferErrors(res.responseJSON)))
};