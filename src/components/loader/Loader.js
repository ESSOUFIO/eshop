import React from "react";
import styles from "./Loader.module.scss";
import loadingImg from "../../asset/loader3.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loadingImg} alt="Loading..." width={70} />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
