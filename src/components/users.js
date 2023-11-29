import React from "react";
import { Link, useParams } from "react-router-dom";
import "./users.css";

const UserList = ({ users }) => {
  const params = useParams();
  console.log("parammmm", params);
  return (
    <div className="UserList_Containers">
      <h2>User Directory</h2>

      {users.map((user) => (
        <ul className="user-list">
          <li key={user.id} className="user-list-box">
            <Link to={`/user/${user.id}`}>
              <div>Name: {user.name}</div>
              {/* number of post is not given in USER API*/}
              <div>Post: 1</div>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default UserList;
