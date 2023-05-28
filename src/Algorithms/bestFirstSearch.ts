import { NodeType } from "../types/types";

const bestFirstSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
): NodeType[] => {
  const openSet: NodeType[] = [startNode];
  const closedSet: NodeType[] = [];

  startNode.isVisited = true;
  startNode.distance = manhattanDistance(startNode, finishNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.distance - b.distance);
    const currentNode = openSet.shift();

    if (!currentNode || currentNode.isWall) continue;

    closedSet.push(currentNode);

    if (currentNode === finishNode) {
      return closedSet;
    }

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        neighbor.parent = currentNode;
        neighbor.isVisited = true;
        neighbor.distance = manhattanDistance(neighbor, finishNode);
        openSet.push(neighbor);
      }
    }
  }

  return closedSet;
};

function getUnvisitedNeighbors(
  currentNode: NodeType,
  grid: NodeType[][]
): NodeType[] {
  const neighbors: NodeType[] = [];
  const { col, row } = currentNode;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function manhattanDistance(node: NodeType, finishNode: NodeType): number {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
}

export default bestFirstSearch;
