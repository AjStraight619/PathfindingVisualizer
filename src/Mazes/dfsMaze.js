function createMazeDFS(width, height) {
    const maze = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ({ visited: false, walls: [true, true, true, true] }))
    );
  
    const stack = [];
    const startX = Math.floor(Math.random() * width);
    const startY = Math.floor(Math.random() * height);
    stack.push([startX, startY]);
  
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
  
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      maze[y][x].visited = true;
  
      const neighbors = [];
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
  
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !maze[ny][nx].visited) {
          neighbors.push([nx, ny]);
        }
      }
  
      if (neighbors.length > 0) {
        stack.push([x, y]);
        const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
  
        if (nx === x + 1) {
          maze[y][x].walls[0] = false;
          maze[ny][nx].walls[1] = false;
        } else if (nx === x - 1) {
          maze[y][x].walls[1] = false;
          maze[ny][nx].walls[0] = false;
        } else if (ny === y + 1) {
          maze[y][x].walls[2] = false;
          maze[ny][nx].walls[3] = false;
        } else if (ny === y - 1) {
          maze[y][x].walls[3] = false;
          maze[ny][nx].walls[2] = false;
        }
  
        stack.push([nx, ny]);
      }
    }
  
    return maze;
  }
  
  // Example usage:
  const maze = createMazeDFS(10, 10);