import React from "react";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import { useState } from "react";
import Card from "../UI/Card";

const initialInput = {
  age: "",
  username: "",
};

const AddUser = ({ onAddUser }) => {
  const [inputData, setInputData] = useState(initialInput);
  const [error, setError] = useState();

  const clickHandler = () => {
    setError();
  };

  const changeHandler = (name, value) => {
    setInputData((prevUserInput) => {
      return { ...prevUserInput, [name]: value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      inputData["username"].trim().length === 0 ||
      inputData["age"].trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter valid input (non-empty value)",
      });
      return;
    }
    if (+inputData["age"] < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter valid Age (>0)",
      });
      return;
    }
    onAddUser(inputData);
    setInputData(initialInput);
  };
  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={clickHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(event) =>
              changeHandler(event.target.id, event.target.value)
            }
            value={inputData["username"]}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={(event) =>
              changeHandler(event.target.id, event.target.value)
            }
            value={inputData["age"]}
          />
          <Button type={"submit"}>Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
