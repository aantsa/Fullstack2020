import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  const style = {
    color: message.type === "alert" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!message.text) {
    return null;
  }

  return <div style={style}>{message.text}</div>;
};

export default Notification;
