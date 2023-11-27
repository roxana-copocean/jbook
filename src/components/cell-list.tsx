import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

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
			<AddCell nextCellId={cell.id} />
			<CellListItem cell={cell} />
		</React.Fragment>
	));
	return (
		<div>
			{renederedCells}

			<AddCell nextCellId={null} makeVisible={cells.length === 0} />
		</div>
	);
};

export default CellList;
