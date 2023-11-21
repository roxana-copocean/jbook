// import CodeCell from './components/code-cell';
import React from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';

import { store } from './state/store';
import CellList from './components/cell-list';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<CellList />
			</div>
		</Provider>
	);
};
export default App;
