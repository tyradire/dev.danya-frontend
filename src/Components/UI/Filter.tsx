import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IFilm, ProfileGenre } from "../../models/models";
import { RootState } from "../../store/store";
import './filter.scss';
import FilterGenreTag from "./FilterGenreTag";

export default function Filter({viewedFilms, selectedGenres, setViewedFilms, setSelectedGenres}: {
  viewedFilms: IFilm[], 
  selectedGenres: string[], 
  setViewedFilms: (viewedFilms: IFilm[]) => void, 
  setSelectedGenres: (selectedGenres: string[]) => void
}): ReactElement {

  const collectionGenres = useSelector((state: RootState) => state.collection.genres)
  const [userGenres, setUserGenres] = useState<ProfileGenre[]>([]);
  const [visibleMoreGenres, setVisibleMoreGenres] = useState<boolean>(false);
  const filteredGenres = visibleMoreGenres ? collectionGenres.length : 5

  useEffect(() => {
    if (collectionGenres.length < 1) return;
    setUserGenres(collectionGenres)
  }, [collectionGenres])

  useEffect(() => {
    if (!viewedFilms) return;
  }, [viewedFilms])

  const showMoreGenres = () => {
    setVisibleMoreGenres(!visibleMoreGenres);
  }

  useEffect(() => {
    setViewedFilms(viewedFilms.filter(({genres: arr}) => arr.some(genre => selectedGenres.includes(genre.name))))
  }, [selectedGenres])

  return (
    <search className="filter">
      <ul className="filter__list">
        {
          collectionGenres.slice(0, filteredGenres).map(genre => 
            <FilterGenreTag genre={genre.genre} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} key={genre.genre} />
          )
        }
        <button className="filter__more-btn" onClick={showMoreGenres}>
          {
            visibleMoreGenres
            ? 'скрыть'
            : '...'
          }
        </button>
      </ul>
    </search>
  )
} 