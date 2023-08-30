type sortingAlgorithm = {
  name: string; // The name of the algorithm
  description?: string; // A short description
  execute: (array: number[]) => number[]; // The function to execute
};
