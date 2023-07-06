const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = (): Promise<{ results: Character[]; info: Info }> =>
  fetch(`${BASE_URL}/character`).then((res) => res.json());

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Info {
  count: number;
  pages: number;
}
