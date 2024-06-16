import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { IFilm, ProfileGenre } from "../../models/models";
import { RootState } from "../../store/store";
import './filter.scss';
import FilterGenreTag from "./FilterGenreTag";

export default function Filter({viewedFilms, selectedGenres}: {
  viewedFilms: IFilm[], 
  selectedGenres: string[]
}): ReactElement {

  const interfaceData = useSelector((state: RootState) => state.interface)

  const collectionGenres = useSelector((state: RootState) => state.collection.genres)
  const [userGenres, setUserGenres] = useState<ProfileGenre[]>([]);
  const [visibleMoreGenres, setVisibleMoreGenres] = useState<boolean>(false);
  const [genres, setGenres] = useState<any>([]);
  const [activeTheme, setActiveTheme] = useState<string>('');
  const filteredGenres = visibleMoreGenres ? collectionGenres.length : 5

  const colorStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: 'transparent',
      width: '194px',
      height: '37px',
      borderRadius: '10px',
      borderColor: interfaceData.theme === 'default' ? '#232323' : '#cbcbcb',
      borderStyle: 'solid',
      borderWidth: '1px',
      '&:hover': {
        backgroundColor: interfaceData.theme === 'default' ? 'hsla(0, 0%, 31%, .7);' : 'hsla(47.71, 91.93%, 56.27%, 0.4);',
        cursor: 'pointer'
      }
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: interfaceData.theme === 'default' ? '#fff5a1' : '#000000',
    }),
    option: (styles: any) => ({
      ...styles,
      border: 'none',
      color: interfaceData.theme === 'default' ? '#fff5a1' : '#000000',
      backgroundColor: interfaceData.theme === 'default' ? '#2e2e2e;' : '#f2f2f2;',
      '&:hover': {
        backgroundColor: interfaceData.theme === 'default' ? 'hsla(0, 0%, 31%, .7);' : 'hsla(47.71, 91.93%, 56.27%, 0.4);',
        cursor: 'pointer'
      }
    }),
    menu: (styles: any) => ({
      ...styles,
      zIndex: 10,
      backgroundColor: interfaceData.theme === 'default' ? '#2e2e2e;' : '#f2f2f2;',
    }),
    menuList: (styles: any) => ({
      ...styles,
      overflowY: 'scroll',
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      },
      "@supports (-moz-appearance:none)": {
        scrollbarColor: '#888888',
        scrollbarWidth: 'thin',
      }
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
      {
        genres && <Select defaultValue={{label: 'Выбрать', value: null}} options={genres} styles={colorStyles} />
      }
      
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