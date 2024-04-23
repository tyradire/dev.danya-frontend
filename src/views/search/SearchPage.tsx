import { ReactElement, useEffect, useState } from "react";
import FilmItem from "../../Components/FilmItem/FilmItem";
import {API_KEY, SEARCH_TOP_MOVIES_QUERY, SEARCH_WITH_ID, SEARCH_WITH_NAME, options} from '../../data/constants';
import type { FilmItemType } from "../../types/FilmTypes";
import './search.scss';
import { useSearchFilmsQuery } from '../../store/films/api.kinopoisk';
import { IFilm } from "../../models/models";
import Loader from "../../Components/Loader/Loader";

export default function SearchPage(): ReactElement {
  const [filmsData, setFilmsData] = useState<FilmItemType[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [testQuery, setTestQuery] = useState<string>(searchQuery);

  const {isLoading, isError, data} = useSearchFilmsQuery(testQuery, {
    skip: testQuery.length < 1
  });

  useEffect(() => {
    console.log(filmsData)
  }, [filmsData])

  function searchMovie(event: React.FormEvent): void {
    event.preventDefault();
    setTestQuery(searchQuery)
  }

  return (
    <div className="search">
      <form action="" className="search__form" onSubmit={searchMovie}>
        <input type='text' value={searchQuery} className="search__input" onChange={(e) => setSearchQuery(e.target.value)}/>
        <button className="search__submit-btn" type="submit"></button>
      </form>
      {
        isLoading ? <Loader /> :
        <ul className="film-items">
          {
            data?.map((film: IFilm) => {

              return <FilmItem 
                      name={film.name} 
                      description={film.description} 
                      genres={film.genres} 
                      movieLength={film.movieLength} 
                      rating={film.rating.kp > 0 ? film.rating.kp : film.rating.imdb}
                      poster={film.poster?.previewUrl}
                      top={film.top250}
                      key={film.id}
                      id={film.id}
                      />
            })
          }
        </ul>
      }
    </div>
  )
}