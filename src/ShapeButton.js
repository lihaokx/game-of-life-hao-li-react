import React from "react";

export default function ShapeButton({ buttonContent, handleClick }) {
  return (
    <button onClick={handleClick} className="my-button">
      {buttonContent}
    </button>
  );
}
