import { RECEIVE_TRANSFER, RECEIVE_ALL_TRANSFERS } from '../../actions/transfer_actions';

const TransfersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TRANSFER:
      let nextState = Object.assign({}, state);
      nextState[action.transfer.id] = action.transfer;
      return nextState;
    case RECEIVE_ALL_TRANSFERS:
      return action.transfers;
    default:
      return state;
  }
};

export default TransfersReducer;