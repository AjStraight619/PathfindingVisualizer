export type Node = {
    row: number;
    col: number;
    isStart: boolean;
    isFinish: boolean;
    isWall: boolean;
    isWeight: boolean;
    isVisited: boolean;
    hScore: number;
    gScore: number;
    fScore: number;
    parent: Node | null;
    weight: number;
    draggable: boolean;
    closest: number;
    distance: number;
};

export type NodeProps = {
    row: number;
    col: number;
    isStart: boolean;
    isFinish: boolean;
    isWall: boolean;
    isWeight: boolean;
    isDraggable: boolean;
    handleMouseDown: (row: number, col: number) => void;
    handleMouseUp: () => void;
    handleMouseEnter: (row: number, col: number) => void;
    handleMouseMove: (row: number, col: number) => void;
    handleDragStart: (e: React.DragEvent, row: number, col: number) => void;
    handleDrop: (e: React.DragEvent, row: number, col: number) => void;
    handleDragEnd: (row: number, col: number) => void;
  };


  export type GridProps = {
    grid: Node[][];
    handleMouseDown: (row: number, col: number) => void;
    handleMouseUp: () => void;
    handleMouseEnter: (row: number, col: number) => void;
    handleMouseMove: (row: number, col: number) => void;
    handleDragStart: (e: React.DragEvent, row: number, col: number) => void;
    handleDrop: (e: React.DragEvent, row: number, col: number) => void;
    handleDragEnd: (row: number, col: number) => void;
  };

//export type GridGraph = Node[][];