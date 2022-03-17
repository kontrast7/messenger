import { Dispatch } from "react";
import { AxiosError } from "axios";
import { errorMessageType } from "../bll/redcuer/appReducer";
import { changeStatusType } from "../bll/redcuer/appReducer";
import { errorMessageAC } from "../bll/redcuer/appReducer";
import { changeStatus } from "../bll/redcuer/appReducer";

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
