import React, { useState } from 'react';

function App() {
	const [ input, setInput ] = useState('');
	const [ code, setCode ] = useState('');

	const onClickHandler = () => {
		console.log(input);
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
