import { NodeType } from "../types/types";
import { getNeighbors } from "../PathFindingUtils";

const greedyBFS = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
): NodeType[] => {
  startNode.distance = 0;
  const openSet: NodeType[] = [];
  const closedSet: NodeType[] = [];
  openSet.push(startNode);

  while (openSet.length > 0) {
    openSet.sort((node1, node2) => node1.totalDistance - node2.totalDistance);
    const currentNode = openSet.shift();

    if (!currentNode) {
      break; // Stop the loop if there's no current node
    }

    if (currentNode === finishNode) {
      return closedSet;
    }

    if (currentNode.isWall) continue;
    if (currentNode.distance === Infinity) return closedSet;
    closedSet.push(currentNode);
    removeFromArray(openSet, currentNode);

    const neighbors = getNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      let distance = currentNode.distance + 1;

      const neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        openSet.unshift(neighbor);
        neighbor.totalDistance = getDistance(neighbor, finishNode);
        neighbor.parent = currentNode;
      } else if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.totalDistance = getDistance(neighbor, finishNode);
        neighbor.parent = currentNode;
      }
    }
  }
  return closedSet;
};

function removeFromArray(
  openSet: NodeType[],
  currentNode: NodeType | undefined
): void {
  for (let i = openSet.length - 1; i >= 0; i--) {
    if (openSet[i] === currentNode) {
      openSet.splice(i, 1);
    }
  }
}

function getDistance(currentNode: NodeType, finishNode: NodeType): number {
  let d1 = Math.abs(finishNode.row - currentNode.row);
  let d2 = Math.abs(finishNode.col - currentNode.col);
  return d1 + d2;
}

export default greedyBFS;
