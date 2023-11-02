import Heap from "heap";
import { NodeType } from "../types/types";
import { getNeighborsForDiagonal } from "../PathFindingUtils";

const jumpPointSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
): NodeType[] => {
  finishNode.isVisited = false;
  console.log(
    "Logging state of start and finish nodes at the beginning of algorithm, startNode: ",
    startNode,
    "finishNode: ",
    finishNode
  );
  const openSet = new Heap<NodeType>((a, b) => a.fScore - b.fScore);
  const closedSet = new Set<NodeType>();
  const visitedDuringJumpSet = new Set<NodeType>();
  const jumpPoints: NodeType[] = [];
  startNode.distance = 0;
  startNode.gScore = 0;
  startNode.hScore = heuristic(startNode, finishNode);
  startNode.fScore = startNode.hScore;
  openSet.push(startNode);

  while (!openSet.empty()) {
    const currentNode = openSet.pop();

    if (currentNode === undefined) continue;
    closedSet.add(currentNode);

    if (currentNode === finishNode) {
      return Array.from(closedSet);
    }

    const neighbors = getNeighborsForDiagonal(currentNode, grid);

    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor) || neighbor.isWall) continue;

      const jumpNode = jump(
        neighbor,
        currentNode,
        grid,
        finishNode,
        visitedDuringJumpSet
      );

      if (jumpNode) {
        jumpPoints.push(jumpNode);
        jumpNode.isVisited = true;
        closedSet.add(jumpNode);

        const tempGScore = currentNode.gScore + 1;

        if (!jumpNode.opened || tempGScore < jumpNode.gScore) {
          jumpNode.gScore = tempGScore;
          jumpNode.hScore = heuristic(jumpNode, finishNode);
          jumpNode.fScore = jumpNode.gScore + jumpNode.hScore;
          jumpNode.parent = currentNode;

          if (!jumpNode.opened) {
            openSet.push(jumpNode);
            jumpNode.opened = true;
          } else {
            openSet.updateItem(jumpNode);
          }
        }
      }
    }
  }

  return [];
};

// Heuristic function for calculating distance
const heuristic = (node: NodeType, endNode: NodeType): number => {
  // Using Manhattan distance for now
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
};

export const getNodesInJPSShortestPathOrder = (
  finishNode: NodeType
): NodeType[] => {
  const nodesInShortestPathOrder: NodeType[] = [];
  let currentNode: NodeType | null = finishNode;

  if (!currentNode.parent) return [currentNode]; // if the finishNode has no parent, return it alone

  while (currentNode !== null) {
    if (currentNode.parent) {
      const interpolatedNodes = interpolate(currentNode.parent, currentNode);
      nodesInShortestPathOrder.unshift(...interpolatedNodes);
    } else {
      nodesInShortestPathOrder.unshift(currentNode);
    }
    currentNode = currentNode.parent ? currentNode.parent : null;
  }

  nodesInShortestPathOrder.push(finishNode);

  return nodesInShortestPathOrder;
};

export const interpolate = (start: NodeType, end: NodeType): NodeType[] => {
  const dx = end.col - start.col;
  const dy = end.row - start.row;
  const nodes: NodeType[] = [];

  if (dx === 0) {
    for (let y = start.row; y !== end.row; dy > 0 ? y++ : y--) {
      nodes.push({ ...start, row: y, col: start.col });
    }
  } else if (dy === 0) {
    for (let x = start.col; x !== end.col; dx > 0 ? x++ : x--) {
      nodes.push({ ...start, row: start.row, col: x });
    }
  } else {
    // For diagonal movement, one step at a time.
    let x = start.col;
    let y = start.row;
    while (x !== end.col || y !== end.row) {
      if (x !== end.col) {
        dx > 0 ? x++ : x--;
      }
      if (y !== end.row) {
        dy > 0 ? y++ : y--;
      }
      nodes.push({ ...start, row: y, col: x });
    }
  }

  return nodes;
};

// Function to check if a node has a forced neighbor
const hasForcedNeighbor = (
  node: NodeType,
  direction: { dx: number; dy: number },
  grid: NodeType[][]
): boolean => {
  const dx = direction.dx;
  const dy = direction.dy;
  const row = node.row;
  const col = node.col;

  // If moving diagonally, check for forced neighbors along the diagonal
  if (dx !== 0 && dy !== 0) {
    if (
      (grid[row - dy]?.[col]?.isWall && !grid[row - dy]?.[col + dx]?.isWall) ||
      (grid[row]?.[col - dx]?.isWall && !grid[row + dy]?.[col - dx]?.isWall)
    ) {
      return true;
    }
  }
  // Horizontal movement
  else if (dx !== 0) {
    if (
      (grid[row - 1]?.[col]?.isWall && !grid[row - 1]?.[col + dx]?.isWall) ||
      (grid[row + 1]?.[col]?.isWall && !grid[row + 1]?.[col + dx]?.isWall)
    ) {
      return true;
    }
  }
  // Vertical movement
  else {
    if (
      (grid[row]?.[col - 1]?.isWall && !grid[row + dy]?.[col - 1]?.isWall) ||
      (grid[row]?.[col + 1]?.isWall && !grid[row + dy]?.[col + 1]?.isWall)
    ) {
      return true;
    }
  }

  return false;
};

// Revised jump function
const jump = (
  node: NodeType,
  parent: NodeType | null,
  grid: NodeType[][],
  finishNode: NodeType,
  visitedDuringJumpSet: Set<NodeType>
): NodeType | null => {
  if (!node || node.isWall) return null;

  visitedDuringJumpSet.add(node);

  if (node === finishNode) return node;

  const dx = node.col - (parent?.col ?? 0);
  const dy = node.row - (parent?.row ?? 0);

  if (hasForcedNeighbor(node, { dx, dy }, grid)) {
    return node;
  }

  // Recursive jump
  if (dx !== 0 && dy !== 0) {
    if (
      jump(
        grid[node.row]?.[node.col + dx],
        node,
        grid,
        finishNode,
        visitedDuringJumpSet
      ) ||
      jump(
        grid[node.row + dy]?.[node.col],
        node,
        grid,
        finishNode,
        visitedDuringJumpSet
      )
    ) {
      return node;
    }
  }

  return jump(
    grid[node.row + dy]?.[node.col + dx],
    node,
    grid,
    finishNode,
    visitedDuringJumpSet
  );
};

export default jumpPointSearch;
