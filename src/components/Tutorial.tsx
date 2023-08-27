import React, { useState } from "react";
import "./tutorial.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface TutorialProps {
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Tutorial = (props: TutorialProps) => {
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    if (page < 8) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="tutorial">
      <div className="tutorial-content">
        <div className="tutorial-header">
          <h2>Pathfinding Visualizer Tutorial</h2>
          <button className="tutorial-close-button" onClick={props.onClose}>
            Close
          </button>
        </div>
        {page === 1 && (
          <div>
            <h3>Step 1: Introduction</h3>
            <p>
              Welcome to the Pathfinding Visualizer! This tool allows you to
              visualize different pathfinding algorithms in action. You can
              choose from several algorithms and maze generation algorithms to
              experiment with.
            </p>
            <button className="tutorial-next-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
        {page === 2 && (
          <div>
            <h3>Step 2: Creating Walls and Weights</h3>
            <p>
              Walls are obstacles that cannot be crossed by the pathfinding
              algorithm. To create a wall, simply click and drag over the grid
              cells. To remove a wall, click and drag over the wall again.
            </p>
            <p>
              Weights are another form of an obstacle that only A* and
              Dijkstra's algorithms consider in their search for the finish
              node. They are considered "weighted algorithms". Weights add a
              cost to traversing through a node. Initially, the weight of each
              node is 1. However, adding a weight will randomly generate number
              between 2 and 5, and the algorithms will take into account the
              weight of each node when determinging the shotest path. To create
              a node, you can toggle it by clicking on the "Toggle Weights"
              button in the navigation bar.
            </p>
            <button className="tutorial-prev-button" onClick={handlePrevPage}>
              Prev
            </button>
            <button className="tutorial-next-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
        {page === 3 && (
          <div>
            <h3>Step 3: Choosing an Algorithm</h3>
            <p>
              You can choose from several different pathfinding algorithms to
              visualize, including Dijkstra's Algorithm, A*, Breadth-First
              Search, and Depth-First Search. To choose an algorithm, click on
              the "Choose an Algorithm!" dropdown in the navbar and select your
              desired algorithm.
            </p>
            <button className="tutorial-prev-button" onClick={handlePrevPage}>
              Prev
            </button>
            <button className="tutorial-next-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
        {page === 4 && (
          <div>
            <h3>Step 4: Choosing a Maze</h3>
            <p>
              You can also choose from several different maze generation
              algorithms, including Recursive Division and Random Maze. To
              choose a maze, click on the "Choose a Maze!" dropdown in the
              navbar and select your desired maze algorithm.
            </p>
            <button className="tutorial-prev-button" onClick={handlePrevPage}>
              Prev
            </button>
            <button className="tutorial-next-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
        {page === 5 && (
          <div>
            <h3>Step 5: Adjusting Speed</h3>
            <p>
              You can adjust the speed of the pathfinding visualization by
              selecting a speed from the "Speed" dropdown in the navbar. The
              available speed options are Fast, Medium, and Slow.
            </p>
            <div className="tutorial-arrows">
              <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevPage} />
              <FontAwesomeIcon icon={faChevronRight} onClick={handleNextPage} />
            </div>
            <button className="tutorial-prev-button" onClick={handlePrevPage}>
              Prev
            </button>
            <button className="tutorial-next-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}

        {page === 6 && (
          <div>
            <h3>Comparison Mode</h3>
            <p>
              Comparison Mode is a tool that allows you to compare the
              performance two different pathfinding algorithms. You will be able
              to see how they explore the grid in different ways to find the
              finish node.
            </p>
            <button className="tutorial-prev-button" onClick={handlePrevPage}>
              Prev
            </button>
            <button className="tutorial-next-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}

        {page === 7 && (
          <div>
            <h3>About the Algorithms</h3>
            <p>
              There are four algorithms implemented in this pathfinding
              visualizer: Dijkstra's, A*, Breadth-First Search, Greedy
              Best-First Search, Best-First Search, Beam Search and Depth-First
              Search. All of these algorithms are unique in their own ways. A*
              is going to be the overall most efficient algorithm because it
              uses a heuristic to guide the search towards the goal node.
              Dijkstra's is a weighted algorithm that is guaranteed to find the
              shortest path, but it is slower than A* because it does not use a
              heuristic. Breadth-First Search is an unweighted algorithm that is
              guaranteed to find the shortest path, but it is slower than both
              Dijkstra's and A*. Depth-First Search is an unweighted algorithm
              that does not guarantee the shortest path, but it is faster than
              all the other algorithms. Greedy Best-First Search is a weighted
              algorithm that is similar to A*, but it does not guarantee the
              shortest path. Beam Search is a variant of Best-First Search that
              only explores a fixed number of nodes at each level of the search
              tree.
            </p>
            <h4>Dijkstra's Algorithm:</h4>
            <p>
              Dijkstra's Algorithm is a weighted graph search algorithm that
              calculates the shortest path between the start node and all other
              nodes in a graph. It does this by maintaining a set of unvisited
              nodes and selecting the node with the shortest distance from the
              start node as the current node. It then examines all the neighbors
              of the current node and updates their distances if a shorter path
              is found. This process continues until the destination node is
              reached or all reachable nodes have been visited.
            </p>
            <h4>A* Algorithm:</h4>
            <p>
              A* Algorithm is a heuristic search algorithm that is similar to
              Dijkstra's Algorithm, but also takes into account an estimate of
              the remaining distance from a node to the destination. This
              estimate is called the heuristic, and is used to guide the search
              towards the goal node. A* Algorithm is considered a best-first
              search algorithm because it always selects the node that appears
              to be closest to the goal, based on the sum of the distance from
              the start node to the current node and the heuristic estimate of
              the remaining distance to the goal.
            </p>
            <h4>Breadth-First Search:</h4>
            <p>
              Breadth-First Search is an algorithm that explores all the
              vertices of a graph that are at the same distance from the
              starting vertex before exploring vertices that are farther away.
              It starts at the starting vertex and visits all the vertices at
              distance 1, then all the vertices at distance 2, and so on, until
              the goal vertex is found.
            </p>
            <h4>Depth-First Search:</h4>
            <p>
              Depth-First Search is an algorithm that explores as far as
              possible along each branch before backtracking. It starts at the
              starting vertex and explores as far as possible along each branch
              before backtracking to explore other branches. It continues this
              process until the goal vertex is found or all reachable vertices
              have been explored.
            </p>

            <h4>Best-first Search:</h4>
            <p>
              Best-First Search is a search algorithm that aims to find the
              optimal path from a starting node to a goal node in a graph or a
              network. This algorithm explores the graph in a greedy manner, by
              always choosing the next node that seems to be closest to the goal
              node, according to some heuristic function.
            </p>
            <h4>Biderectional Greedy: *currently working on debugging*</h4>
            <p>
              Bidirectional Greedy Best-First Search is a variant of the
              Best-First Search algorithm that simultaneously searches from both
              the start and the goal nodes towards their common meeting point.
              It expands the nodes with the lowest heuristic values, i.e., the
              nodes that are closest to the meeting point, in each direction. By
              running the search simultaneously from both directions, the
              algorithm can quickly identify the shortest path between the start
              and goal nodes.
            </p>
            <h4>Greedy Best-First Search:</h4>
            <p>
              Greedy Best-First Search is a search algorithm that aims to find
              the optimal path from a starting node to a goal node in a graph or
              a network. This algorithm explores the graph in a greedy manner,
              by always choosing the next node that seems to be closest to the
              goal node, according to some heuristic function.
            </p>
            <h4>Beam Search:</h4>
            <p>
              Beam Search is a variant of Best-First Search that only explores a
              fixed number of nodes at each level of the search tree. It starts
              at the starting vertex and explores the fixed number of nodes with
              the lowest heuristic values, i.e., the nodes that are closest to
              the goal node. It then expands the nodes at the next level of the
              search tree and repeats the process until the goal node is found.
            </p>
            <button className="tutorial-close-button" onClick={props.onClose}>
              Close
            </button>
            <button className="tutorial-prev-button" onClick={handlePrevPage}>
              Prev
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
