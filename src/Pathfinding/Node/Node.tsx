import React from "react";
import "./Node.css";
import { FiAnchor, FiChevronRight, FiCrosshair } from "react-icons/fi";
import { NodeProps } from "../../types/types";

const Node: React.FC<NodeProps> = ({
  node,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
  handleMouseMove,
  handleDragStart,
  handleDrop,
  handleDragEnd,
  shouldFadeWeight,
}) => {
  const { row, col, isStart, isFinish, isWall, isWeight, isDraggable } = node;

  const extra = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isWeight
    ? "node-weight"
    : "";

  const nodeClasses = `node ${extra}`;

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
      className={nodeClasses}
      draggable={isDraggable}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}
      onDragStart={(e) => handleDragStart(e, node, row, col)}
      onDragOver={onMove}
      onDrop={(e) => handleDrop(e, row, col)}
      onDrag={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
    >
      {isWeight ? (
        <span
          className={`weight-icon ${shouldFadeWeight ? "weight-fade" : ""}`} // <-- Use the new prop here
        >
          <FiAnchor />
        </span>
      ) : null}
      {isStart ? <FiChevronRight className="start-icon" /> : null}
      {isFinish ? <FiCrosshair className="finish-icon" /> : null}
    </div>
  );
};

export default Node;
