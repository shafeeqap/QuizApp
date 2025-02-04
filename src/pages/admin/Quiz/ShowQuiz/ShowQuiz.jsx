import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAddCircle, MdModeEdit, MdDelete } from "react-icons/md";
import Pagination from "../../../../components/Pagination/Pagination";
import "./ShowQuiz.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../utils/config/firebase";
import { formatTime } from "../../../../utils/formatTime/formatTime.JS";
import Loading from "../../../../components/Loading/Loading";
import Modal from "../../../../components/Modal/Modal";
import Button from "../../../../components/Button/Button";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import NoData from "../../../../components/NoDataFound/NoDataFound";
import Tooltipp from "../../../../components/Tooltipp/Tooltipp";
import QuizzesContext from "../../../../context/quizzesContext";

const ShowQuiz = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 1;

  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const { isLoading, fetchedQuizzes, setFetchedQuizzes } =
    useContext(QuizzesContext);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = currentPage * recordsPerPage;
    setData(fetchedQuizzes.slice(startIndex, endIndex));
  }, [currentPage, fetchedQuizzes]);

  const totalPages = Math.ceil(fetchedQuizzes.length / recordsPerPage);

  const deleteQuiz = async () => {
    if (!quizIdToDelete) {
      return;
    }
    await deleteDoc(doc(db, "quizzes", quizIdToDelete));
    setFetchedQuizzes(
      fetchedQuizzes.filter((quiz) => quiz.id !== quizIdToDelete)
    );
    toast.success("You successfully deleted.");
    setDeleteQuestion(false);
    setQuizIdToDelete(null);
  };

  const openDeletModal = (id) => {
    setDeleteQuestion(true);
    setQuizIdToDelete(id);
  };

  const closeDeleteModal = () => {
    setDeleteQuestion(false);
    setQuizIdToDelete(null);
  };
  if (isLoading) {
    return (
      <div className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading height={"80px"} width={"80px"} color={"#fff"} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="btn-container">
        <Tooltipp text={"Add Quiz"}>
          <Link to="/add-quiz" className="add-btn">
            <MdAddCircle size={25} />
          </Link>
        </Tooltipp>
      </div>
      {data.length > 0 ? (
        <>
          <div className="title">
            <h3>Quiz Details</h3>
          </div>

          <section className="info">
            {data.map((quiz, index) => (
              <article key={quiz.id} className="question">
                <div className="edit-delete-container">
                  <Tooltipp text={"Delete Quiz"}>
                    <MdDelete
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => openDeletModal(quiz.id)}
                    />
                  </Tooltipp>
                  <Tooltipp text={"Edit Quiz"}>
                    <Link to={`/edit-quiz?id=${quiz.id}`} className="add-btn">
                      <MdModeEdit size={20} />
                    </Link>
                  </Tooltipp>
                </div>
                <div className="quiz-type">
                  <p>
                    Quiz Type:{" "}
                    <span
                      style={{
                        color: quiz.isDailyQuiz === true ? "green" : "red",
                      }}
                    >
                      {quiz.isDailyQuiz === true
                        ? "Daily Quiz"
                        : "Regular Quiz"}
                    </span>
                  </p>
                  <p>
                    Added On: <span>{formatTime(quiz?.createdAt)}</span>
                  </p>
                </div>
                {quiz.isDailyQuiz === true && (
                  <div className="start-end-time">
                    <p>
                      Start Time: <span>{formatTime(quiz?.startTime)}</span>
                    </p>
                    <p>
                      End Time: <span>{formatTime(quiz?.endTime)}</span>
                    </p>
                  </div>
                )}

                <p style={{ fontWeight: "bold" }}>
                  Question {index + 1 + (currentPage - 1) * recordsPerPage}:
                  <span style={{ fontWeight: "normal" }}> {quiz.question}</span>
                </p>
                <ul>
                  {quiz.options.map((option, idx) => (
                    <div key={`${quiz.id}-${idx}`}>
                      <p>Option: {idx + 1}</p>
                      <div className="option">
                        <li>{option}</li>
                      </div>
                    </div>
                  ))}

                  <div className="answer-wrapper">
                    <span>Answer: {quiz.answer}</span>
                  </div>
                </ul>
              </article>
            ))}
          </section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div>
          <NoData message="No quizzes available" />
        </div>
      )}

      <Modal isOpen={deleteQuestion} onClose={closeDeleteModal}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <TiDeleteOutline size={150} color="red" />
            <h3>Are you sure?</h3>
            <p>
              Do you really want to delete these records? This process
              can&apos;t be undone.
            </p>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <Button variant="secondary" size="small" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" size="small" onClick={deleteQuiz}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowQuiz;
