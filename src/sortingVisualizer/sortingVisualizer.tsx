import React, { useState, useEffect } from "react";
import bubbleSort from "./algorithms/bubbleSort";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [algorithms, setAlgorithms] = useState<sortingAlgorithm[]>([]);
  const ARRAY_LENGTH = 50;

  // Generate a random array when the component mounts
  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: ARRAY_LENGTH }, () =>
      randomIntFromInterval(5, 500)
    );
    setArray(newArray);
  };

  const selectAlgorithm = (algorithm: sortingAlgorithm[]) => {
    const newAlgorithms = [...algorithms];
  };

  return (
    <div>
      <button onClick={resetArray}>Generate New Array</button>
      <button onClick={() => bubbleSort(array)}>Bubble Sort</button>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate a random integer
const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
