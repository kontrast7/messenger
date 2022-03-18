//@ts-ignore
import s from "./styles/pageNotFound.module.css";

export const PageNotFound = () => {
  return (
    <section id={s.notfound}>
      <div className={s.notfound}>
        <div className={s.notfound_404}>
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
      </div>
    </section>
  );
};
