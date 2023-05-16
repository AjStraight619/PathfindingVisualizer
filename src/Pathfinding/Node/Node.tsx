import React from "react";
import "./Node.css";
import { FiAnchor, FiChevronRight, FiCrosshair } from "react-icons/fi";
import { NodeProps } from "../../types/types";

const Node: React.FC<NodeProps> = ({
    row,
    col,
    isStart,
    isFinish,
    isWall,
    isWeight,
    isDraggable,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseMove,
    handleDragStart,
    handleDrop,
    handleDragEnd,
  }) => {

    const extra = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isWeight
    ? "node-weight"
    : "";

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleDragEnd(row, col);
      };
    
      const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleMouseMove(row, col);
      };

    return (
        <div
      id={`node-${row}-${col}`}
      className={extra}
      draggable={isDraggable}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}
      onDragStart={(e) => handleDragStart(e, row, col)}
      onDragOver={onMove}
      onDrop={(e) => handleDrop(e, row, col)}
      onDrag={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
    >
      {isWeight ? <FiAnchor className="weight-icon" /> : null}
      {isStart ? <FiChevronRight className="start-icon" /> : null}
      {isFinish ? <FiCrosshair className="finish-icon" /> : null}
    </div>

    );
    
  };
  
  export default Node;