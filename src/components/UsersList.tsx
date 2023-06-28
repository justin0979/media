import { useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { UsersState, fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";
import { useThunk } from "../hooks";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(
    fetchUsers,
    null,
  );
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(
    addUser,
    null,
  );

  const { data } = useSelector((state: { users: UsersState }) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  let content: ReactNode;
  if (isLoadingUsers) {
    content = <Skeleton times={data.length} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  const handleUserAdd = () => {
    doCreateUser();
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">User</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "Error creating user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
