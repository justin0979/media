import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersType } from "../../types";

const removeUser = createAsyncThunk(
  "users/remove",
  async (user: UsersType) => {
    await axios.delete(`http://localhost:3005/users/${user && user.id}`);

    /*
     *  If `response.data` is immediately returned, then the `action.payload`
     *  will be an empty object (there is no information on who is to be deleted).
     *  We will need to return the user who is to be deleted.
     */

    return user;
  },
);

export { removeUser };
