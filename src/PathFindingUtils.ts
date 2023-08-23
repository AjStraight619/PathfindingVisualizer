import { NodeType } from "./types/types";

export const START_NODE_ROW = 19;
export const START_NODE_COL = 8;
export const FINISH_NODE_ROW = 19;
export const FINISH_NODE_COL = 57;
export const weghtedAlgorithms = "Dijkstra" && "A*";

export const getInitialGrid = (): NodeType[][] => {
  const grid = [];
  for (let row = 0; row < 40; row++) {
    const currentRow = [];
    for (let col = 0; col < 68; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (row: number, col: number): NodeType => {
  const isStart = row === START_NODE_ROW && col === START_NODE_COL;
  return {
    row,
    col,
    isStart,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    isWeight: false,
    isVisited: false,
    hScore: 0,
    gScore: 0,
    fScore: 0,
    closest: 0,
    totalDistance: 0,
    distance: 0,
    parent: null,
    weight: 1,
    isDraggable: isStart,
    className: "",
  };
};

export const getNewGridWithWallToggled = (
  grid: NodeType[][],
  row: number,
  col: number
): NodeType[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isWeight) {
    return newGrid;
  }
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const getNewGridWithMaze = (
  grid: NodeType[][],
  walls: [number, number][]
): NodeType[][] => {
  let newGrid = grid.slice();
  for (let wall of walls) {
    let node = grid[wall[0]][wall[1]];

    let newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[wall[0]][wall[1]] = newNode;
  }
  return newGrid;
};

export const getNewGridWithWeightToggled = (
  grid: NodeType[][],
  row: number,
  col: number
): NodeType[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isWall) {
    return newGrid;
  }
  const newNode = {
    ...node,
    isWeight: !node.isWeight,
    weight: Math.floor(Math.random() * 10) + 2, // set weight to random number between 2 and 10
  };

  newGrid[row][col] = newNode;
  return newGrid;
};

export const getNodesInShortestPathOrder = (
  finishNode: NodeType
): NodeType[] => {
  const nodesInShortestPathOrder: NodeType[] = [];
  let currentNode: NodeType | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.parent ? currentNode.parent : null;
  }
  return nodesInShortestPathOrder;
};

export const getNeighbors = (
  node: NodeType,
  grid: NodeType[][]
): NodeType[] => {
  const neighbors: NodeType[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};
