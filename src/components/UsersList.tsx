import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, fetchUsers } from "../store";

function UsersList() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h1>Users List</h1>
    </div>
  );
}

export default UsersList;
