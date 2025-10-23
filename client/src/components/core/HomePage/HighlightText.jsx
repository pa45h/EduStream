import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="font-bold bg-gradient-to-b from-[rgb(255,100,0)] via-[rgb(200,200,255)] to-[rgb(0,255,0)] text-transparent bg-clip-text inline-block">
      {text}
    </span>
  );
};

export default HighlightText;
