import React from "react";

export default function Loading() {
  const objStyles = {
    loading: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgb(255,200,200, 0.5)",
      color: "black",
    },
  };

  return <div style={objStyles}>Loading</div>;
}
