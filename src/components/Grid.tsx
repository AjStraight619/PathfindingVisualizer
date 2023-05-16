
import Node from "../Pathfinding/Node/Node";
import { GridProps,  } from "../types/types";

const Grid: React.FC<GridProps> = ({
    grid,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseMove,
    handleDragStart,
    handleDrop,
    handleDragEnd,
  }) => {

    //const { row, col, isWall, isWeight } = node;
    return (
      <div className="grid-container">
        <div className="grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((node, nodeIdx) => (
                <Node
                  key={nodeIdx}
                  row={node.row}
                  col={node.col}
                  isStart={node.isStart}
                  isFinish={node.isFinish}
                  isWall={node.isWall}
                  isWeight={node.isWeight}
                  isDraggable={node.isStart}
                  handleMouseDown={handleMouseDown}
                  handleMouseUp={handleMouseUp}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseMove={handleMouseMove}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  handleDragEnd={handleDragEnd}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Grid;