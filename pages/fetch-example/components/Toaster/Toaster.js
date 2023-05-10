import React, { useEffect } from "react";
import styles from "./Toaster.module.css";

const Toaster = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);

  const toasterClass = `${styles.toaster} ${
    type === "error" ? styles.error : styles.success
  }`;

  return (
    <div className={toasterClass}>
      <p>{message}</p>
    </div>
  );
};

export default Toaster;
