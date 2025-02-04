import { useContext } from "react";
import QuizzesContext from "../../../../../context/quizzesContext";
import Loading from "../../../../../components/Loading/Loading";

const ShowRegularQuizzes = () => {
  const { isLoading, setIsLoading, isRegularQuizzes } =
    useContext(QuizzesContext);

  console.log(isRegularQuizzes);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading height={"80px"} width={"80px"} color={"#fff"} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="title">
        <h3>Regular Quizzes</h3>
      </div>

      <section className="info">
        {isRegularQuizzes.map((quiz, index) => (
          <>
            <articale className="questio">
              <div key={index} style={{ marginBottom: "25px" }}>
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "solid 1px gray",
                  }}
                >
                  <p style={{ marginBottom: "0" }}>{quiz.question}</p>
                  <ul>
                    {quiz.options.map((option, ind) => (
                      <div key={`${quiz.id}-${ind}`}>
                        <p style={{ marginBottom: "0" }}>Options: {ind + 1}</p>
                        <div
                          style={{
                            backgroundColor: "lightgray",
                            padding: "5px",
                          }}
                        >
                          <li>{option}</li>
                        </div>
                      </div>
                    ))}
                    <span>Answer: {quiz.answer}</span>
                  </ul>
                </div>
              </div>
            </articale>
          </>
        ))}
      </section>
    </div>
  );
};

export default ShowRegularQuizzes;
