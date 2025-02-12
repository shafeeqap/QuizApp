import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import card_image from "../../assets/images/card_image.jpg";
import coming_soon from "../../assets/images/coming_soon.jpg";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import QuizzesContext from "../../context/quizzesContext";
import { checkQuizAvailability } from "../../utils/validation/checkQuizAvailability";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import UserContext from "../../context/userContext";

const Home = () => {
  const { isLoading, isDailyQuizzes, setIsLoading } =
    useContext(QuizzesContext);
  const { user } = useContext(UserContext);
  const [regularQuizStarted, setRegularQuizStarted] = useState(false);
  const [dailyQuizStarted, setDailyQuizStarted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (regularQuizStarted) {
      navigate("/quizzes");
    }
  }, [regularQuizStarted, navigate]);

  useEffect(() => {
    if (dailyQuizStarted) {
      navigate("/daily-quizzes");
    }
  }, [dailyQuizStarted, navigate]);

  const handleStartRegularQuiz = () => {
    setIsLoading(true);
    setRegularQuizStarted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleStartDailyQuiz = () => {
    if (
      !isDailyQuizzes ||
      !Array.isArray(isDailyQuizzes) ||
      isDailyQuizzes.length === 0
    ) {
      toast.warning("No quizzes available at the moment.");
      return;
    }

    const { isAvailable, message } = checkQuizAvailability(
      isDailyQuizzes,
      user
    );
    toast.warning(message);

    if (isAvailable) {
      setIsLoading(true);
      setDailyQuizStarted(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="title-container">
          <h2>Welcome to the Quiz App!</h2>
          <p>Take quizzes and improve your knowledge!</p>
        </div>

        {/* Quiz card will update dynamically */}
        <div className="card-wraper">
          <Card
            title={"Regular Quiz"}
            description={"A quick challeng to test your knowledge"}
            image={card_image}
          >
            <Button variant="secondary" onClick={handleStartRegularQuiz}>
              {" "}
              {isLoading ? (
                <Loading height={"40px"} width={"40px"} color={"#fff"} />
              ) : (
                "Start Quiz"
              )}
            </Button>
          </Card>

          {isDailyQuizzes.length > 0 ? (
            <Card
              title={"Daily Quiz"}
              description={"A quick challeng to test your knowledge"}
              image={card_image}
              isDailyQuiz={isDailyQuizzes}
            >
              <Button variant="secondary" onClick={handleStartDailyQuiz}>
                {isLoading ? (
                  <Loading height={"40px"} width={"40px"} color={"#fff"} />
                ) : (
                  "Start Quiz"
                )}
              </Button>
            </Card>
          ) : (
            <Card
              title={"Daily Quiz"}
              description={"A quick challeng to test your knowledge"}
              image={coming_soon}
            >
              <h4 style={{ color: "white", fontSize: "27px" }}>
                Coming Soon...
              </h4>
            </Card>
          )}
          <Card
            title={"Choose Your Quiz"}
            description={"A quick challeng to test your knowledge"}
            image={card_image}
            onClick={handleStartRegularQuiz}
            buttonText={"Start Quiz"}
          >
            {" "}
            <Button variant="secondary" onClick={handleStartRegularQuiz}>
              {" "}
              {isLoading ? (
                <Loading height={"40px"} width={"40px"} color={"#fff"} />
              ) : (
                "Start Quiz"
              )}
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
