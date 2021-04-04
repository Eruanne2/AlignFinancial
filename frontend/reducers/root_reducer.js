import { combineReducers } from 'redux';
import EntitiesReducer from './entities/entitites_reducer';
import ErrorsReducer from './errors/errors_reducer';
import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  errors: ErrorsReducer,
  session: SessionReducer
});

export default RootReducer;