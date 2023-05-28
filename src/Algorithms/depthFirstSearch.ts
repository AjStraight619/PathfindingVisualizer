import { NodeType } from "../types/types";

const depthFirstSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
): NodeType[] => {
  if (!startNode || !finishNode || startNode === finishNode) {
    return [];
  }
  const visitedNodesInOrder: NodeType[] = [];
  depthFirstSearchHelper(startNode, finishNode, visitedNodesInOrder, grid);
  visitedNodesInOrder.reverse();
  return visitedNodesInOrder;
};

function depthFirstSearchHelper(
  currentNode: NodeType,
  finishNode: NodeType,
  visitedNodesInOrder: NodeType[],
  grid: NodeType[][]
): boolean {
  currentNode.isVisited = true;
  visitedNodesInOrder.unshift(currentNode);

  if (currentNode === finishNode) {
    return true;
  }

  const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbor.parent = currentNode;
      if (
        depthFirstSearchHelper(neighbor, finishNode, visitedNodesInOrder, grid)
      ) {
        return true;
      }
    }
  }
  return false;
}

function getUnvisitedNeighbors(node: NodeType, grid: NodeType[][]): NodeType[] {
  const neighbors: NodeType[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export default depthFirstSearch;
