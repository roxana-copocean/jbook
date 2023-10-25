import React, { useState, useEffect, useRef } from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

import Preview from './components/preview';

function App() {
	// State for user input and transpiled code
	const [ input, setInput ] = useState('');
	const [ code, setCode ] = useState('');
	const ref = useRef<any>();

	// Function to start the esbuild service when the component mounts
	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
		});
	};
	// Initialize the esbuild service when the component mounts
	useEffect(() => {
		startService();
	}, []);

	// Function to handle the click event when the user submits code
	const onClickHandler = async () => {
		if (!ref.current) {
			return;
		}

		const result = await ref.current.build({
			entryPoints: [ 'index.js' ],
			bundle: true,
			write: false,
			plugins: [ unpkgPathPlugin(), fetchPlugin(input) ],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window'
			}
		});

		// Set the transpiled code in the state
		setCode(result.outputFiles[0].text);
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

/*This component contains a textarea input element for the user to enter JavaScript code.
It initializes an esbuild service when the component mounts. Esbuild is a fast JavaScript bundler and minifier.
When the user clicks the "Submit" button, it transpiles and bundles the code entered in the textarea using esbuild and displays the result in a pre element.*/
