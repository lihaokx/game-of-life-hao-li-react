// 1. control the states. 2d array to store the state of which pixel is already filled.
// 2. control which pixel should be filled
// 3. Apply game logic.
// 4. Set a timer, setinterval like 1000ms.
// 5. Pass the array to Canvas Component by the props

// next step: April 24
// 1. adding initialized patterns
// 2. add a button to the step 1
// 3. Manually picking a pixel. event listner
// 4.

import React, { useRef, useEffect, useState } from "react";
import CanvasComponent from "./CanvasComponent";
import ShapeButton from "./ShapeButton";

export default function GameComponent() {
  const [gridArray, setGridArray] = useState(() => {
    const rows = 50;
    const cols = 50;
    const array = [];

    for (let i = 0; i < rows; i++) {
      array.push([]);
      for (let j = 0; j < cols; j++) {
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        if (randomNumber > 9) {
          array[i].push(1);
        } else {
          array[i].push(0);
        }
      }
    }
    return array;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGridArray((prevArray) => {
        // Create a new 2D array with the same dimensions as the previous array
        const newArray = new Array(prevArray.length);
        for (let i = 0; i < prevArray.length; i++) {
          newArray[i] = new Array(prevArray[i].length);
        }

        function countNeibour(row, col) {
          let count = 0;

          for (let l = -1; l <= 1; l++) {
            for (let u = -1; u <= 1; u++) {
              if (l === 0 && u === 0) {
                continue;
              }

              const neighborRow = row + l;
              const neighborCol = col + u;

              if (
                neighborRow < 0 ||
                neighborRow >= prevArray.length ||
                neighborCol < 0 ||
                neighborCol >= prevArray.length
              ) {
                continue;
              }

              if (prevArray[neighborRow][neighborCol] === 1) {
                count++;
              }
            }
          }
          return count;
        }

        // Update each element of the new array based on the previous array
        for (let i = 0; i < prevArray.length; i++) {
          for (let j = 0; j < prevArray[i].length; j++) {
            let count = countNeibour(i, j);

            if (prevArray[i][j] === 1 && (count < 2 || count > 3)) {
              newArray[i][j] = 0;
            } else if (prevArray[i][j] === 0 && count === 3) {
              newArray[i][j] = 1;
            } else {
              newArray[i][j] = prevArray[i][j];
            }
          }
        }

        return newArray;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const blinkerClick = () => {
    console.log("Button clicked!");
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
          if (i === 25 && j >= 24 && j <= 26) {
            newArray[i][j] = 1;
          } else {
            newArray[i][j] = 0;
          }
        }
      }
      return newArray;
    });
  };
  const blinker = "Blinker";

  const beaconClick = () => {
    console.log("Button clicked!");
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
            (i === 23 && (j === 24 || j === 25)) ||
            (i === 24 && (j === 24 || j === 25)) ||
            (i === 25 && (j === 26 || j === 27)) ||
            (i === 26 && (j === 26 || j === 27))
          ) {
            newArray[i][j] = 1;
          } else {
            newArray[i][j] = 0;
          }
        }
      }
      return newArray;
    });
  };
  const beacon = "Beacon";

  const toadClick = () => {
    console.log("Button clicked!");
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
            (j === 25 && i >= 25 && i <= 27) ||
            (j === 26 && i >= 24 && i <= 26)
          ) {
            newArray[i][j] = 1;
          } else {
            newArray[i][j] = 0;
          }
        }
      }
      return newArray;
    });
  };
  const toad = "Toad";

  const gliderClick = () => {
    console.log("Button clicked!");
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
            (i === 24 && j === 25) ||
            (i === 25 && j === 26) ||
            (i === 26 && j >= 24 && j <= 26)
          ) {
            newArray[i][j] = 1;
          } else {
            newArray[i][j] = 0;
          }
        }
      }
      return newArray;
    });
  };
  const glider = "Glider";

  return (
    <div>
      <CanvasComponent gridArray={gridArray} setGridArray={setGridArray} />
      <ShapeButton
        setGridArray={setGridArray}
        buttonContent={blinker}
        handleClick={blinkerClick}
      />
      <ShapeButton
        setGridArray={setGridArray}
        buttonContent={beacon}
        handleClick={beaconClick}
      />
      <ShapeButton
        setGridArray={setGridArray}
        buttonContent={toad}
        handleClick={toadClick}
      />
      <ShapeButton
        setGridArray={setGridArray}
        buttonContent={glider}
        handleClick={gliderClick}
      />
    </div>
  );
}
