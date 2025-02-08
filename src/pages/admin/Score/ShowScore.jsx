import { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../../context/userContext";
import Pagination from "../../../components/Pagination/Pagination";
import "./ShowScore.css";
import { totalScore } from "../../../utils/helper/user/totalScore";

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

  const usersWithTotalScore = totalScore(currentData);

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
