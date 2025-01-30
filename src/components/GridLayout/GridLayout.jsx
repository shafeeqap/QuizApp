import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import useResizeObserver from "./useResizeObserver";
import "./GridLayout.css";

const GridLayout = () => {
  const [ref, size] = useResizeObserver();

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 };

  const layouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 3, h: 2 },
      { i: "2", x: 3, y: 0, w: 3, h: 2 },
      { i: "3", x: 6, y: 0, w: 3, h: 2 },
    ],
    md: [
      { i: "1", x: 0, y: 0, w: 4, h: 2 },
      { i: "2", x: 4, y: 0, w: 4, h: 2 },
      { i: "3", x: 8, y: 0, w: 2, h: 2 },
    ],
    sm: [
      { i: "1", x: 0, y: 0, w: 6, h: 2 },
      { i: "2", x: 0, y: 2, w: 6, h: 2 },
      { i: "3", x: 0, y: 4, w: 6, h: 2 },
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
      >
        <div key="1" className="grid-layout">
          <p className="title" style={{ textTransform: "uppercase" }}>
            Number of users
          </p>
          <span>3+K Members</span>
        </div>
        <div key="2" className="grid-layout">
          Users scores
        </div>
        <div key="3" className="grid-layout">
          Total Winners
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayout;
