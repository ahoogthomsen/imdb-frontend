import { useEffect, useState } from "react";
import styles from "./Characters.module.css";
import Toaster from "./components/Toaster/Toaster";
import CharacterListItem from "./components/CharacterListItem/CharacterListItem";
import CharacterModal from "./components/CharacterModal/CharacterModal";

export default function Characters() {
  const [data, setData] = useState([]);
  const [toaster, setToaster] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/characters?apiKey=5", {
          method: "GET",
        });

        const data = await res.json();
        setData(data);
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
      const res = await fetch(
        `http://localhost:3001/characters/${id}?apiKey=5`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (res.status !== 200) {
        setToaster({
          message: data.message,
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
      const res = await fetch("http://localhost:3001/characters?apiKey=5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ character: { name } }),
      });

      const data = await res.json();

      if (res.status !== 200) {
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
      const res = await fetch(
        `http://localhost:3001/characters/${id}?apiKey=5`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ character: { id, name } }),
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
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
