export const onEnterPress = (e: any, callback: () => void) => {
  if (e.key === "Enter") {
    callback();
  }
};
