import React, { useEffect, useRef, useState } from "react";
import {
  createNode,
  getInitialGrid,
  getNewGridWithMaze,
  getNewGridWithUpdatedPath,
  getNewGridWithWallToggled,
  getNewGridWithWeightToggled,
  getNodesInShortestPathOrder,
  resetNode,
} from "../PathFindingUtils";
import { Algorithm, Maze, NodeType, StartNodeStateType } from "../types/types";
import Node from "./Node/Node";

import Legend from "../components/Legend";
import MyNavbar from "../components/MyNavbar";
import "./Node/Node.css";
import "./Pathfinding.css";

import aStar from "../Algorithms/aStar";
import beamSearch from "../Algorithms/beamSearch";
import bestFirstSearch from "../Algorithms/bestFirstSearch";
import BFS from "../Algorithms/bfs";
import depthFirstSearch from "../Algorithms/depthFirstSearch";
import dijkstra from "../Algorithms/dijkstra";
import greedyBFS from "../Algorithms/greedyBFS";
import jumpPointSearch from "../Algorithms/jumpPointSearch";
import recursiveDivisionMaze from "../Mazes/recursiveDivision";
import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  START_NODE_COL,
  START_NODE_ROW,
} from "../PathFindingUtils";
import { Tutorial } from "../components/Tutorial";

