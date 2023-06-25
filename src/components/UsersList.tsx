import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, UsersState, fetchUsers } from "../store";

function UsersList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, data } = useSelector(
    (state: { users: UsersState }) => {
      return state.users;
    },
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  return (
    <div>
      <h1>Users List</h1>
      {data.length}
    </div>
  );
}

export default UsersList;
