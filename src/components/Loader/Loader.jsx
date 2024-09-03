import { TailSpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader">
      <TailSpin height="50" width="50" color="grey" ariaLabel="loading" />
    </div>
  );
}
