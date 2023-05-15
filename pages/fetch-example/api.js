const BASE_URL = "http://localhost:3001/characters/";
const API_KEY_QUERY = "?apiKey=5";

export async function getCharacters() {
  const res = await fetch(`${BASE_URL}${API_KEY_QUERY}`, {
    method: "GET",
  });
  const data = await res.json();
  return { data };
}

export async function deleteCharacter(id) {
  const res = await fetch(`${BASE_URL}${id}${API_KEY_QUERY}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return { data, status: res.status };
}

export async function addCharacter(name) {
  const res = await fetch(`${BASE_URL}${API_KEY_QUERY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ character: { name } }),
  });

  const data = await res.json();
  return { data, status: res.status };
}

export async function editCharacter({ name }) {
  const res = await fetch(`${BASE_URL}${id}${API_KEY_QUERY}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ character: { id, name } }),
  });

  const data = await res.json();
  return { data, status: res.status };
}
