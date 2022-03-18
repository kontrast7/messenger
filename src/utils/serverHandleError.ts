import { Dispatch } from "react";
import { AxiosError } from "axios";
import { errorMessageType } from "../bll/reducer/appReducer";
import { changeStatusType } from "../bll/reducer/appReducer";
import { errorMessageAC } from "../bll/reducer/appReducer";
import { changeStatus } from "../bll/reducer/appReducer";

export const serverErrorHandling = (
  error: AxiosError,
  dispatch: Dispatch<errorMessageType | changeStatusType>
) => {
  const resultError = error.response
    ? error.response.data.error
    : error.message;

  dispatch(errorMessageAC(resultError));
  dispatch(changeStatus("failed"));
};
