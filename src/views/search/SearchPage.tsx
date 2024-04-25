import { ReactElement, useEffect, useState } from "react";
import FilmItem from "../../Components/FilmItem/FilmItem";
import {API_KEY, SEARCH_TOP_MOVIES_QUERY, SEARCH_WITH_ID, SEARCH_WITH_NAME, options, initialSearchPageFilms} from '../../data/constants';
import type { FilmItemType } from "../../types/FilmTypes";
import './search.scss';
import { useSearchFilmsQuery } from '../../store/films/api.kinopoisk';
import { IFilm } from "../../models/models";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";

export default function SearchPage(): ReactElement {

  const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem('JSONFilmsQuery') || '');
  const [testQuery, setTestQuery] = useState<string>(searchQuery);

  const {isSuccess, isLoading, data: fetchedFilmsData} = useSearchFilmsQuery(testQuery, {
    skip: testQuery.length < 1
  });

  function searchMovie(event: React.FormEvent): void {
    event.preventDefault();
    setTestQuery(searchQuery);
  }
  
  useEffect(() => {
    if (!isSuccess) return;
    localStorage.setItem('JSONFilmsQuery', searchQuery)
  }, [isSuccess]);

  useEffect(() => {
    setTestQuery(searchQuery);
  }, [])

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
            fetchedFilmsData?.map((film: IFilm) => {
              return <FilmItem 
                      name={film.name} 
                      // description={film.shortDescription}
                      year={film.year}
                      genres={film.genres} 
                      movieLength={film.movieLength || film.seriesLength} 
                      rating={film.rating.kp > 0 ? film.rating.kp : film.rating.imdb}
                      poster={film.poster?.previewUrl}
                      top={film.top250}
                      key={film.id}
                      id={film.id}
                      isSeries={(film.seriesLength||0) > film.movieLength}
                      />
            })
          }
        </ul>
      }
    </div>
  )
}