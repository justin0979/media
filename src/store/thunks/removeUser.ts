import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersType } from "../slices";

const removeUser = createAsyncThunk(
  "users/remove",
  async (user: UsersType) => {
    const response = await axios.delete(
      `http://localhost:3005/users/${user.id}`,
    );

    // FIX!!!!
    return response.data;
  },
);

export { removeUser };
