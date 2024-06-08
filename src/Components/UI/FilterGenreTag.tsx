import { ReactElement } from "react";

import './filter.scss';

export default function FilterGenreTag({genre, selectedGenres, setSelectedGenres}: {
    genre: string, 
    selectedGenres: string[],
    setSelectedGenres: (selectedGenres: string[]) => void
  }): 
  ReactElement {

  const handleGenre = () => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(filteredGenre => filteredGenre !== genre));
    } else {
      setSelectedGenres(selectedGenres.concat(genre));
    }
  }

  return (
    <li className={selectedGenres.includes(genre) ? "filter__item filter__item_active" : "filter__item"}>
      <button value={genre} onClick={handleGenre}>{genre}</button>
    </li>
  )
} 