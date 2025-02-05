import React, { useContext, useEffect, useMemo, useState } from "react";
import Loading from "../../../../../components/Loading/Loading";
import Pagination from "../../../../../components/Pagination/Pagination";
import QuizzesContext from "../../../../../context/quizzesContext";

const ShowDailyQuizzes = () => {
  const { isLoading, isDailyQuizzes } = useContext(QuizzesContext);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 1;
  const totalItems = isDailyQuizzes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [isDailyQuizzes]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return isDailyQuizzes.slice(startIndex, endIndex);
  }, [currentPage, isDailyQuizzes, itemsPerPage]);

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
        <h3>Daily Quizzes</h3>
      </div>

      <section className="info">
        {currentData.map((quiz, index) => (
          <React.Fragment key={quiz.id || index}>
            <article className="question">
              <div style={{ marginBottom: "25px" }}>
                <p style={{ marginBottom: "0", fontWeight: "bold" }}>
                  Question {index + 1 + (currentPage - 1) * itemsPerPage}:
                  <span style={{ fontWeight: "normal" }}> {quiz.question}</span>
                </p>
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
                  <p style={{ marginBottom: "0", fontWeight: "bold" }}>
                    Answer:
                    <span style={{ color: "green", fontWeight: "normal" }}>
                      {" "}
                      {quiz.answer}
                    </span>
                  </p>
                </ul>
              </div>
            </article>
          </React.Fragment>
        ))}
      </section>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ShowDailyQuizzes;
