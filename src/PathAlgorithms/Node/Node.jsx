import React, { Component } from "react";
import "./Node.css";
import { FiAnchor, FiChevronRight, FiCrosshair } from "react-icons/fi";

export default class Node extends Component {
  handleDrag = (e) => {
    e.preventDefault();
    this.props.onDrag();
  };

  handleDragEnd = (e) => {
    e.preventDefault();
    this.props.onDragEnd();
  };

  render() {
    const {
      className, // add this prop
      col,
      row,
      isStart,
      isFinish,
      isWall,
      isWeight,
      isDraggable,
      isDragging,
      isCurrent,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onDragStart,
      onDragOver,
      onDrop,
    } = this.props;

    const extra = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isWeight
      ? "node-weight"
      : this.props.visited
      ? "node-visited"
      : this.props.shortestPath
      ? "node-shortest-path"
      : isCurrent
      ? "node-current"
      : "";

    const nodeClasses = `node ${extra} ${isDragging ? "dragging" : ""}`;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${className} ${nodeClasses}${isDragging ? "dragging" : ""}`}
        draggable={isDraggable}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onDragStart={(e) => onDragStart(e, row, col)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, row, col)}
      >
        {isWeight ? <FiAnchor className="weight-icon" /> : null}
        {isStart ? <FiChevronRight className="start-icon" /> : null}
        {isFinish ? <FiCrosshair className="finish-icon" /> : null}
      </div>
    );
  }
}
