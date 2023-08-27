// import { NodeType } from "../types/types";
// import { getNeighbors } from "../PathFindingUtils";

// const aStar = (
//   grid: NodeType[][],
//   startNode: NodeType,
//   finishNode: NodeType
// ) => {
//   const openSet: NodeType[] = [];
//   const closedSet: NodeType[] = [];
//   openSet.push(startNode);
//   startNode.fScore = heuristic(startNode, finishNode);

//   while (openSet.length > 0) {
//     let lowestIdx = 0;
//     for (let i = 1; i < openSet.length; i++) {
//       if (openSet[i].fScore < openSet[lowestIdx].fScore) {
//         lowestIdx = i;
//       }
//     }
//     let currentNode = openSet[lowestIdx];
//     if (currentNode.isWall) {
//       continue;
//     }
//     // if currentNode distance is infinity we must be trapped
//     if (currentNode.fScore === Infinity) {
//       return [];
//     }

//     currentNode.isVisited = true;

//     if (currentNode === finishNode) {
//       console.log("closedSet", closedSet);
//       return closedSet;
//     }

//     removeFromArray(openSet, currentNode);
//     closedSet.push(currentNode);
//     const neighbors = getNeighbors(currentNode, grid);
//     for (let i = 0; i < neighbors.length; i++) {
//       const neighbor = neighbors[i];

//       if (!closedSet.includes(neighbor) && !neighbor.isWall) {
//         let tempGScore = currentNode.gScore + neighbor.weight;
//         if (openSet.includes(neighbor)) {
//           if (tempGScore < neighbor.gScore) {
//             neighbor.gScore = tempGScore;
//           }
//         } else {
//           neighbor.gScore = tempGScore;
//           openSet.push(neighbor);
//         }
//         neighbor.hScore = heuristic(neighbor, finishNode);
//         neighbor.fScore = neighbor.gScore + neighbor.hScore;
//         neighbor.parent = currentNode; // keeping track of parent node.
//       }
//     }
//   }
// };

// // after exploring this node we remove it from the openSet so we do not visit it again
// const removeFromArray = (openSet: NodeType[], currentNode: NodeType) => {
//   for (let i = openSet.length - 1; i >= 0; i--) {
//     if (openSet[i] === currentNode) {
//       openSet.splice(i, 1);
//     }
//   }
// };

// const heuristic = (node: NodeType, finishNode: NodeType) => {
//   return (
//     Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
//   );
// };

// export default aStar;

// Implementation using min-heap datastructure
import { NodeType } from "../types/types";
// import { getNeighbors } from "../PathFindingUtils";
import Heap from "heap";
import { getNeighborsForDiagonal, getNeighbors } from "../PathFindingUtils";

const aStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal?: boolean
) => {
  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, finishNode);

  const openSet = new Heap<NodeType>((a, b) => a.fScore - b.fScore);
  openSet.push(startNode);

  const closedSet = new Set<NodeType>();

  while (!openSet.empty()) {
    const currentNode = openSet.pop();
    if (!currentNode) {
      return []; // The open set was empty; the goal was not reachable
    }

    if (currentNode === null) {
      return [];
    }

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;

    if (currentNode === finishNode) {
      return Array.from(closedSet);
    }

    closedSet.add(currentNode);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor) || neighbor.isWall) {
        continue;
      }

      let tempGScore = currentNode.gScore + neighbor.weight;

      if (!neighbor.isVisited || tempGScore < neighbor.gScore) {
        neighbor.gScore = tempGScore;
        neighbor.hScore = heuristic(neighbor, finishNode);
        neighbor.fScore = neighbor.gScore + neighbor.hScore;
        neighbor.parent = currentNode;

        if (!neighbor.isVisited) {
          openSet.push(neighbor);
        } else {
          openSet.updateItem(neighbor);
        }

        neighbor.isVisited = true;
      }
    }
  }
  return [];
};

// const getNeighbors = (node: NodeType, grid: NodeType[][]): NodeType[] => {
//   const neighbors: NodeType[] = [];
//   const { row, col } = node;

//   if (row > 0) neighbors.push(grid[row - 1][col]);
//   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//   if (col > 0) neighbors.push(grid[row][col - 1]);

//   return neighbors.filter((neighbor) => !neighbor.closed);
// };

const heuristic = (node: NodeType, finishNode: NodeType) => {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
};

export default aStar;
