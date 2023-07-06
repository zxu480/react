"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Pagination } from "@mui/material";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Info {
  count: number;
  pages: number;
}

const BASE_URL = "https://rickandmortyapi.com/api";

const getCharacters = (
  page: number
): Promise<{
  results: Character[];
  info: Info;
}> => fetch(`${BASE_URL}/character/?page=${page}`).then((res) => res.json());

export default function Images() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getDate = async () => {
    setIsLoading(true);
    const { results, info } = await getCharacters(currPage);
    setIsLoading(false);
    setCharacters(results);
    setTotalPages(info.pages);
  };

  useEffect(() => {
    getDate();
  }, [currPage]);

  return (
    <main className={styles.main}>
      <header>
        <h2>Rick and Morty Charcters</h2>
      </header>
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {characters.map((character) => (
              <li key={character.id}>
                <Image
                  src={character.image}
                  alt={character.name}
                  width={300}
                  height={200}
                ></Image>
                <p>{character.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer>
        <Pagination
          count={totalPages}
          onChange={(e, page) => setCurrPage(page)}
        />
      </footer>
    </main>
  );
}
