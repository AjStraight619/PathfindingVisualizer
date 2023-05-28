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

import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
} from "../PathFindingUtils";
import aStar from "../Algorithms/aStar";
import dijkstra from "../Algorithms/dijkstra";
import depthFirstSearch from "../Algorithms/depthFirstSearch";
import BFS from "../Algorithms/bfs";
import beamSearch from "../Algorithms/beamSearch";
import bestFirstSearch from "../Algorithms/bestFirstSearch";
import greedyBFS from "../Algorithms/greedyBFS";

const WEIGHTED_ALGOS = "A*" && "dijkstra";

const PathFinding = () => {
  const algoMapping: { [key: string]: Algorithm } = {
    "A*": {
      name: "A*",
      id: "A*",
      func: (grid, startNode, finishNode) =>
        aStar(grid, startNode, finishNode) || [],
    },

    "Beam Search": {
      name: "Beam Search",
      id: "beamSearch",
      func: (grid, startNode, finishNode) =>
        beamSearch(grid, startNode, finishNode) || [],
    },

    "Best First Search": {
      name: "Best First Search",
      id: "bestFirstSearch",
      func: (grid, startNode, finishNode) =>
        bestFirstSearch(grid, startNode, finishNode) || [],
    },

    "Breadth-first Search": {
      name: "Breadth-first Search",
      id: "bfs",
      func: (grid, startNode, finishNode) =>
        BFS(grid, startNode, finishNode) || [],
    },

    "Depth First Search": {
      name: "depthFirstSearch",
      id: "depthFirstSearch",
      func: (grid, startNode, finishNode) =>
        depthFirstSearch(grid, startNode, finishNode) || [],
    },

    Dijkstra: {
      name: "Dijkstra",
      id: "Dijkstra",
      func: (grid, startNode, finishNode) =>
        dijkstra(grid, startNode, finishNode) || [],
    },

    "Greedy Best-First Search": {
      name: "Greedy Best-First Search",
      id: "greedyBFS",
      func: (grid, startNode, finishNode) =>
        greedyBFS(grid, startNode, finishNode) || [],
    },
  };

  const mazeMapping: { [key: string]: Maze } = {
    DFSMaze: {
      name: "DFS Maze",
      id: "DFSMaze",
    },
  };

  const speedMapping: { [key: string]: number } = {
    Fast: 10,
    Medium: 20,
    Slow: 30,
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
  const [finishNode, setFinishNode] = useState<NodeType>({
    ...defaultNode,
    row: FINISH_NODE_ROW,
    col: FINISH_NODE_COL,
  });
  const [grid, setGrid] = useState<NodeType[][]>([[]]);
  const [animationStopped, setAnimationStopped] = useState(false);
  const [visualizingAlgorithm, setVisualizingAlgorithm] = useState(false);
  const [generatingMaze, setGeneratingMaze] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [isWeightToggled, setIsWeightToggled] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>([]);
  const [isAlgoSelected, setIsAlgoSelected] = useState(false);
  const [selectedMaze, setSelectedMaze] = useState<Maze[]>([]);
  const [selectedSpeed, setSelectedSpeed] = useState("Fast");
  const [isShortestPathAlgo, setIsShortestPathAlgo] = useState(false);
  const [tutorial, setTutorial] = useState(true);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggedNode, setDraggedNode] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [dragType, setDragType] = useState("");

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    let newGrid: NodeType[][];
    if (isWeightToggled) {
      newGrid = getNewGridWithWeightToggled(grid, row, col);
    } else {
      newGrid = getNewGridWithWallToggled(grid, row, col);
    }
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setDraggedNode(null);
  };

  const handleMouseEnter = (row: number, col: number) => {
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
    } else {
      let newGrid;
      if (isWeightToggled) {
        newGrid = getNewGridWithWeightToggled(grid, row, col);
      } else {
        newGrid = getNewGridWithWallToggled(grid, row, col);
      }
      setGrid(newGrid);
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
    if (startNode.row === row && startNode.col === col)
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
      setStartNode((prevStartNode) => ({
        ...prevStartNode,
        row: newRow,
        col: newCol,
      }));
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
      setStartNode((prevStartNode) => ({
        ...prevStartNode,
        row: row,
        col: col,
      }));
    }
  };

  const visualizeAlgorithm = (
    algorithm: Algorithm,
    visitedClass: string,
    shortestPathClass: string
  ) => {
    console.log(
      "In visualize Algorithm",
      algorithm,
      visualizingAlgorithm,
      generatingMaze
    );
    if (!algorithm || visualizingAlgorithm || generatingMaze) {
      return;
    }

    setVisualizingAlgorithm(true);

    const visitedNodesInOrder = algorithm.func!(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    animate(
      visitedNodesInOrder,
      nodesInShortestPathOrder,
      visitedClass,
      shortestPathClass
    );
    console.log("animate called");
  };

  const animate = (
    visitedNodesInOrder: NodeType[],
    nodesInShortestPathOrder: NodeType[],
    visitedClass: string,
    shortestPathClass: string
  ) => {};

  const runAlgorithm = (selectedAlgorithms: Algorithm[]): void => {
    if (comparisonMode && selectedAlgorithms.length !== 2) return;

    if (comparisonMode) {
      // Run both algorithms
      visualizeAlgorithm(
        selectedAlgorithms[0],
        "node-visited",
        "node-shortest-path"
      );

      visualizeAlgorithm(
        selectedAlgorithms[1],
        "node-visited-second",
        "node-shortest-path-second"
      );
    } else {
      // Run the single selected algorithm
      visualizeAlgorithm(
        selectedAlgorithms[0],
        "node-visited",
        "node-shortest-path"
      );
    }
  };

  const algoSelection = (currentAlgoSelected: string): void => {
    let newSelectedAlgorithms = [...selectedAlgorithms];
    const selectedAlgorithm: Algorithm = {
      id: currentAlgoSelected,
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

  const speedSelection = (speedName: string) => {
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
    setTutorial(!tutorial);
  };

  const clearVisualization = () => {
    setAnimationStopped(true);

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
    setAnimationStopped(false);
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
          generatingMaze={generatingMaze}
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
                selectedAlgorithms[0] +
                " with."
              : selectedAlgorithms.length === 2
              ? "Comparing " +
                selectedAlgorithms[0] +
                " with " +
                selectedAlgorithms[1]
              : ""
            : isAlgoSelected
            ? isShortestPathAlgo && WEIGHTED_ALGOS
              ? "You chose " +
                selectedAlgorithms[0] +
                ". This algorithm is weighted, and guarantees the shortest path."
              : "You chose " +
                selectedAlgorithms[0] +
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

                return (
                  <Node
                    key={nodeIndex}
                    className="node"
                    isStart={isStart}
                    col={col}
                    isWall={isWall}
                    row={row}
                    isWeight={isWeight}
                    isFinish={isFinish}
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
    </React.Fragment>
  );
};

export default PathFinding;
