import { NodeType } from "../types/types";
import { getNeighbors, getNeighborsForDiagonal } from "../PathFindingUtils";

const bestFirstSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
): NodeType[] => {
  const openSet: NodeType[] = [startNode];
  const closedSet: NodeType[] = [];

  startNode.isVisited = true;
  startNode.distance = manhattanDistance(startNode, finishNode);

  while (openSet.length > 0) {
    openSet.sort((node1, node2) => node1.distance - node2.distance);
    const currentNode = openSet.shift();

    if (!currentNode || currentNode.isWall) continue;

    closedSet.push(currentNode);

    if (currentNode === finishNode) {
      console.log("closedSet: ", closedSet);
      return closedSet;
    }

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

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

function manhattanDistance(node: NodeType, finishNode: NodeType): number {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
}

export default bestFirstSearch;
