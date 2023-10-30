import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
	const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);
	const [ width, setWidth ] = useState(window.innerWidth * 0.75);
	let resizableProps: ResizableBoxProps;

	useEffect(
		() => {
			let timer: any;
			const handleResize = () => {
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					setInnerWidth(window.innerWidth);
					setInnerHeight(window.innerHeight);
					if (window.innerWidth * 0.75 < width) {
						setWidth(window.innerWidth * 0.75);
					}
				}, 100);
			};
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		},
		[ width ]
	);

	// horizontal resize
	if (direction === 'horizontal') {
		resizableProps = {
			className: 'resize-horizontal',
			width: width,
			height: Infinity,
			resizeHandles: [ 'e' ],
			maxConstraints: [ innerWidth * 0.75, Infinity ],
			minConstraints: [ innerWidth * 0.2, Infinity ],
			onResizeStop: (event, data) => {
				setWidth(data.size.width);
			}
		};
	} else {
		// vertical resize
		resizableProps = {
			height: 300,
			width: innerWidth,
			resizeHandles: [ 's' ],
			maxConstraints: [ Infinity, innerHeight * 0.95 ],
			minConstraints: [ Infinity, innerHeight * 0.07 ]
		};
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
