export const getCurrentUserId = () => {
  return (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") as string)._id
  );
};
export const getCurrentUser = () => {
  return (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") as string)
  );
};
