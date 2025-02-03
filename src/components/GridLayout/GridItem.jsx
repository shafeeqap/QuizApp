import PropTypes from "prop-types";
import RoundDiv from "../RoundDiv/RoundDiv";

const GridItem = ({
  title,
  value,
  subtext,
  Icon,
  containerClass,
  titleContainerClass,
  bgColor,
  countRegularQuiz,
  countDailyQuiz,
  footerTitil_1,
  footerTitil_2,
}) => {
  return (
    <div className={containerClass}>
      <div className={titleContainerClass}>
        <p className="grid-title">{title}</p>
      </div>

      <div className="content-wrapper">
        <div className="dashboard-content">
          {/* dynamic updation */}
          <RoundDiv backgroundColor={bgColor}>
            <h3>{value}</h3>
          </RoundDiv>
          <small>{subtext}</small>
        </div>
        <Icon size={90} opacity={0.1} />
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#CCCCFF",
          margin: "0, auto",
        }}
      ></div>
      <div className="card-footer">
        <small style={{ color: "red", cursor: "pointer" }}>
          {footerTitil_1}:{" "}
          <span style={{ color: "black" }}>{countRegularQuiz}</span>
        </small>
        <span>|</span>
        <small style={{ color: "indigo", cursor: "pointer" }}>
          {footerTitil_2}:{" "}
          <span style={{ color: "mediumvioletred" }}>{countDailyQuiz}</span>{" "}
        </small>
      </div>
    </div>
  );
};
GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  subtext: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  containerClass: PropTypes.string.isRequired,
  titleContainerClass: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};
export default GridItem;
