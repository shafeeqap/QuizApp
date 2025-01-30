import { useContext } from "react";
import "./ShowUser.css";
import UserContext from "../../../context/userContext";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/Pagination/Pagination";
import SearchContext from "../../../context/searchContext";

const ShowUser = () => {
  const { users, isLoading } = useContext(UserContext);
  const { searchResults } = useContext(SearchContext);

  const filteredUsers = users.filter((user) => user.role !== "admin");
  const displayUsers = searchResults.length > 0 ? searchResults : filteredUsers;
console.log(users, 'users');


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
                    <td>{user.scores}</td>
                    <td>
                      <p>Delete</p>
                      {/* <p>Block</p> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found</p>
          )}
        </article>
        <Pagination />
      </section>
    </div>
  );
};

export default ShowUser;
