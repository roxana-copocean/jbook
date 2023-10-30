import { useState, useEffect } from 'react';
import transpileAndBundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
export default function CodeCell() {
	// State for user input and transpiled code
	const [ input, setInput ] = useState('');
	const [ err, setErr ] = useState('');
	const [ code, setCode ] = useState('');

	useEffect(
		() => {
			const timer = setTimeout(async () => {
				const output = await transpileAndBundle(input);
				setCode(output.code);
				setErr(output.err);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		},
		[ input ]
	);

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
				</Resizable>
				<Preview code={code} err={err} />
			</div>
		</Resizable>
	);
}
