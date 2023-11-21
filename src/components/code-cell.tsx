import { useState, useEffect } from 'react';
import transpileAndBundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
	cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	// State for user input and transpiled code
	const [ input, setInput ] = useState('');
	const [ err, setErr ] = useState('');
	const [ code, setCode ] = useState('');

	const { updateCell } = useActions();

	useEffect(
		() => {
			const timer = setTimeout(async () => {
				const output = await transpileAndBundle(cell.content);
				setCode(output.code);
				setErr(output.err);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		},
		[ cell.content ]
	);

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
				</Resizable>
				<Preview code={code} err={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
