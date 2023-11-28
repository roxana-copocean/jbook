import { produce } from 'immer';
import { ActionType } from '../actions-types';
import { Action } from '../actions';

// Bundle State Interface
interface BundleState {
	[key: string]: {
		loading: boolean;
		code: string;
		err: string;
	};
}

// Initial State
const initialState: BundleState = {};

const bundleReducer = produce((state: BundleState = initialState, action: Action): BundleState => {
	switch (action.type) {
		case ActionType.BUNDLE_START:
			state[action.payload.cellId] = {
				loading: true,
				code: '',
				err: ''
			};
			return state;
		case ActionType.BUNDLE_COMPLETE:
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code,
				err: action.payload.bundle.err
			};
			return state;
		default:
			return state;
	}
});

export default bundleReducer;
