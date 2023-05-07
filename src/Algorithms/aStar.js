export function aStar(grid, startNode, finishNode) {
  const openSet = [];
  const closedSet = [];
  openSet.push(startNode);
  startNode.f = heuristic(startNode, finishNode);
  // infinite loop until we find finishNode or trapped or all nodes have been explored.
  while (openSet.length > 0) {
    let lowestIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
    }
    let currentNode = openSet[lowestIndex];
    // if the current node is a wall, skip it
    if (currentNode.isWall) continue;
    // if the current node's .f is infinity we must be trapped.
    if (currentNode.f === Infinity) {
      return [];
    }
    // else currentNode.isVisited = true;
    currentNode.isVisited = true;

    // if we have reached the finish node, break and return visited nodes in order.
    if (currentNode === finishNode) {
      break;
    }

    removeFromArray(openSet, currentNode);
    closedSet.push(currentNode);

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    // if neighbor is not in the closedSet, and it is not a wall, we have not explored it yet and need to calculate the f value of the node.
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        let tempG = currentNode.g + neighbor.weight;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, finishNode);
        neighbor.f = neighbor.h + neighbor.g;
        neighbor.previousNode = currentNode; // keeping track of its parent node
      }
    }
  }
  return closedSet;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode ? currentNode.previousNode : null;
  }

  return nodesInShortestPathOrder;
}

function removeFromArray(openSet, currentNode) {
  for (let i = openSet.length - 1; i >= 0; i--) {
    if (openSet[i] === currentNode) {
      openSet.splice(i, 1);
    }
  }
}
// get all unvisited neighbors, exluding diagonal neighbors and return the neighbors that have no been visited.
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];

  const { col, row } = node;

  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// simple heuristic function to calculate the distance current node to the finish node.
function heuristic(neighborNode, finishNode) {
  const dx = Math.abs(finishNode.row - neighborNode.row);
  const dy = Math.abs(finishNode.col - neighborNode.col);

  return dx + dy + neighborNode.weight;
}
