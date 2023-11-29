import { ActionType } from '../actions-types';
import { Dispatch } from 'redux';
import {
	Action,
	UpdateCellAction,
	DeleteCellAction,
	InsertCellAfterAction,
	MoveCellAction,
	Direction,
	BundleCompleteAction,
	BundleStartAction
} from '../actions';
import transpileAndBundle from '../../bundler';
import { CellTypes } from '../cell';

// Cells Action Creators

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: {
			id,
			content
		}
	};
};

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id
	};
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id,
			direction
		}
	};
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload: {
			id,
			type: cellType
		}
	};
};

// Bundle Action Creators
export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId: cellId
			}
		});
		const result = await transpileAndBundle(input);
		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId: cellId,
				bundle: {
					code: result.code,
					err: result.err
				}
			}
		});
	};
};
