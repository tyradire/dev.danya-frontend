import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import Filter from "../../Components/UI/Filter";
import { IFilm, ProfileGenre } from "../../models/models";
import { useGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";
import { setCollectionGenres } from "../../store/user/collectionReducer";
import { setLikedGenres } from "../../store/user/likedReducer";
import './collection.scss';

export default function CollectionPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const collectionData = useSelector((state: RootState) => state.collection)
  const likedData = useSelector((state: RootState) => state.liked)
  const wishData = useSelector((state: RootState) => state.wish)

  const [filmsType, setFilmsType] = useState<string>('watched');
  const [queryToApiCollection, setQueryToApiCollection] = useState<string>('&id=' + collectionData?.collection?.join('&id=') || '');
  const [queryToApiLiked, setQueryToApiLiked] = useState<string>('&id=' + likedData?.liked?.join('&id=') || '');
  const [queryToApiWish, setQueryToApiWish] = useState<string>('&id=' + wishData?.wish?.join('&id=') || '');

  const {data: collectionFIlmsData, isSuccess: collectionSuccess } = useGetFilmsByIdQuery(queryToApiCollection);
  const {data: likedFIlmsData, isSuccess: likedSuccess} = useGetFilmsByIdQuery(queryToApiLiked);
  const {data: wishFIlmsData, isSuccess: wishSuccess} = useGetFilmsByIdQuery(queryToApiWish);

  const [allFilms, setAllFilms] = useState<IFilm[]|undefined>(collectionFIlmsData||[]);
  const [viewedFilms, setViewedFilms] = useState<IFilm[]|undefined>(collectionFIlmsData||[]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);


  useEffect(() => {
    setQueryToApiCollection('&id=' + collectionData?.collection?.join('&id='));
  }, [collectionData])

  useEffect(() => {
    setQueryToApiLiked('&id=' + likedData?.liked?.join('&id='));
  }, [likedData])

  useEffect(() => {
    setQueryToApiWish('&id=' + wishData?.wish?.join('&id='));
  }, [wishData])

  useEffect(() => {
    if (filmsType === 'watched') {
      setViewedFilms(collectionFIlmsData);
      setAllFilms(collectionFIlmsData);
    } else if (filmsType === 'liked') {
      setViewedFilms(likedFIlmsData);
      setAllFilms(likedFIlmsData);
    } else if (filmsType === 'wish') {
      setViewedFilms(wishFIlmsData);
      setAllFilms(wishFIlmsData);
    }
  }, [collectionSuccess, likedSuccess, wishSuccess, filmsType])

  useEffect(() => {
    if (!selectedGenres.length) {
      if (filmsType === 'watched') {
        setViewedFilms(collectionFIlmsData);
        setAllFilms(collectionFIlmsData);
      } else if (filmsType === 'liked') {
        setViewedFilms(likedFIlmsData);
        setAllFilms(likedFIlmsData);
      } else if (filmsType === 'wish') {
        setViewedFilms(wishFIlmsData);
        setAllFilms(wishFIlmsData);
      }
    }
  }, [selectedGenres])

  useEffect(() => {
    setSelectedGenres([]);
  }, [filmsType])

  return (
    <div className="collection">

        <fieldset className="collection__switch">
          
          <input type="radio" name="collection" value="watched" id="allCollection" onChange={(e) => setFilmsType(e.target.value)} defaultChecked/>
          <label className="collection__switch-item" htmlFor="allCollection">Просмотренные</label>

          <input type="radio" name="collection" value="liked" id="onlyLiked" onChange={(e) => setFilmsType(e.target.value)}/>
          <label className="collection__switch-item" htmlFor="onlyLiked">Любимое</label>

          <input type="radio" name="collection" value="wish" id="onlyWish" onChange={(e) => setFilmsType(e.target.value)}/>
          <label className="collection__switch-item" htmlFor="onlyWish">Буду смотреть</label>

        </fieldset>

      <Filter viewedFilms={allFilms||[]} selectedGenres={selectedGenres} setViewedFilms={setViewedFilms} setSelectedGenres={setSelectedGenres} />

      {
        viewedFilms?.length
        ? <FilmItems data={viewedFilms} isMobileDevice={isMobileDevice} />
        : <p className="page__notice">Коллекция пуста.</p>
      }
    </div>
  )
} 