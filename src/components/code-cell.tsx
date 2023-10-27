import { useState } from 'react';
import transpileAndBundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
export default function CodeCell() {
	// State for user input and transpiled code
	const [ input, setInput ] = useState('');
	const [ code, setCode ] = useState('');

	const onClickHandler = async () => {
		const output = await transpileAndBundle(input);
		setCode(output);
	};

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />

					<pre>{code}</pre>
				</Resizable>
				<Preview code={code} />
			</div>
		</Resizable>
	);
}
