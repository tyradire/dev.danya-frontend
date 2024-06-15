import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import Filter from "../../Components/UI/Filter";
import { IFilm, ProfileGenre } from "../../models/models";
import { useGetFilmsByIdQuery, useLazyGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";
import { setCollectionGenres } from "../../store/user/collectionReducer";
import { setLikedGenres } from "../../store/user/likedReducer";
import './collection.scss';

export default function CollectionPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const collectionData = useSelector((state: RootState) => state.collection)
  const likedData = useSelector((state: RootState) => state.liked)
  const wishData = useSelector((state: RootState) => state.wish)

  const [filmsType, setFilmsType] = useState<string>('watched');
  const [queryToApiCollection, setQueryToApiCollection] = useState<string>('&id=' + collectionData.collection.join('&id='));

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [filmsFinished, setFilmsFinished] = useState<boolean>(true)

  const [fetchFilms, {isSuccess: collectionFilmsIsSuccess}] = useLazyGetFilmsByIdQuery();

  const [mainFilmsData, setMainFilmsData] = useState<IFilm[]>([]);
  // const [allFilms, setAllFilms] = useState<IFilm[]|undefined>(collectionFIlmsData||[]);
  // const [viewedFilms, setViewedFilms] = useState<IFilm[]|undefined>(collectionFIlmsData||[]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    setSelectedGenres(collectionData.genres.map(genre => genre.genre))
  }, [collectionData.genres])

  const handleCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilmsType(e.target.value)
  }

  const scrollHandler = ():void => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 && filmsFinished) {
      setFetching(true);
    }
  }

  useEffect(() => {
    setQueryToApiCollection('&id=' + collectionData.collection.join('&id='));
  }, [collectionData])

  useEffect(() => {
    setCurrentPage(1);
    setMainFilmsData([]);
    setFilmsFinished(true);
    if (filmsType === 'watched') {
      setQueryToApiCollection('&id=' + collectionData.collection.join('&id='));
      console.log(filmsType)
    } else if (filmsType === 'liked') {
      setQueryToApiCollection('&id=' + likedData?.liked?.join('&id='));
      console.log(filmsType)
    } else if (filmsType === 'wish') {
      setQueryToApiCollection('&id=' + wishData?.wish?.join('&id='));
      console.log(filmsType)
    }
    setFetching(true);
  }, [filmsType])

  // useEffect(() => {
  //   if (!selectedGenres.length) {
  //     if (filmsType === 'watched') {
  //       setViewedFilms(collectionFIlmsData);
  //       setAllFilms(collectionFIlmsData);
  //     } else if (filmsType === 'liked') {
  //       setViewedFilms(likedFIlmsData);
  //       setAllFilms(likedFIlmsData);
  //     } else if (filmsType === 'wish') {
  //       setViewedFilms(wishFIlmsData);
  //       setAllFilms(wishFIlmsData);
  //     }
  //   }
  // }, [selectedGenres])

  // useEffect(() => {
  //   setSelectedGenres([]);
  // }, [filmsType])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  useEffect(() => {
    if (fetching && filmsFinished && queryToApiCollection.length > 4) {
      fetchFilms({query: queryToApiCollection, page: currentPage})
      .then((res: any) => {
        if (res.data?.length === 0) setFilmsFinished(false);
        setMainFilmsData(mainFilmsData => mainFilmsData.concat(res.data))
        setFetching(false)
      });
      setCurrentPage(currentPage => currentPage + 1)
    }
  }, [fetching, queryToApiCollection])

  return (
    <div className="collection">

        <fieldset className="collection__switch">
          
          <input type="radio" name="collection" value="watched" id="allCollection" onChange={(e) => handleCollection(e)} defaultChecked/>
          <label className="collection__switch-item" htmlFor="allCollection">Просмотренные</label>

          <input type="radio" name="collection" value="liked" id="onlyLiked" onChange={(e) => handleCollection(e)}/>
          <label className="collection__switch-item" htmlFor="onlyLiked">Любимое</label>

          <input type="radio" name="collection" value="wish" id="onlyWish" onChange={(e) => handleCollection(e)}/>
          <label className="collection__switch-item" htmlFor="onlyWish">Буду смотреть</label>

        </fieldset>

      <Filter viewedFilms={mainFilmsData||[]} selectedGenres={selectedGenres} />

      {
        collectionFilmsIsSuccess
        ? <FilmItems data={mainFilmsData} isMobileDevice={isMobileDevice} />
        : <p className="page__notice">Коллекция пуста.</p>
      }
    </div>
  )
} 