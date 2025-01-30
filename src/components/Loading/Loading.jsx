import PropTypes from "prop-types";
import { ThreeDots } from "react-loader-spinner";

// Default color: "#4fa94d"
const Loading = ({ height, width, color }) => {
  return (
    <>
      <ThreeDots
        visible={true}
        height={height}
        width={width}
        color={color}
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
};

Loading.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
};
export default Loading;
