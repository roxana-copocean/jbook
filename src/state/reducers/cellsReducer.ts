import { ActionType } from '../actions-types';
import { Action } from '../actions';
import { Cell } from '../cell';

// Cells state interface
interface CellsState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

// Initial State
const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {}
};

// Cells Reducer

const cellReducer = (state: CellsState = initialState, action: Action): CellsState => {
	switch (action.type) {
		case ActionType.UPDATE_CELL:
			return state;
		case ActionType.DELETE_CELL:
			return state;
		case ActionType.MOVE_CELL:
			return state;
		case ActionType.INSERT_CELL_BEFORE:
			return state;
		default:
			return state;
	}
};

export default cellReducer;
