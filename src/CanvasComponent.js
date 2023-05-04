import React, { useRef, useEffect } from "react";

// props:
// rows, columns, array,
// fill pixel by the array
export default function CanvasComponent({ gridArray, setGridArray }) {
  const canvasRef = useRef(null);
  function handleClick(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setGridArray((prevArray) => {
      // Create a new 2D array with the same dimensions as the previous array
      const newArray = new Array(prevArray.length);
      for (let i = 0; i < prevArray.length; i++) {
        newArray[i] = new Array(prevArray[i].length);
      }

      const rows = prevArray.length;
      const cols = prevArray.length;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (
            i * 16 <= x &&
            (i + 1) * 16 > x &&
            j * 16 <= y &&
            (j + 1) * 16 > y
          ) {
            newArray[i][j] = 1;
          } else {
            newArray[i][j] = prevArray[i][j];
          }
        }
      }
      return newArray;
    });

    console.log(`Clicked at (${x}, ${y})`);
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const gridSize = 16;
    const gridSpacing = 0;
    canvas.width = 800; // set the new width of the canvas
    canvas.height = 800; // set the new height of the canvas

    const rows = gridArray.length;
    const columns = gridArray[0].length;

    // console.log("rows: ", rows);
    // ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.4;
    ctx.imageSmoothingEnabled = false;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // console.log("gridArray: ");
    // console.log(gridArray);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        ctx.strokeRect(j * gridSize, i * gridSize, gridSize, gridSize);

        if (gridArray[i][j] === 1) {
          ctx.fillRect(16 * i, 16 * j, gridSize, gridSize);
        }
      }
    }

    ctx.stroke();
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [gridArray]);

  return <canvas id="myCanvas" ref={canvasRef} />;
}
