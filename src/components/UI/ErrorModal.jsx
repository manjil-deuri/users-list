import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  const Backdrop = () => <div className={classes.backdrop} />;
  const ModalLayout = () => {
    return (
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button type={"button"} onClick={props.onConfirm}>
            Okay
          </Button>
        </footer>
      </Card>
    );
  };
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalLayout onConfirm = {props.onConfirm} title = {props.title} message={props.message}/>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
