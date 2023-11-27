import React from 'react';
import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
	nextCellId: string | null;
	makeVisible?: boolean;
}
const AddCell: React.FC<AddCellProps> = ({ nextCellId, makeVisible }) => {
	const { insertCellAfter } = useActions();
	return (
		<div className={`add-cell ${makeVisible && 'make-visible'}`}>
			<div className="add-buttons">
				<button
					className="button is-rounded is-primary is-smal"
					onClick={() => insertCellAfter(nextCellId, 'code')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Code</span>
				</button>
				<button
					className="button is-rounded is-primary is-smal"
					onClick={() => insertCellAfter(nextCellId, 'text')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className="divider-line" />
		</div>
	);
};

export default AddCell;
