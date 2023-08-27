// import { NodeType } from "../types/types";
// import { getNeighborsForDiagonal, getNeighbors } from "../PathFindingUtils";
// import Heap from "heap"

// const dijkstra = (
//   grid: NodeType[][],
//   startNode: NodeType,
//   finishNode: NodeType,
//   allowDiagonal: boolean
// ) => {
//   const openSet: NodeType[] = [];
//   const closedSet: NodeType[] = [];

//   // initialize distances to Infinity, and 0 for the start node
//   for (let row of grid) {
//     for (let node of row) {
//       node.distance = Infinity;
//     }
//   }
//   startNode.distance = 0;

//   openSet.push(startNode);

//   while (openSet.length > 0) {
//     openSet.sort((a, b) => a.distance - b.distance);
//     let currentNode = openSet.shift();

//     if (!currentNode) {
//       continue;
//     }

//     if (currentNode.isWall) {
//       continue;
//     }

//     if (currentNode.distance === Infinity) {
//       return closedSet;
//     }

//     currentNode.isVisited = true;
//     closedSet.push(currentNode);

//     if (currentNode === finishNode) {
//       return closedSet;
//     }

//     const neighbors = allowDiagonal
//       ? getNeighborsForDiagonal(currentNode, grid)
//       : getNeighbors(currentNode, grid);

//     for (let neighbor of neighbors) {
//       if (!neighbor.isVisited && !neighbor.isWall) {
//         let tentativeDistance = currentNode.distance + 1;
//         if (tentativeDistance < neighbor.distance) {
//           neighbor.distance = tentativeDistance;
//           neighbor.parent = currentNode;
//           if (!openSet.includes(neighbor)) openSet.push(neighbor);
//         }
//       }
//     }
//   }
// };

// export default dijkstra;

import Heap from "heap";
import { NodeType } from "../types/types";
import { getNeighborsForDiagonal, getNeighbors } from "../PathFindingUtils";

const dijkstra = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
) => {
  const openSet = new Heap<NodeType>((a, b) => a.distance - b.distance);
  const closedSet = new Set<NodeType>();

  for (let row of grid) {
    for (let node of row) {
      node.distance = Infinity;
    }
  }

  startNode.distance = 0;
  openSet.push(startNode);

  while (!openSet.empty()) {
    const currentNode = openSet.pop() as NodeType;

    if (currentNode.isWall) continue;

    if (currentNode.distance === Infinity) return Array.from(closedSet);

    currentNode.isVisited = true;
    closedSet.add(currentNode);

    if (currentNode === finishNode) return Array.from(closedSet);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (let neighbor of neighbors) {
      if (closedSet.has(neighbor)) continue;

      let tentativeDistance = currentNode.distance + 1;
      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.parent = currentNode;

        openSet.push(neighbor);
      }
    }
  }

  return Array.from(closedSet);
};

export default dijkstra;
