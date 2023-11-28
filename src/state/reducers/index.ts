import cellReducer from './cellsReducer';
import bundleReducer from './bundleReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	cells: cellReducer,
	bundle: bundleReducer
});
export default reducers;

export type RootState = ReturnType<typeof reducers>;
