// import { NodeType } from "../types/types";
// import { getNeighborsForDiagonal, getNeighbors } from "../PathFindingUtils";

// const greedyBFS = (
//   grid: NodeType[][],
//   startNode: NodeType,
//   finishNode: NodeType,
//   allowDiagonal: boolean
// ): NodeType[] => {
//   startNode.distance = 0;
//   const openSet: NodeType[] = [];
//   const closedSet: NodeType[] = [];
//   openSet.push(startNode);

//   while (openSet.length > 0) {
//     openSet.sort((node1, node2) => node1.distance - node2.distance);
//     const currentNode = openSet.shift();

//     if (!currentNode) {
//       console.log("Broke out of loop");
//       break; // Stop the loop if there's no current node
//     }

//     if (currentNode === finishNode) {
//       return closedSet;
//     }

//     if (currentNode.isWall) continue;
//     if (currentNode.distance === Infinity) return closedSet;

//     closedSet.push(currentNode);
//     removeFromArray(openSet, currentNode);

//     const neighbors = allowDiagonal
//       ? getNeighborsForDiagonal(currentNode, grid)
//       : getNeighbors(currentNode, grid);

//     // const neighbors = getNeighbors(currentNode, grid);
//     for (let i = 0; i < neighbors.length; i++) {
//       const neighbor = neighbors[i];
//       if (!closedSet.includes(neighbor) && !neighbor.isWall) {
//         openSet.unshift(neighbor);
//         neighbor.distance = manhattanDistance(neighbor, finishNode);
//         neighbor.parent = currentNode;
//       }
//     }
//   }
//   return closedSet;
// };

// function removeFromArray(
//   openSet: NodeType[],
//   currentNode: NodeType | undefined
// ): void {
//   for (let i = openSet.length - 1; i >= 0; i--) {
//     if (openSet[i] === currentNode) {
//       openSet.splice(i, 1);
//     }
//   }
// }

// function manhattanDistance(node: NodeType, finishNode: NodeType): number {
//   return (
//     Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
//   );
// }

// export default greedyBFS;

import { NodeType } from "../types/types";
import { getNeighborsForDiagonal, getNeighbors } from "../PathFindingUtils";
import Heap from "heap";

const greedyBFS = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
) => {
  startNode.distance = 0;

  const openSet = new Heap<NodeType>((a, b) => a.distance - b.distance);
  const closedSet = new Set<NodeType>();

  openSet.push(startNode);

  while (!openSet.empty()) {
    const currentNode = openSet.pop();

    if (!currentNode) {
      break; // Stop the loop if there's no current node
    }

    if (currentNode === finishNode) {
      return Array.from(closedSet);
    }

    if (currentNode.isWall) {
      continue; // Skip wall nodes
    }

    closedSet.add(currentNode);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (closedSet.has(neighbor) || neighbor.isWall) {
        continue; // Skip nodes that are already closed or are walls
      }

      neighbor.distance = manhattanDistance(neighbor, finishNode);
      neighbor.parent = currentNode;

      openSet.push(neighbor);
    }
  }

  return [];
};

// Helper functions
function manhattanDistance(node: NodeType, finishNode: NodeType): number {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
}

export default greedyBFS;
