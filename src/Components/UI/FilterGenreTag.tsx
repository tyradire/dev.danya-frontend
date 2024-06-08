import { ReactElement, useState } from "react";

import './filter.scss';

export default function FilterGenreTag({genre, selectedGenres, setSelectedGenres}: {
    genre: string, 
    selectedGenres: string[],
    setSelectedGenres: (selectedGenres: string[]) => void
  }): 
  ReactElement {

    const [activeGenre, setActiveGenre] = useState<boolean>(false);

  const handleGenre = () => {
    setActiveGenre(!activeGenre);
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(filteredGenre => filteredGenre !== genre));
    } else {
      setSelectedGenres(selectedGenres.concat(genre));
    }
  }
  console.log(activeGenre)

  return (
    <li className={activeGenre ? "filter__item filter__item_active" : "filter__item"}>
      <button value={genre} onClick={handleGenre}>{genre}</button>
    </li>
  )
} 