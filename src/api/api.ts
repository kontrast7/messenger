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
  updateUser: (payload: updateUserType) => {
    return instance.put(`/users/${payload.userId}`, { ...payload });
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
    return instance.post(`/messages`, { ...payload });
  },
  deleteMessage: ({ idMessage, userId }: deleteMessageType) => {
    return instance.delete(`/messages/delete/${idMessage}`, {
      data: { userId },
    });
  },
};

export const postsApi = {
  getPostsByName: (username: string) => {
    return instance.get(`/posts/profile/${username}`);
  },
  createNewPosts: (payload: createNewPostsType) => {
    return instance.post(`/posts/`, { ...payload });
  },
  editPost: (payload: createNewPostsType, idPost: string) => {
    return instance.put(`/posts/${idPost}`, { ...payload });
  },
  getTimeLinePosts: (id: string) => {
    return instance.get(`/posts/timeline/${id}`);
  },
  deletePost: (idPost: string, payload: deletePostType) => {
    return instance.delete(`/posts/${idPost}`, { data: { ...payload } });
  },
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
  conversationId: string;
  sender: string;
  text: string;
};
export type updateUserType = {
  username?: string;
  profilePicture?: any;
  desc?: string;
  city?: string;
  userId: string;
};
export type createNewPostsType = {
  userId: string;
  desc?: string;
  img?: any;
};
export type deletePostType = {
  userId: string;
};

export type deleteMessageType = {
  idMessage: string;
  userId: string;
  chatroomId: string;
};
