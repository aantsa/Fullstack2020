import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const user = useSelector((state) => state.authentication);

  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        <div>
          {user.user.username} logged in
          <button onClick={() => dispatch(logout())}>logout</button>
        </div>
      </Link>
    </div>
  );
};

export default Menu;
