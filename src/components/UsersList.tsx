import { useEffect, useState } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, UsersState, fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

type ReqErr = SerializedError | null;

function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] =
    useState<ReqErr>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] =
    useState<ReqErr>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: { users: UsersState }) => {
    return state.users;
  });

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((err: SerializedError) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);

  if (isLoadingUsers) {
    return <Skeleton times={data.length} className="h-10 w-full" />;
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((err: SerializedError) => setCreatingUserError(err))
      .finally(() => setIsCreatingUser(false));
  };

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">User</h1>
        {isCreatingUser ? (
          "Creating User..."
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUserError && "Error creating user..."}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
