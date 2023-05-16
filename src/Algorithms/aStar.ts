import { Node } from "../types/types";
const aStar = (grid: Node[][], startNode: Node, finishNode: Node) => {
  const openSet: Node[] = [];
  const closedSet: Node[] = [];
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

// after exploring this node we remove it from the open set so we do not visit it again
const removeFromArray = (openSet: Node[], currentNode: Node) => {
  for (let i = openSet.length - 1; i >= 0; i--) {
    if (openSet[i] === currentNode) {
      openSet.splice(i, 1);
    }
  }
};

const heuristic = (currentNode: Node, finishNode: Node) => {
  const dx = Math.abs(currentNode.row - finishNode.row);
  const dy = Math.abs(currentNode.col - finishNode.col);
  return dx + dy;
};

// get the adjacent neighbors of the current node
const getNeighbors = (currentNode: Node, grid: Node[][]) => {
  const { row, col } = currentNode;
  const neighbors: Node[] = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export default aStar;