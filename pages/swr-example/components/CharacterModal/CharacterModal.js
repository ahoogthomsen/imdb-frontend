import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./CharacterModal.module.css";

const CharacterModal = ({ onSubmit, onClose, characterName, isLoading }) => {
  const [name, setName] = useState(characterName ?? "");
  const submitHandler = async (event) => {
    event.preventDefault();

    await onSubmit(name);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <form
        className={styles.modal}
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
      >
        <label>Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">
            {isLoading ? "Is Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CharacterModal;
