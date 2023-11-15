// import CodeCell from './components/code-cell';
import React from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';

import { store } from './state/store';

import TextEditor from './components/text-editor';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<TextEditor />
			</div>
		</Provider>
	);
};
export default App;
