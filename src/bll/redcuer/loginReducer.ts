const initState: initStatePropsType = {
  string: "String",
};

export const loginReducer = (state = initState, action: ActionType) => {
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
