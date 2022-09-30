import { useSelector } from "react-redux";
import User from "./User";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import Menu from "./Menu";

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  return (
    <div>
      <Menu />
      <h2>Users</h2>
      <User users={users} />
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to bloglist
      </button>
    </div>
  );
};

export default UserList;
