import { useEffect } from "react";
//@ts-ignore
import s from "./styles/snackbar.module.css";

export const Snackbar = ({
  open,
  autoHideDuration,
  onClose,
  error,
}: SnackbarPropsType) => {
  useEffect(() => {
    open &&
      setTimeout(() => {
        onCloseCallback();
      }, autoHideDuration);
  }, [open]);

  const onCloseCallback = () => {
    return onClose();
  };

  return (
    <>
      {open && (
        <div className={`${s.snackbar} ${s.show}`}>
          <p>{error}</p>
          <button className={s.close} onClick={onCloseCallback}>
            +
          </button>
        </div>
      )}
    </>
  );
};

// Types

type SnackbarPropsType = {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  error: string;
  type?: string;
};
