import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
	code: string;
	err: string;
}

// Define the HTML template that will be displayed in the iframe.
const html = `
<html>
<head>
<style>html {background-color: white}</style>
</head>
<body>
<div id="root"></div>
<script>
const handleError = (err) => {
	const root = document.getElementById("root");
	root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + 
	'</div>';
	console.error(err);
}
window.addEventListener("error", (event) => {
	handleError(event.error)
})
window.addEventListener("message", (event) => {
	
    try{
        eval(event.data);
    }catch(err){
        handleError(err)
    }
},false);
        </script>
</body>
</html>
`;
const Preview: React.FC<PreviewProps> = ({ code, err }) => {
	const iframeRef = useRef<any>();
	useEffect(
		() => {
			iframeRef.current.srcdoc = html;
			setTimeout(() => {
				iframeRef.current.contentWindow.postMessage(code, '*');
			}, 50);
		},
		[ code ]
	);

	console.log(err);
	return (
		<div className="iframe-wrapper">
			<iframe title="preview" ref={iframeRef} sandbox="allow-scripts" srcDoc={html} />
			{err && <div className="preview-error">{err}</div>}
		</div>
	);
};

export default Preview;
