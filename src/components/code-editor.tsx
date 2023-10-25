import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier/standalone';

import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
	const editorRef = useRef<any>();

	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		editorRef.current = monacoEditor;
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});
		// monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
	};

	const onFormatHandler = () => {
		// get the current value from the editor
		const unformattedValue = editorRef.current.getModel().getValue();
		// format the value
		const formattedValue = prettier.format(unformattedValue, {
			parser: 'babel',
			plugins: [ babelPlugin, estreePlugin ],
			useTabs: false,
			semi: true,
			singleQuote: true
		});
		// set the formated value back in the editor
		editorRef.current.setValue(formattedValue);
	};
	return (
		<div>
			<button onClick={onFormatHandler}>Format</button>
			<MonacoEditor
				editorDidMount={onEditorDidMount}
				value={initialValue}
				height="200px"
				language="javascript"
				theme="dark"
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 20,
					scrollBeyondLastLine: false,
					automaticLayout: true
				}}
			/>
		</div>
	);
};

export default CodeEditor;
