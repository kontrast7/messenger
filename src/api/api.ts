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
  getUserFriendsById: (id: string) => {
    return instance.get(`/users/friends/${id}`);
  },
  searchUsersByName: (name: string) => {
    return instance.get(`/users?username=${name}`);
  },
  getUserById: (id: string) => {
    return instance.get(`/users?userId=${id}`);
  },
  followUnFollowUser: (
    id: string,
    action: "follow" | "unfollow",
    userId: string
  ) => {
    return instance.put(`/users/${id}/${action}`, { userId });
  },
};

export const chatRoomsApi = {
  createChatRoom: (payload: any) => {
    return instance.post(`/conversations/`, { ...payload });
  },
  goToChatRoom: (idCurrentUser: string, idOtherUser: string) => {
    return instance.get(`/conversations/find/${idCurrentUser}/${idOtherUser}`);
  },
};

export const messagesApi = {
  getMessagesByChatId: (id: string) => {
    return instance.get(`/messages/${id}`);
  },
  sendMessage: (payload: sendMessageType) => {
    return instance.post(`/messages`, {...payload})
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
export type sendMessageType = {
  conversationId: string,
  sender: string,
  text: string
}
