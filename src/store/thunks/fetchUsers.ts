import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersType } from "../../types";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  // DEV ONLY
  await pause(1000);

  return response.data as UsersType[];
});

// DEV ONLY
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
