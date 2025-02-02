import PropTypes from "prop-types";
import React from "react";

// Default color:"#4fa94d"
const Watch = ({ height = "80", width = "80", color = "#4fa94d" }) => {
  return (
    <>
      render(
      <Watch
        visible={true}
        height={height}
        width={width}
        radius="48"
        color={color}
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      )
    </>
  );
};

Watch.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
};
export default Watch;
