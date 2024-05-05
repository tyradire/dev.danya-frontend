import { ReactElement, useEffect, useState } from "react";
import { PersonMovie } from "../../models/models";
import PersonFilmItem from "./PersonFilmItem";
import './person-film.scss';

export default function PersonFilmItems({movies}: {movies: PersonMovie[]}): ReactElement {

  const [filteredMovies, setFilteredMovies] = useState<PersonMovie[]>(movies);

  useEffect(() => {
    setFilteredMovies(movies);
    movies.length && setFilteredMovies([...movies].sort((movieA, movieB) => (movieA['rating'] || 0) > (movieB['rating'] || 0) ? -1 : 1));
  }, [movies])

  return (
    <ul className="person-films">
      {
        filteredMovies?.map((movie) => {return <PersonFilmItem movie={movie} />})
      }
    </ul>
  )
}