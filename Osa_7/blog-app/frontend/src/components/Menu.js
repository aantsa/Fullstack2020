import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authReducer";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/userReducer";

const Menu = () => {
  const user = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  const padding = {
    paddingRight: 5,
  };

  const navbar = {
    backgroundColor: "#C6C8C5",
    padding: 5,
    marginBottom: 10,
  };

  return (
    <div>
      <h2>blogs</h2>
      <div style={navbar}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user?.user?.username} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>
    </div>
  );
};

export default Menu;
