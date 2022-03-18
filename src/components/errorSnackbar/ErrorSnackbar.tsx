import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "../snackbar/Snackbar";
import { RootAppStateType } from "../../bll/redux/store"
import { errorMessageAC } from "../../bll/reducer/appReducer"

export const ErrorSnackbar = () => {
  const error = useSelector<RootAppStateType, string | null>(
    (state) => state.app.errorMessage
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(errorMessageAC(null));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={3000}
      onClose={handleClose}
      error={error ? error : ""}
    />
  );
};
