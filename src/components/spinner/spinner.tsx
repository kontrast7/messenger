import React from "react";
// @ts-ignore
import s from "./styles/spinner.module.css";

export const Spinner = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
