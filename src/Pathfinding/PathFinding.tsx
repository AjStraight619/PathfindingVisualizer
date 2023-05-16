import React, { useState, useEffect } from 'react';
import { getInitialGrid } from '../PathFindingUtils';
import { Node } from '../types/types';
import Grid from '../components/Grid';
const PathFinding = () => {
  const [grid, setGrid] = useState<Node[][]>([[]])

  useEffect(() => {
    setGrid(getInitialGrid)
  }, [])
  const handleMouseDown = (row: number, col: number) => {
    
  }

  return (
    <div>
        <Grid
        grid={grid}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        handleMouseMove={handleMouseMove}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDragEnd={handleDragEnd}

        />
    </div>
  )
}

export default PathFinding;

