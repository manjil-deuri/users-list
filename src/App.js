import React from "react";
import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, SetUsersList] = useState([]);

  const addUserHandler = (user) => {
    SetUsersList((prevUsers) => {
      return [...prevUsers, user];
    }) 
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler}/>
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
