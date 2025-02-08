import { useContext, useState } from "react";
import "./ShowUser.css";
import UserContext from "../../../context/userContext";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/Pagination/Pagination";
import SearchContext from "../../../context/searchContext";
import { quizDetails } from "../../../utils/helper/user/quizDetails";
import Button from "../../../components/Button/Button";
import { MdDeleteForever } from "react-icons/md";
import { TbLockOff, TbLockOpen2 } from "react-icons/tb";
import Modal from "../../../components/Modal/Modal";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/config/firebase";
import { toast } from "react-toastify";

const ShowUser = () => {
  const { users, isLoading, loadUsers } = useContext(UserContext);
  const { searchResults } = useContext(SearchContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(users, "Users");

  const computedScores = quizDetails(users);

  // Merge the Computed Total Score with Original User Data //
  const usersWithTotalScore = users.map((user) => {
    const computed = computedScores.find((item) => item.userName === user.name);

    return { ...user, totalScore: computed?.totalScore || 0 };
  });

  const filteredUsers = usersWithTotalScore.filter(
    (user) => user.role !== "admin"
  );
  const displayUsers = searchResults.length > 0 ? searchResults : filteredUsers;

  const handleConfirmation = (userId, type) => {
    setSelectedUser(userId);
    setActionType(type);
    setIsModalOpen(true);
  };

  const executeAction = async () => {
    if (actionType === "delete") {
      await handleUserDelete(selectedUser);
    } else {
      const user = users.find((u) => u.id === selectedUser);
      await handleUserBlockUnblock(selectedUser, user?.isBlocked);
    }
    setIsModalOpen(false);
    loadUsers()
  };

  const handleUserDelete = async (userId) => {
    console.log(userId, "Delete User");
    try {
      await deleteDoc(doc(db, "users", userId));
      toast.success("User successfully deleted.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Block or unblock user
  const handleUserBlockUnblock = async (userId, isBlocked) => {
    try {
      console.log(userId, isBlocked);

      await updateDoc(doc(db, "users", userId), {
        isBlocked: !isBlocked,
      });
      toast.success(`User ${isBlocked ? 'Unblocked' : 'Blocked' }`);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (isLoading) {
    return (
      <div
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
    <div className="show-user-container">
      <div className="title">
        <h3>User Details</h3>
      </div>
      <section className="info">
        <article className="question">
          {displayUsers.length > 0 ? (
            <table border="1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                    <td>{user.totalScore}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => handleConfirmation(user.id, "delete")}
                        >
                          <MdDeleteForever size={20} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => handleConfirmation(user.id, "block")}
                        >
                          {user.isBlocked ? (
                            <TbLockOpen2 size={20} />
                          ) : (
                            <TbLockOff size={20} />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found</p>
          )}
        </article>
        {/* <Pagination /> */}
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>
          Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
        </h3>
        <p>
          Are you sure you want to {actionType} this user?
          {actionType === "block" &&
            selectedUser?.isBlocked &&
            " (This will unblock)"}
        </p>
        <div style={{ display: "flex", gap: "15px" }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" size="small" onClick={executeAction}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ShowUser;
