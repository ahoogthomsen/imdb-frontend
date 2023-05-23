const BASE_URL = "https://imdb-express-backend.vercel.app/movies/";
const API_KEY_QUERY = "?apiKey=5";

/* 
In order to reset the server if something is wrong:
create a PUT request to https://imdb-express-backend.vercel.app/movies/reset in postman
*/

export async function getMovies() {
  const res = await fetch(`${BASE_URL}${API_KEY_QUERY}`, {
    method: "GET",
  });
  const data = await res.json();
  return { data };
}

export async function deleteMovie(id) {
  const res = await fetch(`${BASE_URL}${id}${API_KEY_QUERY}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return { data, status: res.status };
}

export async function addMovie(movie) {
  const res = await fetch(`${BASE_URL}${API_KEY_QUERY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie }),
  });

  const data = await res.json();
  return { data, status: res.status };
}

export async function editMovie({ id, movie }) {
  const res = await fetch(`${BASE_URL}${id}${API_KEY_QUERY}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie }),
  });

  const data = await res.json();
  return { data, status: res.status };
}
