const initState: initStatePropsType = {
  string: "string",
};

export const registerReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Types

type initStatePropsType = {
  string: string;
};

type ActionType = any;
