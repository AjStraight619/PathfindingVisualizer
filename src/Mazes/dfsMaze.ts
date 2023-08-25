// import { NodeType } from "../types/types"
// const dfsMaze = (grid: NodeType[][], startNode: NodeType, finishNode: NodeType) => {

//     const stack: NodeType[] = []
//     // Initialize all nodes as unvisited
//   for (let row of grid) {
//     for (let node of row) {
//       node.isVisited = false;
//     }
//   }

//   // Start with a random node that's not the start or finish node
//   let randomRow, randomCol;
//   do {
//     randomRow = Math.floor(Math.random() * grid.length);
//     randomCol = Math.floor(Math.random() * grid[0].length);
//   } while (
//     (randomRow === startNode.row && randomCol === startNode.col) ||
//     (randomRow === finishNode.row && randomCol === finishNode.col)
//   );

//   const initialNode = grid[randomRow][randomCol];
//   initialNode.isVisited = true;
//   stack.push(initialNode);

//   while (stack.length !== 0) {
//     // TODO: Your DFS maze logic here
//   }

//   return maze; // This will be your final array of nodes that make up the maze

// }
