export const getCurrentUserId = () => {
  return JSON.parse(localStorage.getItem("user") as string)._id;
};
