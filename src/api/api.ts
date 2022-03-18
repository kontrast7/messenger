import axios from "axios";

const instance = axios.create({
  baseURL: "https://socialmess.herokuapp.com/api",
});

export const authApi = {
  registerUser: (payload: registerUserType) => {
    return instance.post("/auth/register", { ...payload });
  },
  loginUser: (payload: loginUserType) => {
    return instance.post("/auth/login", { ...payload });
  },
};

export const usersApi = {
  getAllUsers: (myid: string) => {
    return instance.get(`/users/all/${myid}`);
  },
  getUserByNameOrId: (name: string) => {
    return instance.get(`/users?name=${name}`);
  },
  getUserFriendsById: (id: string) => {
    return instance.get(`/users/friends/${id}`);
  },
  searchUsersByName: (name: string) => {
    return instance.get(`/users?username=${name}`);
  },
  followUnFollowUser: (id: string, action: "follow" | "unfollow", userId: string) => {
    return instance.put(`/users/${id}/${action}`, {userId})
  }
};

export type registerUserType = {
  username: string;
  email: string;
  password: string;
};

export type loginUserType = {
  email: string;
  password: string;
};
