const initState: InitStateTypes = {
  theme: localStorage.getItem("theme") || "dark",
  isLoggedIn: !!localStorage.getItem("user"),
  isRegistered: false,
  errorMessage: null,
  isInitialized: false,
  status: "idle",
};

export const appReducer = (
  state = initState,
  action: ActionTypes
): InitStateTypes => {
  switch (action.type) {
    case "AUTH/LOGIN/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "APP/ERROR/MESSAGE":
      return { ...state, errorMessage: action.value };
    case "APP/STATUS/CHANGE-STATUS":
      return { ...state, status: action.value };
    case "APP/CHANGE-INITIALIZED":
      return { ...state, isInitialized: action.value };
    case "APP/CHANGE-THEME": {
      return {
        ...state,
        theme: action.value,
      };
    }
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "AUTH/LOGIN/SET-IS-LOGGED-IN", value } as const);

export const setIsRegisteredInAC = (value: boolean) =>
  ({ type: "AUTH/REGISTERED/SET-IS-REGISTERED-IN", value } as const);

export const errorMessageAC = (value: string | null) =>
  ({ type: "APP/ERROR/MESSAGE", value } as const);

export const changeStatus = (value: PendingStatusType) =>
  ({ type: "APP/STATUS/CHANGE-STATUS", value } as const);

export const changeInitialized = (value: boolean) =>
  ({ type: "APP/CHANGE-INITIALIZED", value } as const);

export const changeThemeAC = (value: string) =>
  ({ type: "APP/CHANGE-THEME", value } as const);

// Thunk

// Types
type ActionTypes =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof changeInitialized>
  | ReturnType<typeof setIsRegisteredInAC>
  | changeStatusType
  | errorMessageType
  | changeThemeType;

export type changeStatusType = ReturnType<typeof changeStatus>;
export type errorMessageType = ReturnType<typeof errorMessageAC>;
export type changeThemeType = ReturnType<typeof changeThemeAC>;

export type PendingStatusType = "idle" | "failed" | "completed" | "loading";





type InitStateTypes = {
  theme: string;
  isLoggedIn: boolean;
  isRegistered: boolean;
  errorMessage: string | null;
  status: PendingStatusType;
  isInitialized: boolean;
};
