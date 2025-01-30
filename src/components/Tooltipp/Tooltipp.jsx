import { useState } from "react";
import "./Tooltipp.css";
import PropTypes from "prop-types";

const Tooltipp = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseOver={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div className={`tooltipp-text ${isVisible ? "show" : ""}`}>{text}</div>
    </div>
  );
};

Tooltipp.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
};
export default Tooltipp;
