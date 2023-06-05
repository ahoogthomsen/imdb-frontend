import { supabase } from "@/lib/supabaseClient";

const delay = () => new Promise((res) => setTimeout(() => res(), 4000));

export async function getCharacters() {
  const { data, error, status } = await supabase.from("characters").select(`*`);

  return { data, error, status };
}

export async function deleteCharacter(_, { arg: id }) {
  const { error, status } = await supabase
    .from("characters")
    .delete()
    .eq("id", id);

  return { error, status };
}

export async function addCharacter(_, { arg: name }) {
  const { error, status } = await supabase.from("characters").insert({ name });

  return { error, status };
}

export async function editCharacter(_, { arg }) {
  const { id, name } = arg;

  const { error, status } = await supabase
    .from("characters")
    .update({ id, name })
    .eq("id", id);

  return { error, status };
}
