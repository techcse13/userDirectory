import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDetail from "./components/userDetails";
import UsersList from "./components/users";

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => setUserData(result));
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<UsersList users={userData} />} />
          <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
