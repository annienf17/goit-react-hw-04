import { TailSpin } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <TailSpin height="100" width="100" color="#1198f8" ariaLabel="loading" />
    </div>
  );
}
