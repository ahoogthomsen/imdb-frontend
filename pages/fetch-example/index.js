import { useEffect, useState } from "react";
import styles from "./Characters.module.css";
import Toaster from "./components/Toaster/Toaster";
import CharacterListItem from "./components/CharacterListItem/CharacterListItem";
import CharacterModal from "./components/CharacterModal/CharacterModal";
import {
  addCharacter,
  deleteCharacter,
  editCharacter,
  getCharacters,
} from "./api";

export default function Characters() {
  const [data, setData] = useState([]);
  const [toaster, setToaster] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCharacters();
        setData(response.data);
      } catch (e) {
        setToaster({
          message: "Ops! Något gick fel",
          type: "error",
        });
      }
    };

    fetchData();
  }, []);

  const closeToaster = () => {
    setToaster(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCharacter(id);
      if (response.status !== 200) {
        setToaster({
          message: response.data.message,
          type: "error",
        });
        return;
      }
      setData((prevState) => prevState.filter((char) => char.id !== id));
    } catch (e) {
      setToaster({
        message: "Datan kunde inte deletas",
        type: "error",
      });
    }
  };

  const handleAddCharacter = async (name) => {
    try {
      const { data, status } = await addCharacter(name);

      if (status !== 200) {
        setToaster({ message: data.message, type: "error" });
        return;
      }

      setData((prevState) => [...prevState, data]);
    } catch (e) {
      setToaster({
        message: "An error occured when trying to add a character",
        type: "error",
      });
    }
  };

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleEditCharacter = async ({ id, name }) => {
    try {
      const { data, status } = await editCharacter({ id, name });

      if (status !== 200) {
        setToaster({
          message: data.message,
          type: "error",
        });
        return;
      }

      setData((prevState) =>
        prevState.map((char) => (char.id === id ? { ...char, ...data } : char))
      );
    } catch (e) {
      setToaster({
        message: "An error occured when trying to edit a character",
        type: "error",
      });
    }
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
