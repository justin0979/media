import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersType } from "../slices";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");
  return response.data as UsersType[];
});

export { fetchUsers };
