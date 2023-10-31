import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';
const TextEditor: React.FC = () => {
	const divRef = useRef<HTMLDivElement | null>(null);
	const [ editing, setEditing ] = useState(false);
	const [ value, setValue ] = useState('# Markdown');

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (divRef.current && event.target && divRef.current.contains(event.target as Node)) {
				return;
			}

			setEditing(false);
		};

		document.addEventListener('click', listener, { capture: true });

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);
	if (editing) {
		return (
			<div ref={divRef} className="text-editor card">
				<div className="card-content">
					<MDEditor value={value} onChange={(v) => setValue(v || '')} />
				</div>
			</div>
		);
	}
	return (
		<div onClick={() => setEditing(true)} className="text-editor">
			<MDEditor.Markdown source={value} />
		</div>
	);
};

export default TextEditor;
