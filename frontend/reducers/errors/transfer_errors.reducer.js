import { RECEIVE_TRANSFER_ERRORS, RECEIVE_TRANSFER } from '../../actions/transfer_actions';

const TransferErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TRANSFER_ERRORS:
      return action.errors;
    case RECEIVE_TRANSFER:
      return [];
    default:
      return state;
  }
};

export default TransferErrorsReducer;