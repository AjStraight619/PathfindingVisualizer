import React from "react";
import "./Node.css";
import { FiAnchor, FiChevronRight, FiCrosshair } from "react-icons/fi";
import { NodeProps } from "../../types/types";

const Node: React.FC<NodeProps> = ({
  node,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
  handleDragStart,
  handleDrop,
  shouldFadeWeight,
  onMove,
  handleDragEnd,
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

  // const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  return (
    <div
      id={`node-${row}-${col}`}
      className={nodeClasses}
      draggable={isDraggable}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}
      onDragStart={(e) => handleDragStart(e, node, row, col)}
      onDragOver={(e) => onMove(e, node, row, col)}
      onDrop={(e) => handleDrop(e, row, col)}
      onDrag={(e) => e.preventDefault()}
      onDragEnd={() => handleDragEnd(row, col)}
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
