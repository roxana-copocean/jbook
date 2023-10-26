import { useState } from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import transpileAndBundle from './bundler';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

function App() {
	// State for user input and transpiled code
	const [ input, setInput ] = useState('');
	const [ code, setCode ] = useState('');

	const onClickHandler = async () => {
		const output = await transpileAndBundle(input);
		setCode(output);
	};

	return (
		<div>
			<CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
			<div>
				<button onClick={onClickHandler}>Submit</button>
			</div>
			<pre>{code}</pre>
			<Preview code={code} />
		</div>
	);
}
export default App;
