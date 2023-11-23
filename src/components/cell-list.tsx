import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells }) => {
        // Provide default values if cells is undefined
        const { order = [], data = {} } = cells ?? {};
        return order.map((id) => data[id]);
    });

    const renederedCells = cells.map(cell => 
        <React.Fragment  key={cell.id} >
        <AddCell  nextCellId={cell.id}/>
    <CellListItem  cell={cell}/>
        </React.Fragment>
    )
	return <div>
        {renederedCells}
        <AddCell nextCellId={null}/>
        </div>;
};

export default CellList;
