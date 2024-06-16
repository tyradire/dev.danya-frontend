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
      padding: '8px',
      backgroundColor: interfaceData.theme === 'default' ? 'hsla(0, 0%, 31%, .7);' : 'hsla(0, 0%, 100%, .1);',
      minWidth: '240px',
      width: 'fit-content',
      maxWidth: '400px',
      borderRadius: '22px',
      borderColor: interfaceData.theme === 'default' ? '#232323' : '#ababab',
      borderStyle: 'solid',
      borderWidth: '1px',
      boxShadow: "none",
      '&:hover': {
        cursor: 'pointer'
      }
    }),
    singleValue: (styles: any) => ({
      ...styles,
      paddingLeft: '12px',
      color: interfaceData.theme === 'default' ? '#fff5a1' : '#000000',
    }),
    option: (styles: any) => ({
      ...styles,
      border: 'none',
      paddingLeft: '12px',
      color: interfaceData.theme === 'default' ? '#fff5a1' : '#000000',
      backgroundColor: interfaceData.theme === 'default' ? '#2e2e2e;' : '#f2f2f2;',
      '&:hover': {
        backgroundColor: interfaceData.theme === 'default' ? 'hsla(0, 0%, 31%, .7);' : 'hsla(47.71, 91.93%, 56.27%, 0.4);',
        cursor: 'pointer'
      }
    }),
    menu: (styles: any) => ({
      ...styles,
      zIndex: 99,
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
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      backgroundColor: interfaceData.theme === 'default' ? '#232323' : '#cbcbcb',
    }),
    multiValue: (styles: any) => ({
      ...styles,
      borderRadius: '16px',
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '4px 6px',
      color: 'red',
      backgroundColor: 'transparent',
      borderColor: interfaceData.theme === 'default' ? '#232323' : '#bbbbbb',
      '&:hover': {
        cursor: 'pointer'
      }
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      fontSize: '16px',
      color: interfaceData.theme === 'default' ? '#fff5a1' : '#FFFFFF',
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      borderRadius: '50%'
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
        genres && <Select placeholder="Жанр" options={genres} styles={colorStyles} noOptionsMessage={() => 'Жанр отсутствует'} isMulti />
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