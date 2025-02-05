import React from "react";
import PropTypes from "prop-types";
import RoundDiv from "../RoundDiv/RoundDiv";
import { useNavigate } from "react-router-dom";

const GridItem = ({
  title,
  value,
  roundDivbgColor,
  subtext,
  Icon,
  containerClass,
  titleContainerClass,
  footerItems,
}) => {
  const navigate = useNavigate();

  return (
    <div className={containerClass}>
      <div className={titleContainerClass}>
        <p className="grid-title">{title}</p>
      </div>

      <div className="content-wrapper">
        <div className="dashboard-content">
          <RoundDiv backgroundColor={roundDivbgColor}>
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
          margin: "0 auto",
        }}
      ></div>
      <div className="card-footer">
        {footerItems.map((item, index) => (
          <React.Fragment key={index}>
            <small
              className="no-drag"
              style={{ color: item.textColor }}
              onClick={() => navigate(item.route)}
            >
              {item.title}:{" "}
              <span style={{ color: item.spanColor }}>{item.count}</span>
            </small>
            {index !== footerItems.length - 1 && <span>|</span>}
          </React.Fragment>
        ))}
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
  roundDivbgColor: PropTypes.string,
  footerItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      textColor: PropTypes.string.isRequired,
      spanColor: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default GridItem;
