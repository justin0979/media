import { useEffect, useState, useCallback } from "react";
import { SerializedError, AsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  UsersType,
  UsersState,
  fetchUsers,
  addUser,
} from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

type RequestError = SerializedError | null;

function useThunk(thunk: AsyncThunk<UsersType[], void, any>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RequestError>(null);
  const dispatch = useDispatch<AppDispatch>();

  /*
   *  Function to run the thunk, dispatch it and update the loading state
   *  and the error state.
   */
  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err: SerializedError) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);

  /*
   *  Without `as const`, will give following errors:
   *   "TS2349: This expression is not callable. Not all constituents of type
   *   'boolean | SerialziedError | (() => void)' are callable."
   *  "TS2721: Cannot invoke an object which is possible 'null'."
   *  see https://www.github.com/microsoft/TypeScript/issues/35423
   *  see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
   */
  return [runThunk, isLoading, error] as const;
}

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] =
    useState<RequestError>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: { users: UsersState }) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

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
