const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
  };

  if (notification) {
    return <div style={style}>{notification}</div>;
  } else {
    return null;
  }
};

export default Notification;
