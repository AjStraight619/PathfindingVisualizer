// import Heap from "heap";
// import { NodeType } from "../types/types";

// const jumpPointSearch = (
//   grid: NodeType[][],
//   startNode: NodeType,
//   finishNode: NodeType
// ) => {
//   startNode.gScore = 0;
//   const openSet = new Heap<NodeType>((a, b) => a.fScore - b.fScore);
//   const closedSet = new Set<NodeType>();

//   openSet.push(startNode);
//   startNode.fScore = heuristic(startNode, finishNode);

//   while (!openSet.empty()) {
//     const currentNode = openSet.pop();
//     if (currentNode === undefined) continue;

//     if (currentNode.isWall) continue;

//     if (currentNode.fScore === Infinity) return [];

//     currentNode.isVisited = true;

//     if (currentNode === finishNode) {
//       return Array.from(closedSet);
//     }

//     closedSet.add(currentNode);
//     const jumpPoints = findJumpPoints(currentNode, grid, finishNode);

//     for (const neighbor of jumpPoints) {
//       if (closedSet.has(neighbor) || neighbor.isWall) continue;

//       let tempGScore = currentNode.gScore + neighbor.weight;

//       if (!neighbor.opened || tempGScore < neighbor.gScore) {
//         neighbor.gScore = tempGScore;
//         neighbor.hScore = heuristic(neighbor, finishNode);
//         neighbor.fScore = neighbor.gScore + neighbor.hScore;
//         neighbor.parent = currentNode;

//         if (!neighbor.opened) {
//           openSet.push(neighbor);
//           neighbor.opened = true;
//         } else {
//           // Re-insert the node into the heap to update its position
//           openSet.updateItem(neighbor);
//           openSet.push(neighbor);
//         }
//       }
//     }
//   }
//   return [];
// };

// const heuristic = (node: NodeType, finishNode: NodeType) => {
//   return (
//     Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
//   );
// };

// const findJumpPoints = (
//   node: NodeType,
//   grid: NodeType[][],
//   finishNode: NodeType
// ): NodeType[] => {
//   const jumpPoints: NodeType[] = [];

//   // Implement your logic to find the jump points from the current node
//   // For each direction (Up, Down, Left, Right), try to find a jump point
//   // Add the jump point to the `jumpPoints` array

//   // Here you'll need to implement your logic for identifying valid jump points.
//   // This is typically where the majority of the JPS-specific optimizations occur.

//   return jumpPoints;
// };
