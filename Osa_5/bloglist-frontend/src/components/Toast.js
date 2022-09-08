import React from "react";

const Toast = ({ notification} ) => {
  if (notification === null) return null;

  if (notification?.error) {
    return <div className="error">{notification?.message}</div>;
  }

  return <div className="success">{notification?.message}</div>;
};

export default Toast;
