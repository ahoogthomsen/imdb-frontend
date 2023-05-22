import { useState } from "react";
import styles from "./CharacterListItem.module.css";
import CharacterModal from "../CharacterModal/CharacterModal";

export default function CharacterListItem({ id, name, onDelete, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOnEdit = (name) => {
    onEdit({ id, name });
  };

  return (
    <>
      <li className={styles.container}>
        <div className={styles.content}>
          <h2>{name}</h2>
        </div>
        <div className={styles.buttonSection}>
          <button onClick={onDelete}>Delete</button>
          <button onClick={handleToggleModal}>Edit</button>
        </div>
      </li>
      {isOpen && (
        <CharacterModal
          characterName={name}
          onClose={handleToggleModal}
          onSubmit={handleOnEdit}
        />
      )}
    </>
  );
}
