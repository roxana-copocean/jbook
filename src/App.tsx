import React, { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

function App() {
	const [ input, setInput ] = useState('');
	const [ code, setCode ] = useState('');
	const ref = useRef<any>();

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm'
		});
	};

	useEffect(() => {
		startService();
	}, []);
	const onClickHandler = async () => {
		if (!ref.current) {
			return;
		}
		const result = await ref.current.build({
			entryPoints: [ 'index.js' ],
			bundle: true,
			write: false,
			plugins: [ unpkgPathPlugin() ]
		});

		// console.log(result);
		setCode(result.outputFiles[0].text);
	};
	return (
		<div>
			<textarea onChange={(e) => setInput(e.target.value)} value={input} />
			<div>
				<button onClick={onClickHandler}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
}

export default App;
