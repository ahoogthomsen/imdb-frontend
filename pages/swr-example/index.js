import { useState } from "react";
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

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const cacheKey = "/api/characters";

export default function Characters() {
  const { data: { data = [] } = {} } = useSWR(cacheKey, getCharacters, {
    onError: () => {
      setToaster({
        message: "Unable to fetch characters, is your server up and running?",
        type: "error",
      });
    },
  });

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    cacheKey,
    addCharacter,
    {
      onError: () => {
        setToaster({
          message: "An error occuredwhen trying to add a character",
          type: "error",
        });
      },
    }
  );
  const { trigger: editTrigger } = useSWRMutation(cacheKey, editCharacter, {
    onError: () => {
      setToaster({
        message: "An error occuredwhen trying to edit a character",
        type: "error",
      });
    },
  });

  const { trigger: deleteTrigger } = useSWRMutation(cacheKey, deleteCharacter, {
    onError: () => {
      setToaster({
        message: "An error occuredwhen trying to delete a character",
        type: "error",
      });
    },
  });

  const [toaster, setToaster] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeToaster = () => {
    setToaster(null);
  };

  const handleDelete = async (id) => {
    const { data, status } = await deleteTrigger(id);

    if (status !== 200) {
      setToaster({
        message: data.message,
        type: "error",
      });
    }
  };

  const handleAddCharacter = async (name) => {
    const { data, status } = await addTrigger(name);

    if (status !== 200) {
      setToaster({
        message: data.message,
        type: "error",
      });
    }
  };

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleEditCharacter = async ({ id, name }) => {
    const { data, status } = await editTrigger({ id, name });

    if (status !== 200) {
      setToaster({
        message: data.message,
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
          isLoading={isMutating}
          onClose={handleToggleModal}
          onSubmit={handleAddCharacter}
        />
      )}
    </div>
  );
}
