import { ReactElement, useEffect, useState } from "react";
import FilmItem from "../../Components/FilmItem/FilmItem";
import {API_KEY, SEARCH_TOP_MOVIES_QUERY, SEARCH_WITH_ID, SEARCH_WITH_NAME, options, initialSearchPageFilms} from '../../data/constants';
import type { FilmItemType } from "../../types/FilmTypes";
import './search.scss';
import { useSearchFilmsQuery } from '../../store/films/api.kinopoisk';
import { IFilm } from "../../models/models";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import FilmItems from "../../Components/FilmItems/FilmItems";

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
        isLoading ? <Loader /> : <FilmItems data={fetchedFilmsData || []} />
      }
    </div>
  )
}