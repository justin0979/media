import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { UsersType, removeUser } from "../store";
import { useThunk } from "../hooks";

interface UsersListItemProps {
  user: UsersType;
}

function UsersListItem({ user }: UsersListItemProps) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser, user);

  const handleClick = () => {
    doRemoveUser();
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <Button loading={isLoading} onClick={handleClick}>
          <GoTrashcan />
        </Button>
        {error && <div>Error deleting user.</div>}
        {user.name}
      </div>
    </div>
  );
}

export default UsersListItem;