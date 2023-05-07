// runAlgorithm() {
  //   const { selectedAlgorithms, comparisonMode } = this.state;
  
  //   if (comparisonMode) {
  //     // Run both algorithms
  //     this.visualizeAlgorithm(
  //       this.algoMapping[selectedAlgorithms[0]].algo,
  //       "node-visited",
  //       "node-shortest-path"
  //     );
  //     this.visualizeAlgorithm(
  //       this.algoMapping[selectedAlgorithms[1]].algo,
  //       "node-visited-second",
  //       "node-shortest-path-second"
  //     );
  //   } else {
  //     // Run the single selected algorithm
  //     this.visualizeAlgorithm(
  //       this.algoMapping[selectedAlgorithms[0]].algo,
  //       "node-visited",
  //       "node-shortest-path"
  //     );
  //   }
  // }

  // runAlgorithm() {
  //   const { selectedAlgorithms, comparisonMode } = this.state;

  //   if (comparisonMode) {
  //     // Run both algorithms
  //     this.visualizeAlgorithm(
  //       this.algoMapping[selectedAlgorithms[0]].algo,
  //       0,
  //       "node-visited",
  //       "node-shortest-path"
  //     );
  //     this.visualizeAlgorithm(
  //       this.algoMapping[selectedAlgorithms[1]].algo,
  //       1,
  //       "node-visited-second",
  //       "node-shortest-path-second"
  //     );
  //   } else {
  //     // Run the single selected algorithm
  //     this.visualizeAlgorithm(
  //       this.algoMapping[selectedAlgorithms[0]].algo,
  //       0,
  //       "node-visited",
  //       "node-shortest-path"
  //     );
  //   }
  // }

  // animateShortestPath(nodesInShortestPathOrder) {
  //   const timeouts = [];

  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     const timeout = setTimeout(() => {
  //       if (this.state.animationStopped) {
  //         timeouts.forEach(clearTimeout);
  //         return;
  //       }

  //       const node = nodesInShortestPathOrder[i];
  //       const element = document.getElementById(`node-${node.row}-${node.col}`);
  //       if (element.classList.contains("node-visited-weight")) {
  //         element.className = "node node-visited-weight node-shortest-path";
  //       } else {
  //         element.className = "node node-shortest-path";
  //       }
  //     }, this.speed * i);
  //     timeouts.push(timeout);
  //   }
  // }



  // visualizeAlgorithm(algo, algoIdx, visitedClass, shortestPathClass) {
  //   if (
  //     !this.state.algo ||
  //     this.state.visualizingAlgorithm ||
  //     this.state.generatingMaze
  //   ) {
  //     return;
  //   }
  //   const algoClass = algoIdx === 0 ? "node-visited" : "node-visited-second";
  //   const spClass = algoIdx === 0 ? "node-shortest-path" : "node-shortest-path-second";

  //   let startNode;
  //   let finishNode;
  //   // this.clearVisualization();
  //   this.setState({ visualizingAlgorithm: true });
  //   const { grid } = this.state;
  //   if (this.state.startingNode) {
  //     startNode = grid[this.state.startNode.row][this.state.startNode.col];
  //     finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
  //   } else {
  //     this.setState({ startingNode: false });
  //     startNode =
  //       grid[this.state.currentStartNode.row][this.state.currentStartNode.col];
  //     finishNode =
  //       grid[this.state.currentFinishNode.row][
  //         this.state.currentFinishNode.col
  //       ];
  //   }
  //   const visitedNodesInOrder = algo(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

  //   this.animate(
  //     visitedNodesInOrder,
  //     nodesInShortestPathOrder,
  //     algoClass,
  //     visitedClass,
  //     spClass,
  //     shortestPathClass
  //   );
  // }

  // visualizeAlgorithm(algo, visitedClass, shortestPathClass, algorithmIndex) {
  //   if (!this.state.algo || this.state.visualizingAlgorithm || this.state.generatingMaze) {
  //     return;
  //   }
  
  //   const algoClass = algorithmIndex === 0 ? "node-visited" : "node-visited-second";
  //   const spClass = algorithmIndex === 0 ? "node-shortest-path" : "node-shortest-path-second";
  
  //   let startNode;
  //   let finishNode;
  
  //   this.setState({ visualizingAlgorithm: true });
  //   const { grid } = this.state;
  
  //   if (this.state.startingNode) {
  //     startNode = grid[this.state.startNode.row][this.state.startNode.col];
  //     finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
  //   } else {
  //     this.setState({ startingNode: false });
  //     startNode = grid[this.state.currentStartNode.row][this.state.currentStartNode.col];
  //     finishNode = grid[this.state.currentFinishNode.row][this.state.currentFinishNode.col];
  //   }
  
  //   const visitedNodesInOrder = algo(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  
  //   if (algorithmIndex === 0) {
  //     this.animateAlgorithm1(
  //       visitedNodesInOrder,
  //       nodesInShortestPathOrder,
  //       algoClass,
  //       visitedClass,
  //       shortestPathClass,
  //       spClass
  //     );
  //   } else {
  //     this.animateAlgorithm2(
  //       visitedNodesInOrder,
  //       nodesInShortestPathOrder,
  //       algoClass,
  //       visitedClass,
  //       shortestPathClass,
  //       spClass
  //     );
  //   }
  // }

  // visualizeAlgorithm(algo, visitedClass, spClass) {
  //   if (!this.state.algo || this.state.visualizingAlgorithm || this.state.generatingMaze) {
  //     return;
  //   }
  
    
  
    
  
  //   let startNode;
  //   let finishNode;
  
  //   //this.setState({ visualizingAlgorithm: true });
  //   const { grid } = this.state;
  
  //   if (this.state.startingNode) {
  //     startNode = grid[this.state.startNode.row][this.state.startNode.col];
  //     finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
  //   } else {
  //     this.setState({ startingNode: false });
  //     startNode = grid[this.state.currentStartNode.row][this.state.currentStartNode.col];
  //     finishNode = grid[this.state.currentFinishNode.row][this.state.currentFinishNode.col];
  //   }
  
  //   const visitedNodesInOrder = algo(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    
  
  //   this.animate(visitedNodesInOrder, nodesInShortestPathOrder, visitedClass, spClass);
  // }


  // compareAlgorithms() {
  //   const { algo, visualizingAlgorithm, generatingMaze, selectedAlgorithms } =
  //     this.state;

  //   if (!algo || visualizingAlgorithm || generatingMaze) {
  //     return;
  //   }

  //   if (selectedAlgorithms.length !== 2) {
  //     return (
  //       <div className="comparingAlgos">
  //         <h1>No algorithms to compare</h1>
  //       </div>
  //     );
  //   }

  //   const algo1 = this.algoMapping[selectedAlgorithms[0]].algo;
  //   const algo2 = this.algoMapping[selectedAlgorithms[1]].algo;

  //   // Start the comparison of algo1 and algo2 here
  // }

  // animateShortestPath(
  //   nodesInShortestPathOrder,
  //   algoClass,
  //   algorithmIndex = "",
  //   shortestPathClass
  // ) {
  //   const timeouts = [];
  //   console.log("In animateShortestPath, this is shortestPathClass" + shortestPathClass);

  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     const timeout = setTimeout(() => {
  //       if (this.state.animationStopped) {
  //         timeouts.forEach(clearTimeout);
  //         return;
  //       }

  //       const node = nodesInShortestPathOrder[i];
  //       const element = document.getElementById(
  //         `node-${node.row}-${node.col}${
  //           algorithmIndex ? "-" + algorithmIndex : ""
  //         }`
  //       );
  //       if (element && element.classList.contains("node-visited-weight")) {
  //         element.className = `node node-visited-weight ${shortestPathClass} ${algoClass}`;
  //       } else if (element) {
  //         element.className = `node ${shortestPathClass} ${algoClass}`;
  //       }
  //     }, this.speed * i);
  //     timeouts.push(timeout);
  //   }
  // }

  // animateShortestPath(nodesInShortestPathOrder, visitedClass, shortestPathClass) {
  //   const timeouts = [];
  
  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     const timeout = setTimeout(() => {
  //       if (this.state.animationStopped) {
  //         timeouts.forEach(clearTimeout);
  //         return;
  //       }
  
  //       const node = nodesInShortestPathOrder[i];
  //       const element = document.getElementById(`node-${node.row}-${node.col}`);
  //       if (element.classList.contains(visitedClass + "-weight")) {
  //         element.className = `node node-visited-weight ${shortestPathClass} ${visitedClass}`;
  //       } else {
  //         element.className = `node ${shortestPathClass} ${visitedClass}`;
  //       }
  //     }, this.speed * i);
  //     timeouts.push(timeout);
  //   }
  // }

  // animate(visitedNodesInOrder, nodesInShortestPathOrder, visitedClass, shortestPathClass) {
  //   if (this.state.clearingPath === true) {
  //     this.setState({ visualizingAlgorithm: false });
  //     return;
  //   }
  //   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
  //     console.error("Visited nodes array is undefined or empty");
  //     return;
  //   }
  
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      
  //     if (i === visitedNodesInOrder.length) {
  //       setTimeout(() => {
  //         this.animateShortestPath(nodesInShortestPathOrder, visitedClass, shortestPathClass);
  //       }, this.speed * i);
  //       return;
  //     }
  //     setTimeout(() => {
  //       const node = visitedNodesInOrder[i];
  //       console.log('Animating visited node:', node);
  //       if (node) {
  //         // Add this check to avoid TypeError
  //         const element = document.getElementById(
  //           `node-${node.row}-${node.col}`
  //         );
  //         if (element.classList.contains("node-weight")) {
  //           element.className = `node node-weight ${visitedClass}`;
  //         } else {
  //           element.className = `node ${visitedClass}`;
  //         }
  //       }
  //     }, this.speed * i);
  //   }
  // }

  // animate(visitedNodesInOrder, nodesInShortestPathOrder, algoClass, visitedClass, spClass, shortestPathClass) {
  //   if (this.state.clearingPath === true) {
  //     this.setState({ visualizingAlgorithm: false });
  //     return;
  //   }
  //   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
  //     console.error("Visited nodes array is undefined or empty");
  //     return;
  //   }
  
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
  //     if (i === visitedNodesInOrder.length) {
  //       setTimeout(() => {
  //         this.animateShortestPath(nodesInShortestPathOrder, algoClass, visitedClass, spClass, shortestPathClass);
  //       }, this.speed * i);
  //       return;
  //     }
  //     setTimeout(() => {
  //       const node = visitedNodesInOrder[i];
  //       if (node) {
  //         // Add this check to avoid TypeError
  //         const element = document.getElementById(
  //           `node-${node.row}-${node.col}`
  //         );
  //         if (element.classList.contains("node-weight")) {
  //           element.className = `node node-weight ${visitedClass} ${algoClass}`;
  //         } else {
  //           element.className = `node ${visitedClass} ${algoClass}`;
  //         }
  //       }
  //     }, this.speed * i);
  //   }
  // }

  // animate(
  //   visitedNodesInOrder,
  //     nodesInShortestPathOrder,
  //     algoClass,
  //     algorithmIndex,
  //     visitedClass,
  //     shortestPathClass
  // ) {
  //   console.log("in animate function", "this is visited class: " + visitedClass);
  //   if (this.state.clearingPath === true) {
  //     this.setState({ visualizingAlgorithm: false });
  //     return;
  //   }
  //   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
  //     console.error("Visited nodes array is undefined or empty");
  //     return;
  //   }

  //   const timeouts = [];
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
  //     if (this.animationStopped) {
  //       timeouts.forEach(clearTimeout);
  //       return;
  //     }

  //     const timeout = setTimeout(() => {
  //       if (this.animationStopped) {
  //         timeouts.forEach(clearTimeout);
  //         return;
  //       }

  //       if (i === visitedNodesInOrder.length) {
  //         this.animateShortestPath(
  //           nodesInShortestPathOrder,
  //           algoClass,
  //           algorithmIndex,
  //           shortestPathClass
  //         );
  //       } else {
  //         const node = visitedNodesInOrder[i];
  //         const element = document.getElementById(
  //           `node-${node.row}-${node.col}${
  //             algorithmIndex ? "-" + algorithmIndex : ""
  //           }`
  //         );
  //         if (element) {
  //           if (element.classList.contains("node-weight")) {
  //             element.className = `node node-weight ${visitedClass} ${algoClass}`;
  //           } else {
  //             element.className = `node ${visitedClass} ${algoClass}`;
  //           }
  //         }
  //       }
  //     }, this.speed * i);
  //     timeouts.push(timeout);
  //   }
  // }

  //function getIdxFromRowCol(row, col, th)

// animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     console.error("Visited nodes array is undefined or empty");
//     return;
//   }

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {
//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }
//     setTimeout(() => {
//       const node = visitedNodesInOrder[i];
//       if (node) {
//         const nodeElement = document.getElementById(
//           "node-${node.row}-${node.col}"
//         );
//         nodeElement.className = "node node-visited";
//         if (nodeElement.classList.contains("node-start")) {
//           nodeElement.classList.add("node-current");
//         } else if (nodeElement.classList.contains("node-current")) {
//           nodeElement.classList.remove("node-current");
//         }
//       }
//     }, this.speed * i);
//   }

//  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//     if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//     }
//     if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     return;
//     }

//     for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//     setTimeout(() => {
//     this.animateShortestPath(nodesInShortestPathOrder);
//     }, this.speed * i);
//     return;
//     }
//     setTimeout(() => {
//     const node = visitedNodesInOrder[i];
//     if (node) {
//     const nodeElement = document.getElementById('node-${node.row}-${node.col}');
//     nodeElement.className = "node node-visited";
//     if (nodeElement.classList.contains("node-start")) {
//     nodeElement.classList.add("node-current");
//     nodeElement.classList.add("node-current-visited");
//     } else if (nodeElement.classList.contains("node-current")) {
//     nodeElement.classList.remove("node-current-visited");
//     }
//     }
//     }, this.speed * i);
//     }
//     }

// animateBidirectionalAlgorithm(
//   visitedNodesInOrderStart,
//   visitedNodesInOrderFinish,
//   nodesInShortestPathOrder,
//   isShortedPath
// ) {
//   let len = Math.max(
//     visitedNodesInOrderStart.length,
//     visitedNodesInOrderFinish.length
//   );
//   for (let i = 1; i <= len; i++) {
//     let nodeA = visitedNodesInOrderStart[i];
//     let nodeB = visitedNodesInOrderFinish[i];
//     if (i === visitedNodesInOrderStart.length) {
//       setTimeout(() => {
//         let visitedNodesInOrder = getVisitedNodesInOrder(
//           visitedNodesInOrderStart,
//           visitedNodesInOrderFinish
//         );
//         if (isShortedPath) {
//           this.animateShortestPath(
//             nodesInShortestPathOrder,
//             visitedNodesInOrder
//           );
//           setTimeout(() => {
//             this.setState({ visualizingAlgorithm: false });
//           }, nodesInShortestPathOrder.length * this.speed);
//         } else {
//           this.setState({ visualizingAlgorithm: false });
//         }
//       }, i * this.speed);
//       return;
//     }
//     setTimeout(() => {
//       if (nodeA !== undefined)
//         document.getElementById(`node-${nodeA.row}-${nodeA.col}`).className =
//           "node node-visited";
//       if (nodeB !== undefined)
//         document.getElementById(`node-${nodeB.row}-${nodeB.col}`).className =
//           "node node-visited";
//     }, i * this.speed);
//   }
// }

// visualizeBidirectionalGreedySearch() {
//   if (this.state.visualizingAlgorithm || this.state.generatingMaze) {
//     return;
//   }
//   this.setState({ visualizingAlgorithm: true });

//   setTimeout(() => {
//     const { grid } = this.state;
//     const startNode = grid[START_NODE_ROW][START_NODE_COL];
//     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
//     const visitedNodesInOrder = bidirectionalGreedySearch(
//       grid,
//       startNode,
//       finishNode
//     );
//     const visitedNodesInOrderStart = visitedNodesInOrder[0];
//     const visitedNodesInOrderFinish = visitedNodesInOrder[1];
//     const isShortedPath = visitedNodesInOrder[2];
//     const nodesInShortestPathOrder =
//       getNodesInShortestPathOrderBidirectionalGreedySearch(
//         visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
//         visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
//       );
//     this.animateBidirectionalAlgorithm(
//       visitedNodesInOrderStart,
//       visitedNodesInOrderFinish,
//       nodesInShortestPathOrder,
//       isShortedPath
//     );
//   }, this.speed);
// }

// animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false});
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     return;
//   }

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {
//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }
//     setTimeout(() => {
//       const node = visitedNodesInOrder[i];
//       if (node) {
//         const element = document.getElementById(
//           `node-${node.row}-${node.col}`
//         );
//         if (element.classList.contains("node-visited-weight")) {
//           console.log("Setting class to node-visited-weight for node:", node);
//           element.className = "node node-visited-weight";
//         } else if (element.classList.contains("node-weight")) {
//           console.log("Setting class to node-weight for node:", node);
//           element.className = "node node-weight";
//         } else {
//           console.log("Setting class to node-visited for node:", node);
//           element.className = "node node-visited";
//         }
//       }
//     }, this.speed * i);
//   }
// }

// animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     console.error("Visited nodes array is undefined or empty");
//     return;
//   }

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {
//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }
//     setTimeout(() => {
//       const node = visitedNodesInOrder[i];
//       if (node) {
//         // Add this check to avoid TypeError
//         const element = document.getElementById(
//           `node-${node.row}-${node.col}`
//         );
//         if (element.classList.contains("node-weight")) {
//           element.className = "node node-weight node-visited";
//         } else {
//           element.className = "node node-visited";
//         }
//       }
//     }, this.speed * i);
//   }
// }

//  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     return;
//   }

//   const { startNode } = this.state;
//   const visitedNodes = []; // initialize the visitedNodes array
//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {
//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }
//     setTimeout(() => {
//       const node = visitedNodesInOrder[i];
//       if (i !== 0) {
//         this.setState({ travelingStartNode: node });
//       }

//       if (node) {
//         const element = document.getElementById(`node-${node.row}-${node.col}`);
//         if (!visitedNodes.includes(node)) { // add the node to visitedNodes if it's not already there
//           visitedNodes.push(node);
//         }
//         this.setState({ visitedNodes }); // update the visitedNodes state
//       }
//     }, this.speed * i);
//   }
// }

// async animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     return;
//   }

//   const { startNode } = this.state;

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {
//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }

//     setTimeout(async () => {
//       await this.sleep(this.speed);
//       const node = visitedNodesInOrder[i];

//       if (node) {
//         const element = document.getElementById(`node-${node.row}-${node.col}`);

//         element.classList.add("node-visited");

//         // Add "node-visited-weight" class if the node has weight
//         if (element.classList.contains("weight-node") && !element.classList.contains("node-visited-weight")) {
//           element.classList.add("node-visited-weight");
//         }

//         // Update the travelingStartNode state to move the appearance of the start node
//         if (i !== 0) {
//           const previousNode = visitedNodesInOrder[i - 1];
//           const previousElement = document.getElementById(`node-${previousNode.row}-${previousNode.col}`);
//           previousElement.classList.remove("node-traveling-start");

//           // Set the transform property for the traveling start node
//           const startNodeElement = document.getElementById(`node-${startNode.row}-${startNode.col}`);
//           startNodeElement.style.transform = `translate(${node.col * 20}px, ${node.row * 20}px)`;
//           startNodeElement.classList.add("node-traveling");
//         }
//       }
//     }, this.speed * i);
//   }
// }

// sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     console.error("Visited nodes array is undefined or empty");
//     return;
//   }

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {

//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }

//     const node = visitedNodesInOrder[i];
//     setTimeout(() => {
//       if (node) {
//         const element = document.getElementById(
//           `node-${node.row}-${node.col}`
//         );

//         if (element) {
//           if (element.classList.contains("node-weight")) {
//             element.className = "node node-weight node-visited";
//           } else {
//             element.className = "node node-visited";
//           }
//         }
//       }
//     }, this.speed * i);
//   }
// }

// animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     console.error("Visited nodes array is undefined or empty");
//     return;
//   }

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {
//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }
//     setTimeout(() => {
//       const node = visitedNodesInOrder[i];
//       if (node) {
//         // Add this check to avoid TypeError
//         const element = document.getElementById(
//           `node-${node.row}-${node.col}`
//         );
//         if (element.classList.contains("node-weight")) {
//           element.className = "node node-weight node-visited";
//         } else {
//           element.className = "node node-visited";
//         }
//       }
//     }, this.speed * i);
//   }
// }

// animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     console.error("Visited nodes array is undefined or empty");
//     return;
//   }

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {

//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }

//     const node = visitedNodesInOrder[i];
//     setTimeout(() => {
//       if (node) {
//         const element = document.getElementById(
//           `node-${node.row}-${node.col}`
//         );

//         if (element) {
//           if (element.classList.contains("node-weight")) {
//             element.className = "node node-weight node-visited";
//           } else {
//             element.className = "node node-visited";
//           }
//         }
//       }
//     }, this.speed * i);
//   }
// }

// animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//   if (this.state.clearingPath === true) {
//     this.setState({ visualizingAlgorithm: false });
//     return;
//   }
//   if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
//     console.error("Visited nodes array is undefined or empty");
//     return;
//   }

//   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     if (i === visitedNodesInOrder.length) {
//       setTimeout(() => {
//         this.animateShortestPath(nodesInShortestPathOrder);
//       }, this.speed * i);
//       return;
//     }
//     setTimeout(() => {
//       const node = visitedNodesInOrder[i];
//       if (node) {
//         // Add this check to avoid TypeError
//         const element = document.getElementById(
//           `node-${node.row}-${node.col}`
//         );
//         if (element.classList.contains("node-weight")) {
//           element.className = "node node-weight node-visited";
//         } else {
//           element.className = "node node-visited";
//         }
//       }
//     }, this.speed * i);
//   }
// }

// animateShortestPath(nodesInShortestPathOrder) {
//   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
//     if (this.state.clearingPath === true) {
//       return true;
//     }

//     setTimeout(() => {
//       const node = nodesInShortestPathOrder[i];
//       const element = document.getElementById(`node-${node.row}-${node.col}`);
//       if (element.classList.contains("node-visited-weight")) {
//         // console.log("Setting class to node-shortest-path and node-visited-weight for node:", node);
//         element.className = "node node-visited-weight node-shortest-path";
//       } else {
//         // console.log("Setting class to node-shortest-path for node:", node);
//         element.className = "node node-shortest-path";
//       }
//       // set a breakpoint here
//     }, this.speed * i);
//   }
//   return false;
// }
