import GridLayout from "../../components/GridLayout/GridLayout";
import "./Dashboard.css";
import { DashboardItems } from "./DashboardItems";

const Dashboard = () => {
  const { quizzesLength, members, countDailyQuiz, countRegularQuiz } =
    DashboardItems();

  return (
    <>
      <div className="dashboard-container">
        <GridLayout
          quizzesLength={quizzesLength}
          members={members}
          countDailyQuiz={countDailyQuiz}
          countRegularQuiz={countRegularQuiz}
        />
      </div>
    </>
  );
};

export default Dashboard;
