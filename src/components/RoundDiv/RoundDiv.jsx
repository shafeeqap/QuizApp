import React from "react";
import "./RoundDiv.css";




const RoundDiv = ({
  backgroundColor,
  children,
  extraClasses = "",
}) => {
  const style = { backgroundColor: backgroundColor || "var(--clr-purple)" };

  return (
    <div className={`content-round ${extraClasses}`} style={style}>
      {children}
    </div>
  );
};

export default RoundDiv;
