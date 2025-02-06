import { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../../context/userContext";
import Pagination from "../../../components/Pagination/Pagination";
import "./ShowScore.css";

const ShowScore = () => {
  const { users } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 2;
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }, [currentPage, users, itemsPerPage]);

  const usersWithTotalScore = currentData.map((user) => {
    const { name: userName, quizResults = [] } = user;

    const totalScore = quizResults.reduce((sum, quiz) => sum + quiz.score, 0);

    const numberOfPlays = user.quizResults?.length;

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const date = quizResults.map((result) =>
      new Date(result.date).toLocaleString("en-GB", options)
    );

    const timeTaken = quizResults.map((result) => result.timeTaken);
    const score = quizResults.map((result) => result.score);

    return { userName, totalScore, numberOfPlays, timeTaken, score, date };
  });

  console.log(usersWithTotalScore, "Total score");

  return (
    <div className="container">
      <div className="title">
        <h3>Show user score</h3>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Score, Time Taken</th>
              <th>No Plays</th>
              {/* <th>Date, Time</th> */}
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {usersWithTotalScore.map((item, index) => (
              <tr key={index}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td style={{ textTransform: "capitalize" }}>{item.userName}</td>
                <td>{item.email}</td>
                <td>
                  {item.score.map((scr, idx) => (
                    <div className="time-taken" key={idx}>
                      <small style={{ marginRight: "1rem", color: "red" }}>
                        Scr: {scr}
                      </small>
                      <small style={{ color: "green" }}>
                        Taken:{" "}
                        {item.timeTaken && item.timeTaken[idx] !== undefined
                          ? item.timeTaken[idx]
                          : "N/A"}{" "}
                        sec, <br />
                      </small>
                      <small style={{ color: "#007bff" }}>
                        {item.date && item.date[idx]}
                      </small>
                    </div>
                  ))}
                </td>
                <td>{item.numberOfPlays}</td>
                <td style={{ color: "red" }}>{item.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ShowScore;
