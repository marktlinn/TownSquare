import { createSlice } from "@reduxjs/toolkit";
import { INIT_USER_STATE } from "../../types";
type DataObj = INIT_USER_STATE[];

const INITIAL_STATE: DataObj = [];

export const followedSlice = createSlice({
  name: "followingData",
  initialState: INITIAL_STATE,
  reducers: {
    setFollowedUsers: (state, action) => {
      return action.payload;
    },
    resetFollowers: state => {
      return [];
    },
  },
});

export const { setFollowedUsers, resetFollowers } = followedSlice.actions;

export default followedSlice.reducer;

export const followed = (state: DataObj[]) => state;
