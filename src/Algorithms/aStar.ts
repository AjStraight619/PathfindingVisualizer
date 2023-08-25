import { NodeType } from "../types/types";
import { getNeighbors } from "../PathFindingUtils";

const aStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
) => {
  const openSet: NodeType[] = [];
  const closedSet: NodeType[] = [];
  openSet.push(startNode);
  startNode.fScore = heuristic(startNode, finishNode);

  while (openSet.length > 0) {
    let lowestIdx = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].fScore < openSet[lowestIdx].fScore) {
        lowestIdx = i;
      }
    }
    let currentNode = openSet[lowestIdx];
    if (currentNode.isWall) {
      continue;
    }
    // if currentNode distance is infinity we must be trapped
    if (currentNode.fScore === Infinity) {
      return [];
    }

    currentNode.isVisited = true;

    if (currentNode === finishNode) {
      console.log("closedSet", closedSet);
      return closedSet;
    }

    removeFromArray(openSet, currentNode);
    closedSet.push(currentNode);
    const neighbors = getNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        let tempGScore = currentNode.gScore + neighbor.weight;
        if (openSet.includes(neighbor)) {
          if (tempGScore < neighbor.gScore) {
            neighbor.gScore = tempGScore;
          }
        } else {
          neighbor.gScore = tempGScore;
          openSet.push(neighbor);
        }
        neighbor.hScore = heuristic(neighbor, finishNode);
        neighbor.fScore = neighbor.gScore + neighbor.hScore;
        neighbor.parent = currentNode; // keeping track of parent node.
      }
    }
  }
};

// after exploring this node we remove it from the openSet so we do not visit it again
const removeFromArray = (openSet: NodeType[], currentNode: NodeType) => {
  for (let i = openSet.length - 1; i >= 0; i--) {
    if (openSet[i] === currentNode) {
      openSet.splice(i, 1);
    }
  }
};

const heuristic = (currentNode: NodeType, finishNode: NodeType) => {
  const dx = Math.abs(currentNode.row - finishNode.row);
  const dy = Math.abs(currentNode.col - finishNode.col);
  return dx + dy;
};

export default aStar;