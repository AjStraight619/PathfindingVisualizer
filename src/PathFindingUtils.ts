import { GridProps, Node } from "./types/types";

export const START_NODE_ROW = 19;
export const START_NODE_COL = 8;
export const FINISH_NODE_ROW = 19;
export const FINISH_NODE_COL = 57;
export const weghtedAlgorithms = "Dijkstra" && "A*";

// row: number;
// col: number;
// isStart: boolean;
// isFinish: boolean;
// isWall: boolean;
// isWeight: boolean;
// isVisited: boolean;
// hScore: number;
// gScore: number;
// fScore: number;
// parent: Node | null;
// weight: number;
// draggable: boolean;
// closest: number;
// distance: number;


export const getInitialGrid = (): Node[][] => {
    const grid = [];
    for (let row = 0; row < 40; row++) {
      const currentRow = [];
      for (let col = 0; col < 69; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
  
    return grid;
  };

const createNode = (row: number, col: number): Node => {
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
    distance: 0,
    parent: null,
    weight: 1,
    draggable: isStart,
     };
};

export const getNewGridWithWallToggled = (
  grid: Node[][],
  row: number,
  col: number
): Node[][] => {
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
  grid: Node[][],
  walls: [number, number][]
): Node[][] => {
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
  grid: Node[][],
  row: number,
  col: number
): Node[][] => {
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

export function getNodesInShortestPathOrder(finishNode: Node): Node[] {
  const nodesInShortestPathOrder: Node[] = [];
  let currentNode: Node | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.parent ? currentNode.parent : null;
  }
  return nodesInShortestPathOrder;
}
