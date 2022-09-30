import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import Menu from "./Menu";

const UserProfile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  let { id } = useParams();
  const user = users.find((x) => x.id === id);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) return null;

  return (
    <div>
      <Menu />
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate("/users");
        }}
      >
        Back to list of users
      </button>
    </div>
  );
};

export default UserProfile;
