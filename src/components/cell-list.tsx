import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells }) => {
        // Provide default values if cells is undefined
        const { order = [], data = {} } = cells ?? {};
        return order.map((id) => data[id]);
    });

    const renederedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell}/>)
	return <div>{renederedCells}</div>;
};

export default CellList;
