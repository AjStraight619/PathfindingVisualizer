export type NodeType = {
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
  parent: NodeType | null;
  weight: number;
  isDraggable: boolean;
  closest: number;
  distance: number;
  totalDistance: number;
  className: string;
  opened?: boolean;
  closed?: boolean;
  // isRunning?: boolean;
};

export type NodeProps = {
  node: NodeType;
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isWeight: boolean;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseUp: () => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleDragEnd: (row: number, col: number) => void;
  // isRunning: boolean;

  handleDragStart: (
    e: React.DragEvent,
    startNode: NodeType,
    row: number,
    col: number
  ) => void;
  handleDrop: (e: React.DragEvent, row: number, col: number) => void;
  className: string;
  shouldFadeWeight: boolean;
  onMove: (
    e: React.DragEvent,
    node: NodeType,
    row: number,
    col: number
  ) => void;
  checkStartNodePosition: () => string;
};

export type GridProps = {
  grid: NodeType[][];
  handleMouseDown: (row: number, col: number) => void;
  handleMouseUp: () => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseMove: (row: number, col: number) => void;
  handleDragStart: (
    e: React.DragEvent,
    startNode: NodeType,
    row: number,
    col: number
  ) => void;
  handleDrop: (e: React.DragEvent, row: number, col: number) => void;
  handleDragEnd: (row: number, col: number) => void;
  className: string;
};

export interface Algorithm {
  id: string;
  name: string;
  isShortestPathAlgo: boolean;
  isWeighted: boolean;
  needsDiagonalMovement?: boolean;
  func?: (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType,
    allowDiagonalMovement: boolean
  ) => NodeType[];
}

export interface Maze {
  id: string;
  name: string;
  func?: (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
  ) => NodeType[];
}

export type StartNodeStateType = {
  node: NodeType;
  isDragging: boolean;
  draggedNode: NodeType | null;
};

export interface MyNavbarProps {
  runAlgorithm: (selectedAlgorithms: Algorithm[]) => void;
  algoSelection: (algo: string) => void;
  selectedAlgorithms: Algorithm[];
  algorithmMapping: { [key: string]: Algorithm };
  comparisonMode: boolean;
  isWeightToggled: boolean;
  clearVisualization: () => void;
  clearBoard: () => void;
  speed: number;
  mazeSelection: (maze: string) => void;
  toggleWeights: () => void;
  setSpeed: (speed: number) => void;
  toggleComparisonMode: () => void;
  // generatingMaze: boolean;
  generateMaze: (mazeSelection: Maze[]) => void;
  selectedMaze: Maze[];
  mazeMapping: { [key: string]: Maze };
  speedMapping: { [key: string]: number };
  speedSelected: number;
  speedSelection: (speed: string) => void;
  toggleTutorial: () => void;
  selectedSpeed: string;
  toggleAllowDiagonalMovement: () => void;
  allowDiagonalMovement: boolean;
}
