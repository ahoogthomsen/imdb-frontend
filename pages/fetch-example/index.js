import { useState } from "react";
import styles from "./Characters.module.css";
import Toaster from "./components/Toaster/Toaster";
import CharacterListItem from "./components/CharacterListItem/CharacterListItem";
import CharacterModal from "./components/CharacterModal/CharacterModal";
import { charactersData } from "./charactersData";

export default function Characters() {
  const [data, setData] = useState(charactersData);
  const [toaster, setToaster] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeToaster = () => {
    setToaster(null);
  };

  const handleDelete = async (id) => {
    setData((prevState) => prevState.filter((char) => char.id !== id));
  };

  const handleAddCharacter = async (name) => {
    const randomId = Math.floor(Math.random() * 100);
    const newData = { id: randomId, name };
    setData((prevState) => [...prevState, newData]);
  };

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleEditCharacter = async ({ id, name }) => {
    const editedData = { id, name };
    setData((prevState) =>
      prevState.map((char) =>
        char.id === id ? { ...char, ...editedData } : char
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Characters</h1>

      <button className={styles.addNewCharacter} onClick={handleToggleModal}>
        Add new character
      </button>

      <ul className={styles.characterList}>
        {data?.map((char) => {
          return (
            <CharacterListItem
              id={char.id}
              key={char.id}
              name={char.name}
              onDelete={() => handleDelete(char.id)}
              onEdit={handleEditCharacter}
            />
          );
        })}
      </ul>
      {toaster && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={closeToaster}
        />
      )}
      {isOpen && (
        <CharacterModal
          onClose={handleToggleModal}
          onSubmit={handleAddCharacter}
        />
      )}
    </div>
  );
}
