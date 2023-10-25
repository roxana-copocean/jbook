import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier/standalone';

import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

import './code-editor.css';
import './syntax.css';

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

		const highlighter = new Highlighter(
			// @ts-ignore
			window.monaco,
			codeShift,
			monacoEditor
		);
		highlighter.highLightOnDidChangeModelContent(() => {}, () => {}, undefined, () => {});
	};

	const onFormatHandler = async () => {
		try {
			// get the current value from the editor
			const unformattedValue = editorRef.current.getModel().getValue();

			// format the value
			const formattedValue = await prettier.format(unformattedValue, {
				parser: 'babel',
				plugins: [ babelPlugin, estreePlugin ],
				useTabs: false,
				semi: true,
				singleQuote: true
			});

			// set the formated value back in the editor
			editorRef.current.setValue(formattedValue);
		} catch (err) {
			console.error('Error formating code:', err);
		}
	};
	return (
		<div className="editor-wrapper">
			<button className="button button-format is-primary is-small" onClick={onFormatHandler}>
				Format
			</button>
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
