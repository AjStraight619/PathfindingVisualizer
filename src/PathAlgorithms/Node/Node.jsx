import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  // Add the new methods here
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
      col,
      row,
      isStart,
      isFinish,
      isWall,
      isDraggable,
      isDragging, // Add the isDragging prop
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
      : " ";

    const nodeClasses = `node ${extra} ${isDragging ? "dragging" : ""}`;

    return (
      <div
        id={`node-${row}-${col}`}
        className={nodeClasses}
        draggable={isDraggable}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onDragStart={(e) => onDragStart(e, row, col)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, row, col)}
        onDrag={this.handleDrag} // Add the onDrag event handler
        onDragEnd={this.handleDragEnd} // Add the onDragEnd event handler
      >
        {this.props.children}
      </div>
    );
  }
}


