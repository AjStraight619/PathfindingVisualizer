import React, { useState, useEffect } from "react";
import {
  getInitialGrid,
  getNodesInShortestPathOrder,
  getNewGridWithWeightToggled,
  getNewGridWithWallToggled,
} from "../PathFindingUtils";
import { NodeType, Algorithm, Maze } from "../types/types";
import Node from "./Node/Node";

import MyNavbar from "../components/MyNavbar";
import Legend from "../components/Legend";
import "./Pathfinding.css";
import "./Node/Node.css";

import { START_NODE_COL, START_NODE_ROW } from "../PathFindingUtils";
import aStar from "../Algorithms/aStar";
import dijkstra from "../Algorithms/dijkstra";
import depthFirstSearch from "../Algorithms/depthFirstSearch";
import BFS from "../Algorithms/bfs";
import beamSearch from "../Algorithms/beamSearch";
import bestFirstSearch from "../Algorithms/bestFirstSearch";
import greedyBFS from "../Algorithms/greedyBFS";
import { Tutorial } from "../components/Tutorial";

const PathFinding = () => {
  const algoMapping: { [key: string]: Algorithm } = {
    "A*": {
      name: "A*",
      id: "A*",
      isShortestPathAlgo: true,
      isWeighted: true,
      func: (grid, startNode, finishNode) =>
        aStar(grid, startNode, finishNode) || [],
    },

    "Beam Search": {
      name: "Beam Search",
      id: "beamSearch",
      isShortestPathAlgo: false,
      isWeighted: false,
      func: (grid, startNode, finishNode) =>
        beamSearch(grid, startNode, finishNode) || [],
    },

    "Best First Search": {
      name: "Best First Search",
      id: "bestFirstSearch",
      isShortestPathAlgo: false,
      isWeighted: false,
      func: (grid, startNode, finishNode) =>
        bestFirstSearch(grid, startNode, finishNode) || [],
    },

    "Breadth-first Search": {
      name: "Breadth-first Search",
      id: "bfs",
      isShortestPathAlgo: true,
      isWeighted: false,
      func: (grid, startNode, finishNode) =>
        BFS(grid, startNode, finishNode) || [],
    },

    "Depth First Search": {
      name: "depthFirstSearch",
      id: "depthFirstSearch",
      isShortestPathAlgo: false,
      isWeighted: false,
      func: (grid, startNode, finishNode) =>
        depthFirstSearch(grid, startNode, finishNode) || [],
    },

    Dijkstra: {
      name: "Dijkstra",
      id: "Dijkstra",
      isShortestPathAlgo: true,
      isWeighted: true,
      func: (grid, startNode, finishNode) =>
        dijkstra(grid, startNode, finishNode) || [],
    },

    "Greedy Best-First Search": {
      name: "Greedy Best-First Search",
      id: "greedyBFS",
      isShortestPathAlgo: false,
      isWeighted: true,
      func: (grid, startNode, finishNode) =>
        greedyBFS(grid, startNode, finishNode) || [],
    },
  };

  const mazeMapping: { [key: string]: Maze } = {
    "Depth-First Search": {
      name: "DFS Maze",
      id: "DFSMaze",
    },

    "Recursive Division": {
      name: "Recursive Division",
      id: "Recursive Division",
    },

    "Random Maze": {
      name: "Random Maze",
      id: "Random Maze",
    },
  };

  const speedMapping: { [key: string]: number } = {
    Fast: 5,
    Medium: 15,
    Slow: 60,
  };

  const defaultNode: NodeType = {
    row: 0,
    col: 0,
    isStart: false,
    isFinish: false,
    isWall: false,
    isWeight: false,
    isVisited: false,
    totalDistance: 0,
    hScore: 0,
    gScore: 0,
    fScore: 0,
    parent: null,
    weight: 0,
    isDraggable: false,
    closest: Infinity,
    distance: Infinity,
    className: "",
  };

  const [startNode, setStartNode] = useState<NodeType>({
    ...defaultNode,
    row: START_NODE_ROW,
    col: START_NODE_COL,
  });

  const [grid, setGrid] = useState<NodeType[][]>(getInitialGrid());
  const [visualizingAlgorithm, setVisualizingAlgorithm] = useState(false);
  // const [generatingMaze, setGeneratingMaze] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [isWeightToggled, setIsWeightToggled] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>([]);
  const [isAlgoSelected, setIsAlgoSelected] = useState(false);
  const [selectedMaze, setSelectedMaze] = useState<Maze[]>([]);
  const [selectedSpeed, setSelectedSpeed] = useState("Fast");

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggedNode, setDraggedNode] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [dragType, setDragType] = useState("");
  const [tutorialOpen, setTutorialOpen] = useState(true);

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    if (!visualizingAlgorithm) {
      let newGrid: NodeType[][];
      if (isWeightToggled) {
        newGrid = getNewGridWithWeightToggled(grid, row, col);
      } else {
        newGrid = getNewGridWithWallToggled(grid, row, col);
      }
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!visualizingAlgorithm) {
      setMouseIsPressed(false);
      setDraggedNode(null);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    if (!visualizingAlgorithm) {
      if (draggedNode) {
        const newGrid = grid.slice();

        newGrid[draggedNode.row][draggedNode.col] = {
          ...newGrid[draggedNode.row][draggedNode.col],
          isStart: false,
        };

        newGrid[row][col] = {
          ...newGrid[row][col],
          isStart: true,
        };

        setGrid(newGrid);
        setDraggedNode({ row, col });
      } else {
        let newGrid;
        if (isWeightToggled) {
          newGrid = getNewGridWithWeightToggled(grid, row, col);
        } else {
          newGrid = getNewGridWithWallToggled(grid, row, col);
        }
        setGrid(newGrid);
      }
    }
  };

  const handleMouseMove = (row: number, col: number) => {
    if (!mouseIsPressed) return;

    if (draggedNode) {
      const newGrid = grid.slice();

      newGrid[draggedNode.row][draggedNode.col] = {
        ...newGrid[draggedNode.row][draggedNode.col],
        isStart: false,
      };

      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: true,
      };

      setGrid(newGrid);
      setDraggedNode({ row, col });
    }
  };

  const handleStartNodeMouseDown = (row: number, col: number) => {
    if (startNode.row === row && startNode.col === col && !visualizingAlgorithm)
      setDraggedNode(startNode);
    setDragType("start");
  };

  const handleDragStart = (
    e: React.DragEvent,
    startNode: NodeType,
    row: number,
    col: number
  ) => {
    if (!grid[row][col].isDraggable) return;
    if (!e || !e.dataTransfer) return;
    e.dataTransfer.setData("text/plain", "start");

    const nodeElement = document.getElementById(`node-${row}-${col}`);
    if (nodeElement) {
      nodeElement.classList.add("dragging", "node-dragging");
    }

    setDraggedNode(startNode);
  };

  const handleDrop = (e: React.DragEvent, newRow: number, newCol: number) => {
    e.preventDefault();

    if (!draggedNode) {
      return; // Exit early if draggedNode is null or undefined
    }

    const { row, col } = draggedNode;
    const newGrid = grid.slice();

    newGrid[row][col].isStart = false;
    newGrid[row][col].isDraggable = false; // Set isDraggable to false for the old node

    newGrid[startNode.row][startNode.col].isStart = false;

    if (dragType === "start") {
      newGrid[newRow][newCol].isStart = true;
      newGrid[newRow][newCol].isDraggable = true; // Set isDraggable to true for the new node
      const newStartNode = {
        ...newGrid[newRow][newCol],
        row: newRow,
        col: newCol,
        isStart: true,
      };
      setStartNode(newStartNode);
    }

    setGrid(newGrid);
    setDraggedNode(null);
  };

  const handleDragEnd = (row: number, col: number) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: node.isStart,
      isDraggable: node.isStart,
    };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
    setMouseIsPressed(false);
    setDraggedNode(null);

    const nodeElement = document.getElementById(`node-${row}-${col}`);
    if (nodeElement) {
      nodeElement.classList.remove("dragging", "node-dragging");
    }

    if (dragType === "start") {
      console.log(
        "Start Node Row: ",
        startNode.row,
        "Start Node Col: ",
        startNode.col
      );
      setStartNode((prevStartNode) => ({
        ...prevStartNode,
        row: row,
        col: col,
        isStart: true,
      }));
    }
  };

  const visualizeAlgorithm = (algorithms: Algorithm[]): void => {
    if (comparisonMode && algorithms.length !== 2) {
      throw new Error(`Comparison mode requires exactly 2 algorithms`);
    }
    setVisualizingAlgorithm(true);

    const start = grid.flatMap((row) => row.filter((node) => node.isStart))[0];
    const finish = grid.flatMap((row) =>
      row.filter((node) => node.isFinish)
    )[0];

    console.log("startNode: ", start, "finishNode: ", finish);

    algorithms.forEach((algorithm) => {
      if (!algorithm.func) {
        throw new Error(
          `Function not implemented for algorithm ${algorithm.name}`
        );
      }

      const visitedNodesInOrder = algorithm.func(grid, start, finish);
      console.log(
        `visitedNodesInOrder for ${algorithm.name}`,
        visitedNodesInOrder
      );

      if (visitedNodesInOrder.length === 0) {
        setVisualizingAlgorithm(false);
        return;
      }

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
      console.log(
        `nodesInShortestPathOrder for ${algorithm.name}`,
        nodesInShortestPathOrder
      );

      animate(visitedNodesInOrder, nodesInShortestPathOrder);
    });
  };

  // const visualizeAlgorithmWhenDragged = (algorithm: Algorithm[]) => {
  //   if (visualizingAlgorithm || comparisonMode) return;

  //   const start = grid.flatMap((row) => row.filter((node) => node.isStart))[0];
  //   const finish = grid.flatMap((row) =>
  //     row.filter((node) => node.isFinish)
  //   )[0];
  // };
  const animate = (
    visitedNodesInOrder: NodeType[],
    nodesInShortestPathOrder: NodeType[]
  ): void => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        if (i === visitedNodesInOrder.length) {
          animateShortestPath(nodesInShortestPathOrder);
        } else {
          const node = visitedNodesInOrder[i];
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          if (element) {
            if (element.classList.contains("node-weight")) {
              element.className = "node node-weight node-visited";
            } else {
              element.className = "node node-visited";
            }
          }
        }
      }, speed * i);
    }
  };

  const animateComparisonMode = (
    visitedNodesInOrder1: NodeType[],
    visitedNodesInOrder2: NodeType[],
    nodesInShortestPathOrder1: NodeType[],
    nodesInShortestPathOrder2: NodeType[]
  ): void => {
    const longerLength = Math.max(
      visitedNodesInOrder1.length,
      visitedNodesInOrder2.length
    );
    for (let i = 0; i <= longerLength; i++) {
      setTimeout(() => {
        if (i < visitedNodesInOrder1.length) {
          const node1 = visitedNodesInOrder1[i];
          const element1 = document.getElementById(
            `node-${node1.row}-${node1.col}`
          );
          if (element1) {
            element1.className = "node node-visited";
          }
        }
        if (i < visitedNodesInOrder2.length) {
          const node2 = visitedNodesInOrder2[i];
          const element2 = document.getElementById(
            `node-${node2.row}-${node2.col}`
          );
          if (element2) {
            element2.className = element2.classList.contains("node-visited")
              ? "node node-visited-both"
              : "node node-visited-second";
          }
        }

        if (i === visitedNodesInOrder1.length) {
          animateShortestPathComparisonMode(
            nodesInShortestPathOrder1,
            "node node-shortest-path"
          );
        }
        if (i === visitedNodesInOrder2.length) {
          animateShortestPathComparisonMode(
            nodesInShortestPathOrder2,
            "node node-shortest-path-second"
          );
        }
      }, speed * i);
    }
  };

  const animateShortestPathComparisonMode = (
    nodesInShortestPathOrder: NodeType[],
    className: string
  ): void => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = className;
        }
      }, speed * i);
    }
  };

  const visualizeAlgorithmForComparisonMode = (
    algorithms: Algorithm[]
  ): void => {
    if (algorithms.length !== 2) {
      throw new Error(`Comparison mode requires exactly 2 algorithms`);
    }

    setVisualizingAlgorithm(true);

    const start = grid.flatMap((row) => row.filter((node) => node.isStart))[0];
    const finish = grid.flatMap((row) =>
      row.filter((node) => node.isFinish)
    )[0];

    console.log("startNode: ", start, "finishNode: ", finish);

    const paths = algorithms.map((algorithm) => {
      if (!algorithm.func) {
        throw new Error(
          `Function not implemented for algorithm ${algorithm.name}`
        );
      }

      // Clone the grid before passing it to the algorithm
      const gridCopy = grid.map((row) => [...row]);

      const visitedNodesInOrder = algorithm.func(gridCopy, start, finish);
      console.log(
        `visitedNodesInOrder for ${algorithm.name}`,
        visitedNodesInOrder
      );

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
      console.log(
        `nodesInShortestPathOrder for ${algorithm.name}`,
        nodesInShortestPathOrder
      );

      return { visitedNodesInOrder, nodesInShortestPathOrder };
    });

    animateComparisonMode(
      paths[0].visitedNodesInOrder,
      paths[1].visitedNodesInOrder,
      paths[0].nodesInShortestPathOrder,
      paths[1].nodesInShortestPathOrder
    );

    setTimeout(() => {
      setVisualizingAlgorithm(false);
    }, speed * Math.max(paths[0].visitedNodesInOrder.length, paths[1].visitedNodesInOrder.length) + speed * Math.max(paths[0].nodesInShortestPathOrder.length, paths[1].nodesInShortestPathOrder.length));
  };

  // const generateRecursiveDivisionMaze = () => {
  //   if (visualizingAlgorithm || generatingMaze) {
  //     return;
  //   }
  //   setGeneratingMaze(true);
  //   setTimeout(() => {
  //     const startNode = grid[START_NODE_ROW][START_NODE_COL];
  //     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //     const walls = recursiveDivisionMaze(grid, startNode, finishNode);
  //     animateMaze(walls);
  //   }, speed);
  // };

  // const generateRandomMaze = () => {
  //   if (visualizingAlgorithm || generatingMaze) {
  //     return;
  //   }
  //   setGeneratingMaze(true);
  //   setTimeout(() => {
  //     const startNode = grid[START_NODE_ROW][START_NODE_COL];
  //     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //     const walls = recursiveDivisionMaze(grid, startNode, finishNode);
  //     animateMaze(walls);
  //   }, speed);
  // };

  // const generateCurMaze = () => {
  //   if (selectedMaze[0].name === "DFS") {
  //     generateRecursiveDivisionMaze();
  //   } else if (selectedMaze[0].name === "Random Maze") {
  //     generateRandomMaze();
  //   }
  // };

  const animateShortestPath = (nodesInShortestPathOrder: NodeType[]): void => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-shortest-path";
        }
      }, speed * i);
    }
  };
  const runAlgorithm = (selectedAlgorithms: Algorithm[]): void => {
    if (comparisonMode && selectedAlgorithms.length !== 2) {
      return;
    }

    console.log(selectedAlgorithms.length);

    if (comparisonMode) {
      visualizeAlgorithmForComparisonMode(selectedAlgorithms);
    } else {
      visualizeAlgorithm([selectedAlgorithms[0]]);
    }
  };

  const algoSelection = (currentAlgoSelected: string): void => {
    let newSelectedAlgorithms = [...selectedAlgorithms];

    const selectedAlgorithm: Algorithm = {
      id: currentAlgoSelected,
      isShortestPathAlgo: algoMapping[currentAlgoSelected].isShortestPathAlgo,
      isWeighted: algoMapping[currentAlgoSelected].isWeighted,
      name: algoMapping[currentAlgoSelected].name,
      func: algoMapping[currentAlgoSelected].func,
    };

    if (comparisonMode) {
      if (
        newSelectedAlgorithms.some((alg) => alg.id === selectedAlgorithm.id)
      ) {
        newSelectedAlgorithms = newSelectedAlgorithms.filter(
          (alg) => alg.id !== selectedAlgorithm.id
        );
      } else if (newSelectedAlgorithms.length < 2) {
        newSelectedAlgorithms.push(selectedAlgorithm);
      }
    } else {
      newSelectedAlgorithms = [selectedAlgorithm];
    }

    setSelectedAlgorithms(newSelectedAlgorithms);
    // setAlgorithm(currentAlgoSelected);
    setIsAlgoSelected(true);
  };

  const mazeSelection = (maze: string): void => {
    const newSelectedMaze = [...selectedMaze];
    const mazeData: Maze = {
      id: maze,
      name: mazeMapping[maze].name,
    };
    newSelectedMaze.push(mazeData);
    setSelectedMaze(newSelectedMaze);
  };

  const speedSelection = (speedName: string): void => {
    const newSpeed = speedMapping[speedName];
    setSpeed(newSpeed);
    setSelectedSpeed(speedName);
  };

  const toggleWeights = (): void => {
    setIsWeightToggled(!isWeightToggled);
  };

  const toggleComparisonMode = (): void => {
    setComparisonMode(!comparisonMode);
  };

  const toggleTutorial = (): void => {
    setTutorialOpen((prevState) => !prevState);
  };

  const clearVisualization = () => {
    const updatedGrid = grid.map((row) =>
      row.map((node) => {
        const nodeId = `node-${node.row}-${node.col}`;
        node.isVisited = false;
        const element = document.getElementById(nodeId);
        if (element) {
          if (node.isStart) {
            element.className = "node node-start";
          } else if (node.isFinish) {
            element.className = "node node-finish";
          } else if (node.isWall) {
            element.className = "node node-wall";
          } else {
            element.className = "node";
            node.distance = Infinity;
            node.parent = null;
          }
        }
        return node;
      })
    );

    setGrid(updatedGrid);
    setVisualizingAlgorithm(false);
  };

  const clearBoard = () => {
    const newGrid = grid.map((row) =>
      row.map((node) =>
        node.isStart
          ? {
              ...node,
              isVisited: false,
              isShortestPath: false,
              className: "node node-start",
            }
          : node.isFinish
          ? {
              ...node,
              isVisited: false,
              isShortestPath: false,
              className: "node node-finish",
            }
          : {
              ...node,
              isVisited: false,
              isWall: false,
              isWeight: false,
              weight: 1,
              isShortestPath: false,
              className: "node",
            }
      )
    );
    setGrid(newGrid);
  };

  return (
    <React.Fragment>
      <div>
        <MyNavbar
          runAlgorithm={runAlgorithm}
          algoSelection={algoSelection}
          selectedAlgorithms={selectedAlgorithms}
          algorithmMapping={algoMapping}
          comparisonMode={comparisonMode}
          selectedMaze={selectedMaze}
          mazeMapping={mazeMapping}
          isWeightToggled={isWeightToggled}
          clearVisualization={clearVisualization}
          clearBoard={clearBoard}
          speed={speed}
          mazeSelection={mazeSelection}
          toggleWeights={toggleWeights}
          setSpeed={setSpeed}
          toggleComparisonMode={toggleComparisonMode}
          // generatingMaze={generatingMaze}
          speedSelection={speedSelection}
          speedMapping={speedMapping}
          speedSelected={0}
          toggleTutorial={toggleTutorial}
          selectedSpeed={selectedSpeed}
        />
      </div>
      <div className="algorithm-info-container">
        <p className="algorithm-info">
          {" "}
          {comparisonMode
            ? selectedAlgorithms.length === 1
              ? "You are in comparison mode, choose one more algorithm to compare " +
                selectedAlgorithms[0].name +
                " with."
              : selectedAlgorithms.length === 2
              ? "Comparing " +
                selectedAlgorithms[0].name +
                " with " +
                selectedAlgorithms[1].name
              : ""
            : isAlgoSelected
            ? selectedAlgorithms[0].isShortestPathAlgo &&
              selectedAlgorithms[0].isWeighted
              ? "You chose " +
                selectedAlgorithms[0].name +
                ". This algorithm is weighted, and guarantees the shortest path."
              : "You chose " +
                selectedAlgorithms[0].name +
                ", this algorithm is not weighted, and does not guarantee the shortest path."
            : ""}
        </p>
      </div>
      <Legend
        comparisonMode={comparisonMode}
        selectedAlgorithms={selectedAlgorithms}
      />
      <div className="grid-container">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((node, nodeIndex) => {
                const { row, col, isStart, isFinish, isWall, isWeight } = node;
                let cellClassName = "node";
                let shouldFadeWeight = false;
                if (selectedAlgorithms.length > 0) {
                  if (!selectedAlgorithms[0].isWeighted && node.isWeight) {
                    shouldFadeWeight = true;
                  }
                }

                return (
                  <Node
                    key={nodeIndex}
                    className={cellClassName}
                    isStart={isStart}
                    col={col}
                    isWall={isWall}
                    row={row}
                    isWeight={isWeight}
                    isFinish={isFinish}
                    shouldFadeWeight={shouldFadeWeight}
                    node={node}
                    handleMouseDown={(row, col) =>
                      isStart
                        ? handleStartNodeMouseDown(row, col)
                        : handleMouseDown(row, col)
                    }
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}
                    handleMouseMove={handleMouseMove}
                    handleDragStart={handleDragStart}
                    handleDrop={handleDrop}
                    handleDragEnd={handleDragEnd}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {tutorialOpen && <Tutorial onClose={() => setTutorialOpen(false)} />}
    </React.Fragment>
  );
};

export default PathFinding;
