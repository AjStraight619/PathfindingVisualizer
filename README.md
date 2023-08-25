# Pathfinding Visualizer

## Description

Pathfinding Visualizer is an interactive web application designed to visualize various pathfinding algorithms in action. Written in TypeScript and React, this project aims to help users understand the inner workings, efficiencies, and characteristics of different algorithms. Through an easy-to-use interface, users can construct mazes, add walls, place weights, move start and finish nodes, and much more.

## Supported Algorithms

- Dijkstra
- A* 
- Breadth-First Search 
- Depth-First Search 
- Greedy Best-first Search 
- Best-first Search 
- Beam Search (Still some debugging to do on this. Specifically, if the beamwidth is too large and walls are too close, the algorithm will not run)

## Interactive Grid

- Draw walls or add "weights" by clicking and dragging the mouse across the grid. 
- Toggle back and forth between walls and weights.
- Move start node to any location.

## User Interface

- Choose algorithms from a simple dropdown menu.
- Control visualization speed.
- Run algorithms in comparison mode to evaluate their performance side by side. (Currently being worked on)

## Installation and Setup

1. Clone the GitHub repo: `https://github.com/AjStraight619/PathfindingVisualizer.git`
2. Install required npm packages: run `npm install`
3. Run the development server: run `npm run dev`

## How to Use

- Click and drag the mouse across grid cells to draw walls or weights.
- Running the Algorithm: Select the algorithm of your choice from the dropdown menu and then click the "Visualize" button.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Make sure to update tests accordingly.

## License

This project is licensed under the MIT License. Check the `LICENSE.md` file for full license details.





