import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
	return (
		<MonacoEditor
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
	);
};

export default CodeEditor;
