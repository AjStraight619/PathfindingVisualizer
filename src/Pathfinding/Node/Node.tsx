import React from "react";
import "./Node.css";
import {
  FiAnchor,
  FiChevronRight,
  FiCrosshair,
  FiChevronDown,
  FiChevronLeft,
  FiChevronUp,
} from "react-icons/fi";
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
  checkStartNodePosition,
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
  const direction = isStart ? checkStartNodePosition() : null;

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
      {isWeight && (
        <span
          className={`weight-icon ${shouldFadeWeight ? "weight-fade" : ""}`}
        >
          <FiAnchor />
        </span>
      )}

      {isStart && (
        <>
          {direction === "left" && <FiChevronLeft className="start-icon" />}
          {direction === "right" && <FiChevronRight className="start-icon" />}
          {direction === "up" && <FiChevronUp className="start-icon" />}
          {direction === "down" && <FiChevronDown className="start-icon" />}
        </>
      )}

      {isFinish && <FiCrosshair className="finish-icon" />}
    </div>
  );
};

export default Node;
