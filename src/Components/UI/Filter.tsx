import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { IFilm, ProfileGenre } from "../../models/models";
import { RootState } from "../../store/store";
import './filter.scss';
import FilterGenreTag from "./FilterGenreTag";
import { useTheme } from "../../hooks/useTheme";

export default function Filter({viewedFilms, selectedGenres}: {
  viewedFilms: IFilm[], 
  selectedGenres: string[]
}): ReactElement {

  const collectionGenres = useSelector((state: RootState) => state.collection.genres)
  const [userGenres, setUserGenres] = useState<ProfileGenre[]>([]);
  const [visibleMoreGenres, setVisibleMoreGenres] = useState<boolean>(false);
  const [genres, setGenres] = useState<any>([]);
  const filteredGenres = visibleMoreGenres ? collectionGenres.length : 5

  const { theme, setTheme } = useTheme()

  const colorStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: theme === 'default' ? 'hsla(0, 0%, 31%);' : 'hsla(215, 100%, 64%, 0.2);',
      width: '194px',
      height: '37px',
      borderRadius: '10px',
      border: 'none',
      '&:hover': {
        backgroundColor: theme === 'default' ? 'hsla(0, 0%, 31%, .7);' : 'hsla(215, 100%, 64%, 0.3);',
        cursor: 'pointer'
      }
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme === 'default' ? '#fff' : '#000',
    }),
    option: (styles: any) => ({
      ...styles,
      color: theme === 'default' ? '#fff' : '#000',
      backgroundColor: theme === 'default' ? 'hsla(0, 0%, 31%);' : 'hsla(215, 100%, 64%, 0.2);',
    })
  }

  useEffect(() => {
    if (collectionGenres.length < 1) return;
    setUserGenres(collectionGenres)
  }, [collectionGenres])

  useEffect(() => {
    if (!viewedFilms) return;
  }, [viewedFilms])

  useEffect(() => {
    let options: any = [];
    selectedGenres.forEach(genre => {
      options.push({label: genre, value: genre})
    })
    setGenres(options)
  }, [selectedGenres])

  return (
    <search className="filter">
      <Select options={genres} styles={colorStyles} />
      {/* <ul className="filter__list">
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
      </ul> */}
    </search>
  )
} 