const PathFinding = () => {
  const algoMapping: { [key: string]: Algorithm } = {
    "A*": {
      name: "A*",
      id: "A*",
      isShortestPathAlgo: true,
      isWeighted: true,
      func: (grid, startNode, finishNode, allowDiagonalMovement) =>
        aStar(grid, startNode, finishNode, allowDiagonalMovement) || [],
    },

    "Beam Search": {
      name: "Beam Search",
      id: "beamSearch",
      isShortestPathAlgo: false,
      isWeighted: false,
      func: (grid, startNode, finishNode, allowDiagonalMovement) =>
        beamSearch(grid, startNode, finishNode, allowDiagonalMovement) || [],
    },

    "Best First Search": {
      name: "Best First Search",
      id: "bestFirstSearch",
      isShortestPathAlgo: false,
      isWeighted: false,
      func: (grid, startNode, finishNode, allowDiagonalMovement) =>
        bestFirstSearch(grid, startNode, finishNode, allowDiagonalMovement) ||
        [],
    },

    "Breadth-first Search": {
      name: "Breadth-first Search",
      id: "bfs",
      isShortestPathAlgo: true,
      isWeighted: false,
      func: (grid, startNode, finishNode, allowDiagonalMovement) =>
        BFS(grid, startNode, finishNode, allowDiagonalMovement) || [],
    },

    "Depth First Search": {
      name: "Depth-first Search",
      id: "depthFirstSearch",
      isShortestPathAlgo: false,
      isWeighted: false,
      func: (grid, startNode, finishNode, allowDiagonalMovement) =>
        depthFirstSearch(grid, startNode, finishNode, allowDiagonalMovement) ||
        [],
    },

    Dijkstra: {
      name: "Dijkstra",
      id: "Dijkstra",
      isShortestPathAlgo: true,
      isWeighted: true,
      func: (grid, startNode, finishNode, allowDiagonalMovement) =>
        dijkstra(grid, startNode, finishNode, allowDiagonalMovement) || [],
    },

    "Greedy Best-First Search": {
      name: "Greedy Best-First Search",
      id: "greedyBFS",
      isShortestPathAlgo: false,
      isWeighted: true,
      func: (grid, startNode, finishNode, allowDiagonalMovement) =>
        greedyBFS(grid, startNode, finishNode, allowDiagonalMovement) || [],
    },
    "Jump Point Search": {
      name: "Jump Point Search",
      id: "jumpPointSearch",
      isShortestPathAlgo: true,
      isWeighted: false,
      needsDiagonalMovement: true,
      func: (grid, startNode, finishNode) =>
        jumpPointSearch(grid, startNode, finishNode) || [],
    },
  };

  const mazeMapping: { [key: string]: Maze } = {
    // "Depth-First Search": {
    //   name: "DFS Maze",
    //   id: "DFSMaze",
    // },

    "Recursive Division": {
      name: "Recursive Division",
      id: "Recursive Division",
    },

    // "Random Maze": {
    //   name: "Random Maze",
    //   id: "Random Maze",
    // },
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
    weight: 1,
    isDraggable: false,
    closest: Infinity,
    distance: Infinity,
    className: "",
    opened: false,
    closed: false,
  };

  const [startNodeState, setStartNodeState] = useState<StartNodeStateType>({
    node: {
      ...defaultNode,
      isDraggable: true,
      className: "node-start",
      isStart: true,
      row: START_NODE_ROW,
      col: START_NODE_COL,
    },
    isDragging: false,
    draggedNode: null,
  });

  const [grid, setGrid] = useState<NodeType[][]>(getInitialGrid());
  const [visualizingAlgorithm, setVisualizingAlgorithm] = useState(false);
  const [generatingMaze, setGeneratingMaze] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [isWeightToggled, setIsWeightToggled] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>([]);
  const [isAlgoSelected, setIsAlgoSelected] = useState(false);
  const [selectedMaze, setSelectedMaze] = useState<Maze[]>([]);
  const [selectedSpeed, setSelectedSpeed] = useState("Fast");
  const [hasAlgorithmRun, setHasAlgorithmRun] = useState(false);
  const [allowDiagonalMovement, setAllowDiagonalMovement] = useState(false);

  const [finishNodeState, setFinishNodeState] = useState({
    node: {
      ...createNode(FINISH_NODE_ROW, FINISH_NODE_COL),
      isFinish: true,
      row: FINISH_NODE_ROW,
      col: FINISH_NODE_COL,
    },
  });

  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const [tutorialOpen, setTutorialOpen] = useState(true);

  const lastPosition = useRef<{ row: number | null; col: number | null }>({
    row: null,
    col: null,
  });

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  // Call onMove when the startNode is being dragged
  const onMove = (
    e: React.DragEvent,
    node: NodeType,
    row: number,
    col: number
  ) => {
    e.preventDefault();
    // If not dragging the start node, do nothing
    if (!startNodeState.isDragging) {
      return;
    }

    for (const row of grid) {
      for (const node of row) {
        if (!node.isStart && !node.isFinish) {
          // Skip the start and finish nodes
          resetNode(node);
        }
      }
    }

    checkStartNodePosition();
    const isValid =
      row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

    if (!isValid || node.isWall || node.isWeight) {
      return;
    }

    if (row !== lastPosition.current.row || col !== lastPosition.current.col) {
      if (hasAlgorithmRun) {
        console.log("in onMove, hasAlgorithmRun:", hasAlgorithmRun);
        updateShortestPath(row, col);
      }
      lastPosition.current = { row, col };
    }
  };

  const resetVisitedNodes = (grid: NodeType[][]) => {
    return grid.map((row) =>
      row.map((node) => {
        return { ...node, isVisited: false };
      })
    );
  };

  const updateShortestPath = (updatedRow: number, updatedCol: number) => {
    // Reset the isVisited property on all nodes
    const resetGrid = resetVisitedNodes(grid);
    setGrid(resetGrid);

    const updatedStartNode: NodeType = {
      ...startNodeState.node,
      row: updatedRow,
      col: updatedCol,
    };

    const finish = resetGrid.flatMap((row) =>
      row.filter((node) => node.isFinish)
    )[0];
    const algorithm = selectedAlgorithms[0];
    if (!algorithm || !algorithm.func) {
      return;
    }

    // Using the utility function to update grid and get the new shortest path
    const [newGrid, newNodesInShortestPathOrder] = getNewGridWithUpdatedPath(
      resetGrid,
      updatedStartNode,
      finish,
      algorithm.func,
      allowDiagonalMovement,
      algorithm.name
    );

    setGrid(newGrid);
    clearVisualization();
    animateShortestPathOnStartNodeDrag(newNodesInShortestPathOrder);
  };

  const checkStartNodePosition = (): string => {
    const startNode = grid.flatMap((row) =>
      row.filter((node) => node.isStart)
    )[0];
    const finishNode = grid.flatMap((row) =>
      row.filter((node) => node.isFinish)
    )[0];

    if (startNode.col > finishNode.col)
      // return chevron left (will specify in css class)
      return "left";
    else if (startNode.row > finishNode.row && startNode.col === finishNode.col)
      // return chevron up
      return "up";
    else if (startNode.row < finishNode.row && startNode.col === finishNode.col)
      // return chevron down
      return "down";
    else return "right";
  };

  const animateShortestPathOnStartNodeDrag = (
    nodesInShortestPathOrder: NodeType[]
  ) => {
    // Remove "node-shortest-path" class from all nodes
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const element = document.getElementById(`node-${row}-${col}`);
        if (element) {
          element.classList.remove("node-updated-shortest-path");
        }
      }
    }

    // Add "node-updated-shortest-path" class to nodes in the new shortest path
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) {
        element.className = "node node-updated-shortest-path";
      }
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    if (visualizingAlgorithm) return;

    const newGrid = isWeightToggled
      ? getNewGridWithWeightToggled(grid, row, col)
      : getNewGridWithWallToggled(grid, row, col);

    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseUp = () => {
    if (!visualizingAlgorithm) {
      setMouseIsPressed(false);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || visualizingAlgorithm) return;

    let newGrid = [...grid];
    if (startNodeState.isDragging) {
      newGrid[startNodeState.node.row][startNodeState.node.col] = {
        ...newGrid[startNodeState.node.row][startNodeState.node.col],
        isStart: false,
      };

      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: true,
      };

      setStartNodeState((prevState) => ({
        ...prevState,
        node: {
          ...prevState.node,
          row: row,
          col: col,
        },
      }));
    } else {
      newGrid = isWeightToggled
        ? getNewGridWithWeightToggled(grid, row, col)
        : getNewGridWithWallToggled(grid, row, col);
    }

    setGrid(newGrid);
  };

  const handleDragEnd = (row: number, col: number) => {
    lastPosition.current = { row: null, col: null };

    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: node.isStart,
      isDraggable: node.isStart,
    };
    newGrid[row][col] = newNode;
    if (newNode.isWall) return;
    setGrid(newGrid);
    console.log("dragEnd called", row, col);

    setMouseIsPressed(false);

    const nodeElement = document.getElementById(`node-${row}-${col}`);
    if (nodeElement) {
      nodeElement.classList.remove("dragging", "node-dragging");
    }

    if (startNodeState.isDragging) {
      setStartNodeState((prevState) => ({
        ...prevState,
        isDragging: false,
        node: {
          ...prevState.node,
          row: row,
          col: col,
        },
      }));
    }
  };

  const handleStartNodeMouseDown = (row: number, col: number) => {
    if (
      startNodeState.node.row === row &&
      startNodeState.node.col === col &&
      !visualizingAlgorithm
    ) {
      setStartNodeState((prevState) => ({
        ...prevState,
        isDragging: true,
        draggedNode: prevState.node,
      }));
    }
  };
  const handleDragStart = (
    e: React.DragEvent,
    startNode: NodeType,
    row: number,
    col: number
  ) => {
    if (visualizingAlgorithm) return; // do not allow dragging while visualizing algorithm
    if (!grid[row][col].isDraggable) return; // check if node is draggable
    if (!e || !e.dataTransfer) return; // check if dataTransfer is supported by the browser
    e.dataTransfer.setData("text/plain", "start");

    const nodeElement = document.getElementById(`node-${row}-${col}`);
    if (nodeElement) {
      nodeElement.classList.add("dragging", "node-dragging");
    }

    setStartNodeState((prevState) => ({
      ...prevState,
      isDragging: true,
      draggedNode: startNode,
    }));
  };

  const handleDrop = (e: React.DragEvent, newRow: number, newCol: number) => {
    e.preventDefault();

    if (!startNodeState.draggedNode) {
      return;
    }

    const { row, col } = startNodeState.draggedNode;
    const newGrid = grid.slice();

    newGrid[row][col].isStart = false;
    newGrid[row][col].isDraggable = false;

    if (startNodeState.isDragging) {
      newGrid[newRow][newCol].isStart = true;
      newGrid[newRow][newCol].isDraggable = true;

      const newStartNode = {
        ...newGrid[newRow][newCol],
        isDraggable: true,
        row: newRow,
        col: newCol,
        isStart: true,
        className: "node-start",
      };

      console.log("startNode: ", newStartNode);

      if (newStartNode.isWall) return;

      setStartNodeState({
        isDragging: false,
        draggedNode: null,
        node: newStartNode,
      });
    } else {
      setStartNodeState({
        ...startNodeState,
        isDragging: false,
        draggedNode: null,
      });
    }

    setGrid(newGrid);
  };

  const toggleAllowDiagonalMovement = () => {
    if (visualizingAlgorithm) return;
    setAllowDiagonalMovement((prevState) => !prevState);
  };

  const visualizeAlgorithm = (algorithms: Algorithm[]): void => {
    if (comparisonMode && algorithms.length !== 2) {
      throw new Error(`Comparison mode requires exactly 2 algorithms`);
    }

    setVisualizingAlgorithm(true);
    setHasAlgorithmRun(false);

    const start = startNodeState.node;
    const finishNode = finishNodeState.node;
    const finish = grid.flatMap((row) =>
      row.filter((node) => node.isFinish)
    )[0];

    algorithms.forEach((algorithm) => {
      if (!algorithm.func) {
        throw new Error(
          `Function not implemented for algorithm ${algorithm.name}`
        );
      }

      const gridCopy = grid.map((row) => [...row]);

      const visitedNodesInOrder = algorithm.func(
        gridCopy,
        start,
        finish,
        allowDiagonalMovement
      );
      console.log(
        `visitedNodesInOrder for ${algorithm.name}`,
        visitedNodesInOrder
      );

      if (visitedNodesInOrder.length === 0) {
        setVisualizingAlgorithm(false);
        return;
      }
      let nodesInShortestPathOrder: NodeType[];
      if (algorithm.name === "Jump Point Search") {
        nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
      } else {
        nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
      }
      animate(visitedNodesInOrder, nodesInShortestPathOrder);
    });
  };

  const animate = (
    visitedNodesInOrder: NodeType[],
    nodesInShortestPathOrder: NodeType[]
  ): void => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        // Remove the temporary start node icon from the previous node
        if (i > 0) {
          const prevNode = visitedNodesInOrder[i - 1];
          const prevElement = document.getElementById(
            `node-${prevNode.row}-${prevNode.col}`
          );
          if (prevElement) {
            prevElement.classList.remove("temp-start-icon");
          }
        }

        if (i === visitedNodesInOrder.length) {
          setVisualizingAlgorithm(false);
          animateShortestPath(nodesInShortestPathOrder);
          setHasAlgorithmRun(true);
        } else {
          // Add the temporary start node icon to the current node
          const node = visitedNodesInOrder[i];
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          if (element) {
            element.classList.add("temp-start-icon");
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

    const paths = algorithms.map((algorithm) => {
      if (!algorithm.func) {
        throw new Error(
          `Function not implemented for algorithm ${algorithm.name}`
        );
      }

      // Clone the grid before passing it to the algorithm
      const gridCopy = grid.map((row) => [...row]);

      const visitedNodesInOrder = algorithm.func(
        gridCopy,
        start,
        finish,
        allowDiagonalMovement
      );

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);

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

  const generateRecursiveDivisionMaze = () => {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    setGeneratingMaze(true);
    setTimeout(() => {
      const start = grid.flatMap((row) =>
        row.filter((node) => node.isStart)
      )[0];
      const finish = grid.flatMap((row) =>
        row.filter((node) => node.isFinish)
      )[0];
      const walls: false | [number, number][] = recursiveDivisionMaze(
        grid,
        start,
        finish
      );

      if (walls !== false) {
        animateMaze(walls);
      }
    }, speed);
  };

  const animateMaze = (walls: [number, number][]) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          const newGrid = getNewGridWithMaze(grid, walls);
          setGrid(newGrid);
          setGeneratingMaze(false);
        }, i * speed);
        return;
      }
      const wall = walls[i];
      const node = grid[wall[0]][wall[1]];
      setTimeout(() => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          if (element.classList.contains("node-weight")) {
            element.className = "node node-wall-animated node-weight";
          } else {
            element.className = "node node-wall-animated";
          }
        }
      }, i * speed);
    }
  };

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

  const generateMaze = (selectedMaze: Maze[]) => {
    if (
      selectedMaze.length > 0 &&
      selectedMaze[0].name === "Recursive Division"
    ) {
      generateRecursiveDivisionMaze();
    }
  };

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

    const startNode = startNodeState?.node;

    if (
      !startNode ||
      startNode.isWall ||
      startNode.row < 0 ||
      startNode.row >= grid.length ||
      startNode.col < 0 ||
      startNode.col >= grid[0].length
    ) {
      const initialGrid = getInitialGrid(); // Recreate the initial grid
      setGrid(initialGrid); // Set the grid to the initial state
      return;
    }
    clearVisualization();

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
              distance: Infinity,
              parent: null,
              isVisited: false,
              isShortestPath: false,
              className: "node node-start",
            }
          : node.isFinish
          ? {
              ...node,
              distance: Infinity,
              parent: null,
              isVisited: false,
              isShortestPath: false,
              className: "node node-finish",
            }
          : {
              ...node,
              distance: Infinity,
              parent: null,
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
          generateMaze={generateMaze}
          speedSelection={speedSelection}
          speedMapping={speedMapping}
          speedSelected={0}
          toggleTutorial={toggleTutorial}
          selectedSpeed={selectedSpeed}
          toggleAllowDiagonalMovement={toggleAllowDiagonalMovement}
          allowDiagonalMovement={allowDiagonalMovement}
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
                const cellClassName = "node";
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
                    handleDragStart={handleDragStart}
                    handleDrop={handleDrop}
                    onMove={onMove}
                    handleDragEnd={handleDragEnd}
                    checkStartNodePosition={checkStartNodePosition}
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
