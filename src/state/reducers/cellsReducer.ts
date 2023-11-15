import { produce } from 'immer';
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
const cellReducer = produce((state: CellsState = initialState, action: Action) => {
	switch (action.type) {
		// update cell using immer
		case ActionType.UPDATE_CELL:
			state.data[action.payload.id].content = action.payload.content;
			return;
		// delete cell using immer
		case ActionType.DELETE_CELL:
			delete state.data[action.payload];
			state.order = state.order.filter((id) => id !== action.payload);
			return;
		// move cell using immer
		case ActionType.MOVE_CELL:
			const { direction } = action.payload;
			const index = state.order.findIndex((id) => id === action.payload.id);
			const targetIndex = direction === 'up' ? index - 1 : index + 1;
			if (targetIndex < 0 || targetIndex > state.order.length - 1) {
				return;
			}
			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = action.payload.id;
			return;
		// insert cell before using immer
		case ActionType.INSERT_CELL_BEFORE:
			return;
		default:
			return state;
	}
});

export default cellReducer;
