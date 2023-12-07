import { useEffect } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import "./code-cell.css"

interface CodeCellProps {
	cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundle?.[cell.id])?? { code: '', err: '', loading: false };


	const cumulativeCodeRender = useTypedSelector((state) => {
		if(!state.cells){
			return ""
		}
    const {order, data } = state.cells
		const orderedCells = order.map((id) => data[id])

		const showFunction = `
	        import _React from "react";
			import _ReactDOM from "react-dom";
			var show = (value) => {
				if(typeof value === "object"){
					if(value.$$typeof && value.props){
                       _ReactDOM.render(value, document.querySelector("#root") );
					}else{

						 document.querySelector("#root").innerHTML = JSON.stringify(value);
					}
				} else  {

					 document.querySelector("#root").innerHTML = value;
				}
			}
		`
		const showFunctionNoOpperation = "var show = () => {}"
		const cumulativeCode = []
		for(let c of orderedCells){
			if(c.type === "code"){
				if(c.id === cell.id){
					cumulativeCode.push(showFunction)
				}else{
					cumulativeCode.push(showFunctionNoOpperation)
				}
				cumulativeCode.push(c.content)
			}
			if(c.id === cell.id){
				break
			}
		}
		return cumulativeCode.join("\n")
	})
	
   useEffect(
		() => {
			if(!bundle){
				createBundle(cell.id, cumulativeCodeRender)
				return
			}
			const timer = setTimeout(async () => {
				createBundle(cell.id, cumulativeCodeRender);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ cell.content, cell.id, createBundle,  cumulativeCodeRender]
	);

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
				</Resizable>
				<div className='progress-wrapper'>
				{
					!bundle || bundle.loading ?( 

					<div className='progress-cover'>
						<progress className='progress is-small is-primary' max="100">Loading</progress>
					</div>
				  
					) : (<Preview code={bundle.code} err={bundle.err} />)
				}
				</div>
			
			</div>
		</Resizable>
	);
};

export default CodeCell;
