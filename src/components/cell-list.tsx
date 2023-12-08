import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells }) => {
		if (!cells) {
			return [];
		}

		const order = cells.order || [];
		const data = cells.data || {};

		return order.map((id) => data[id]);
	});

	const renederedCells = cells.map((cell) => (
		<React.Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell prevCellId={cell.id} />
		</React.Fragment>
	));
	return (
		<div className="cell-list">
			<AddCell prevCellId={null} makeVisible={cells.length === 0} />
			{renederedCells}
		</div>
	);
};

export default CellList;
