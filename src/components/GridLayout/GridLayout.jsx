import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import useResizeObserver from "./useResizeObserver";
import "./GridLayout.css";
import { ImUsers } from "react-icons/im";
import { MdOutlineScore, MdOutlineQuiz } from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import GridItem from "./GridItem";
import PropTypes from "prop-types";
import { useContext } from "react";
import QuizzesContext from "../../context/quizzesContext";

const GridLayout = ({ quizzesLength, members }) => {
  const {isRegularQuizzes, isDailyQuizzes}=useContext(QuizzesContext)
  const [ref, size] = useResizeObserver();

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
      >
        <div key="1">
          <GridItem
            title="Number of users"
            value={members}
            subtext="Users"
            Icon={ImUsers}
            containerClass="grid-layout"
            titleContainerClass="grid-title-container-1"
            bgColor='#6495ED'
            footerTitil_1={'RQU'}
            footerTitil_2={'DQU'}
          />
        </div>

        <div key="2">
          <GridItem
            title="Total Winners"
            value={0}
            subtext="Winners"
            Icon={GiPodiumWinner}
            containerClass="grid-layout"
            titleContainerClass="grid-title-container-3"
            bgColor="tomato"
            footerTitil_1={'RQW'}
            footerTitil_2={'DQW'}
          />
        </div>

        <div key="3">
          <GridItem
            title="Quizzes"
            value={quizzesLength}
            subtext="Quizzes"
            Icon={MdOutlineQuiz}
            containerClass="grid-layout"
            titleContainerClass="grid-title-container-4"
            bgColor='#8e44ad'
            footerTitil_1={'Regular Quizzes'}
            footerTitil_2={'Daily Quizzez'}
            countDailyQuiz={isDailyQuizzes.length}
            countRegularQuiz={isRegularQuizzes.length}
          />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

GridLayout.propTypes = {
  quizzesLength: PropTypes.number,
  members: PropTypes.number,
};

export default GridLayout;
