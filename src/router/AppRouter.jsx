import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Quizzes from "../components/Quizzes/Quizzes";
import AdminLogin from "../pages/auth/AdminLogin/AdminLogin";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import RegisterUser from "../pages/auth/RegisterUser/RegisterUser";
import ShowUser from "../pages/admin/User/ShowUser";
import ShowScore from "../pages/admin/Score/ShowScore";
import ShowQuiz from "../pages/admin/Quiz/ShowQuiz/ShowQuiz";
import AddQuiz from "../pages/admin/Quiz/AddQuiz/AddQuiz";
import EditQuiz from "../pages/admin/Quiz/EditQuiz/EditQuiz";
import ProtectRoute from "../components/ProtectRoute/ProtectRoute";
import UserLogin from "../pages/auth/UserLogin/UserLogin";
import Profile from "../components/Profile/Profile";
import Layout from "../components/Layout/Layout";
import DailyQuizzes from "../components/Quizzes/DailyQuizzes/DailyQuizzes";



// Layout with Header and Footer
const LayoutHeaderFooter = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* Routes with Layout */}
        <Route element={<LayoutHeaderFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/daily-quizzes" element={<DailyQuizzes />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/dashboard"
            element={
              <ProtectRoute>
                <Dashboard />
              </ProtectRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectRoute>
                <ShowUser />
              </ProtectRoute>
            }
          />
          <Route
            path="/show-quizzes"
            element={
              <ProtectRoute>
                <ShowQuiz />
              </ProtectRoute>
            }
          />
          <Route
            path="/add-quiz"
            element={
              <ProtectRoute>
                <AddQuiz />
              </ProtectRoute>
            }
          />
          <Route
            path="/edit-quiz"
            element={
              <ProtectRoute>
                <EditQuiz />
              </ProtectRoute>
            }
          />
          <Route
            path="/score"
            element={
              <ProtectRoute>
                <ShowScore />
              </ProtectRoute>
            }
          />
        </Route>

        {/* Not Found Route */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
