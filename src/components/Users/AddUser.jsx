import React, { useRef } from "react";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import { useState } from "react";
import Card from "../UI/Card";

const AddUser = ({ onAddUser }) => {
  const [error, setError] = useState();
  const [errorField, setErrorField] = useState();
  const usernameInputRef = useRef();
  const ageInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value.trim();
    const userAge = ageInputRef.current.value.trim();

    setErrorField(() => {
      return username.length === 0
        ? usernameInputRef.current
        : ageInputRef.current;
    });

    if (username.length === 0 || userAge.length === 0) {
      setError({
        title: "Invalid Input",
        message: `Please enter valid ${
          username.length === 0 ? "username" : "age"
        } (non-empty value)`,
      });
      return;
    }
    if (+userAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter valid Age (>0)",
      });
      return;
    }
    onAddUser({ name: username, age: userAge, key: Math.random() });
    usernameInputRef.current.value = "";
    ageInputRef.current.value = "";
    setErrorField();
    usernameInputRef.current.focus();
  };

  const clickHandler = () => {
    setError();
  };

  if (errorField) errorField.focus();

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={clickHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            ref={usernameInputRef}
          />
          <label htmlFor="age">Age(Years)</label>
          <input type="number" name="age" id="age" ref={ageInputRef} />
          <Button type={"submit"}>Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
