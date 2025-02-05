import React, { useContext, useEffect, useMemo, useState } from "react";
import QuizzesContext from "../../../../../context/quizzesContext";
import Loading from "../../../../../components/Loading/Loading";
import Pagination from "../../../../../components/Pagination/Pagination";

const ShowRegularQuizzes = () => {
  const { isLoading, isRegularQuizzes } = useContext(QuizzesContext);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 1;
  const totalItems = isRegularQuizzes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [isRegularQuizzes]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return isRegularQuizzes.slice(startIndex, endIndex);
  }, [currentPage, isRegularQuizzes, itemsPerPage]);

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
        {currentData.map((quiz, index) => (
          <React.Fragment key={quiz.id || index}>
            <article className="question">
              <div style={{ marginBottom: "25px" }}>
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

export default ShowRegularQuizzes;
