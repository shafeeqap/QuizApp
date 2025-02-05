import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import useResizeObserver from "./useResizeObserver";
import "./GridLayout.css";
import GridItem from "./GridItem";
import PropTypes from "prop-types";
import { GridItemData } from "./GridItemData";

const GridLayout = () => {
  const [ref, size] = useResizeObserver();
  const { item_data } = GridItemData();

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 };

  const layouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 3, h: 2 },
      { i: "2", x: 3, y: 0, w: 3, h: 2 },
      { i: "3", x: 6, y: 0, w: 3, h: 2 },
      { i: "4", x: 0, y: 0, w: 3, h: 2 },
    ],
    md: [
      { i: "1", x: 0, y: 0, w: 4, h: 2 },
      { i: "2", x: 4, y: 0, w: 4, h: 2 },
      { i: "3", x: 8, y: 0, w: 2, h: 2 },
      { i: "4", x: 0, y: 0, w: 2, h: 2 },
    ],
    sm: [
      { i: "1", x: 1, y: 0, w: 6, h: 2 },
      { i: "2", x: 1, y: 2, w: 6, h: 2 },
      { i: "3", x: 1, y: 4, w: 6, h: 2 },
      { i: "4", x: 0, y: 0, w: 6, h: 2 },
    ],
  };

  const onLayoutChange = (currentLayout, allLayouts) => {
    console.log("Updated layouts: ", allLayouts);
    localStorage.setItem("gridLayouts", JSON.stringify(allLayouts));
  };

  return (
    <div className="grid-wrapper" ref={ref}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={100}
        width={size.width || 1200}
        onLayoutChange={onLayoutChange}
        draggableCancel=".no-drag"
      >
        {item_data.map((item) => (
          <div key={item.key}>
            <GridItem
              title={item.title}
              value={item.value}
              roundDivbgColor={item.roundDivbgColor}
              path={item.path}
              subtext={item.subtext}
              Icon={item.Icon}
              containerClass="grid-layout"
              titleContainerClass={item.titleContainerClass}
              footerItems={item.footerItems}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

GridLayout.propTypes = {
  quizzesLength: PropTypes.number,
  members: PropTypes.number,
};

export default GridLayout;
