import { ReactNode } from "react";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
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

  const header: ReactNode = (
    <>
      <Button
        className="mr-3"
        loading={isLoading}
        onClick={handleClick}
        danger
      >
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );

  return <ExpandablePanel header={header}>CONTENT</ExpandablePanel>;
}

export default UsersListItem;
