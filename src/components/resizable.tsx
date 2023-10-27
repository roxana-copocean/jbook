import { ReactNode } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;
	if (direction === 'horizontal') {
		resizableProps = {
			width: window.innerWidth * 0.75,
			height: Infinity,
			resizeHandles: [ 'e' ],
			maxConstraints: [ window.innerWidth * 0.75, Infinity ],
			minConstraints: [ window.innerWidth * 0.2, Infinity ]
		};
	} else {
		resizableProps = {
			height: 300,
			width: window.innerWidth,
			resizeHandles: [ 's' ],
			maxConstraints: [ Infinity, window.innerHeight * 0.95 ],
			minConstraints: [ Infinity, window.innerHeight * 0.07 ]
		};
	}

	if (direction === 'horizontal') {
		return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
	}
	return (
		<ResizableBox
			height={300}
			width={window.innerWidth}
			resizeHandles={[ 's' ]}
			maxConstraints={[ Infinity, window.innerHeight * 0.95 ]}
			minConstraints={[ Infinity, window.innerHeight * 0.07 ]}
		>
			{children}
		</ResizableBox>
	);
};

export default Resizable;
