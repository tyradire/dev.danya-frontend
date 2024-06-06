import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { useGetFilmQuery } from "../../store/films/api.kinopoisk";
import './film.scss';
import likedIcon from '../../assets/images/like-icon-disabled.svg';
import likedIconActive from '../../assets/images/like-icon-active.svg';
import viewedIcon from '../../assets/images/viewed-icon-disabled.svg';
import viewedIconActive from '../../assets/images/viewed-icon-active.svg';
import wishIcon from '../../assets/images/wishlist-icon-disabled.svg';
import wishIconActive from '../../assets/images/wishlist-icon-active.svg';
import defaultMovieImage from '../../assets/images/default-movie-image.svg';
import PersonItem from "../../Components/PersonItem/PersonItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setDefaultStatus, setUnauthorizedStatus } from "../../store/interface/interfaceReducer";
import { addToCollectionMovies, removeFromCollectionMovies } from "../../api/collectionAPI";
import { addFilmToCollection, removeFilmFromCollection } from "../../store/user/collectionReducer";
import { addFilmToLiked, removeFilmFromLiked } from "../../store/user/likedReducer";
import { addToLikedMovies, removeFromLikedMovies } from "../../api/likedAPI";
import { SimilarMovie } from "../../models/models";
import SimilarFilms from "../../Components/SimilarFilms/SimilarFilms";
import { addToWishMovie, removeFromWishMovie } from "../../api/wishAPI";
import { addFilmToWishlist, removeFilmFromWishlist } from "../../store/user/wishlistReducer";

export default function FilmPage(): ReactElement {

  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user)
  const collectionData = useSelector((state: RootState) => state.collection)
  const likedData = useSelector((state: RootState) => state.liked)
  const wishData = useSelector((state: RootState) => state.wish)
  const interfaceData = useSelector((state: RootState) => state.interface)

  const filmId = useParams().id;
  const numberId = Number(filmId);
  const { data: film, isLoading: filmIsLoading, isSuccess: filmIsSuccess }  = useGetFilmQuery(numberId);

  const [collection, setCollection] = useState<boolean>(collectionData.collection.includes(numberId));
  const [liked, setLiked] = useState<boolean>(likedData.liked?.includes(numberId)||false);
  const [wish, setWish] = useState<boolean>(wishData.wish?.includes(numberId)||false);
  const [similarFilmsList, setSimilarFilmsList] = useState<SimilarMovie[]>([]);

  const handleCollectionFilm = () => {
    if (!userData.isAuth) {
      if (interfaceData.isOpened) {
        return;
      } else {
        dispatch(setUnauthorizedStatus({status: 'error'}))
        setTimeout(() => dispatch(setDefaultStatus()), 5000);
        return;
      }
    };
    setCollection(!collection)
    if (collection) {
      removeFromCollectionMovies(numberId)
        .then(res => dispatch(removeFilmFromCollection(res?.data.movieId)))
        .catch(err => console.log(err))
      if (!liked) return;
      removeFromLikedMovies(numberId)
        .then(res => dispatch(removeFilmFromLiked(res?.data.movieId)))
        .catch(err => console.log(err))
    } else {
      addToCollectionMovies(numberId)
        .then(res => dispatch(addFilmToCollection(res?.data.movieId)))
        .catch(err => console.log(err))
    } 
  }

  const handleLikedFilm = () => {
    if (!userData.isAuth) {
      if (interfaceData.isOpened) {
        return;
      } else {
        dispatch(setUnauthorizedStatus({status: 'error'}))
        setTimeout(() => dispatch(setDefaultStatus()), 5000);
        return;
      }
    };
    setLiked(!liked)
    if (liked) {
      removeFromLikedMovies(numberId)
        .then(res => dispatch(removeFilmFromLiked(res?.data.movieId)))
        .catch(err => console.log(err))
    } else {
      addToLikedMovies(numberId)
        .then(res => dispatch(addFilmToLiked(res?.data.movieId)))
        .catch(err => console.log(err))
      if (collection) return;
      addToCollectionMovies(numberId)
        .then(res => dispatch(addFilmToCollection(res?.data.movieId)))
        .catch(err => console.log(err))
    }
  }

  const handleWishFilm = () => {
    if (!userData.isAuth) {
      if (interfaceData.isOpened) {
        return;
      } else {
        dispatch(setUnauthorizedStatus({status: 'error'}))
        setTimeout(() => dispatch(setDefaultStatus()), 5000);
        return;
      }
    };
    setWish(!wish)
    if (wish) {
      removeFromWishMovie(numberId)
        .then(res => dispatch(removeFilmFromWishlist(res?.data.movieId)))
        .catch(err => console.log(err))
    } else {
      addToWishMovie(numberId)
        .then(res => dispatch(addFilmToWishlist(res?.data.movieId)))
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    setCollection(collectionData.collection?.includes(numberId))
  }, [collectionData, filmIsSuccess])
  useEffect(() => {
    setLiked(likedData.liked?.includes(numberId))
  }, [likedData, filmIsSuccess])
  useEffect(() => {
    setWish(wishData.wish?.includes(numberId))
  }, [wishData, filmIsSuccess])

  useEffect(() => {
    if (!film?.sequelsAndPrequels && !film?.similarMovies) return setSimilarFilmsList([]);
    setSimilarFilmsList(film?.sequelsAndPrequels.concat(film.similarMovies || []) || [])
  }, [filmIsSuccess, film])

  return (
    filmIsLoading ? <Loader /> :
    <div className="film">
      <div className="film__heading">
        <h1 className="film__title">{film?.name} <span>({film?.year})</span></h1>
        {
          film?.rating.kp && 
          <p className={`${film?.rating.kp > 8 ? 'film__rating film__rating_good' : film?.rating.kp > 6 ? 'film__rating film__rating_average' : 'film__rating film__rating_bad'}`}>{(film?.rating.kp).toFixed(1)}</p>
        }
      </div>
      <ul className="film__genres-list">{
        film?.genres.map((genre, index) => {
          return <li className="film__genres-item" key={index}>{genre.name}</li>
          })
        }
      </ul>
      <div className="film__main">
        <img className="film__image" src={film?.poster.url || defaultMovieImage} width="400px" height="534px" />
        <div className="film__content">
          <div className="film__controls">
            <button className="film__button" onClick={handleCollectionFilm}>
              <img src={collection ? viewedIconActive : viewedIcon} width="32px" height="32px"/>
            </button>
            <button className="film__button" onClick={handleWishFilm}>
              <img src={wish ? wishIconActive : wishIcon} width="32px" height="32px"/>
            </button>
            <button className="film__button" onClick={handleLikedFilm}>
              <img src={liked ? likedIconActive : likedIcon} width="32px" height="32px"/>
            </button>
          </div>
          <p className="film__description">{film?.description}</p>
          {
            film?.watchability.items.length !== 0 ?
            <div className="film__watch">
              <p>Смотреть:</p>
              <ul className="film__watch-list">{film?.watchability.items.map((resource, index) => {
                return <li className="film__watch-item" key={index}><a href={resource.url} target="_blank"><img src={resource.logo.url} width="60px" height="60px"/></a></li>
              })}</ul>
            </div>
            : ''
          }
        </div>
      </div>
      <div className="film__similar">
        <SimilarFilms similarFilmsData={similarFilmsList || []} />
      </div>
      <div className="film__additional">
          <ul className="film__persons">
            {
              film?.persons.map((person, index) => {
                if (index < 5) return <PersonItem person={person.name} role={person.description} profession={person.profession} photo={person.photo} id={person.id} key={person.id} />
              })
            }
          </ul>
      </div>
    </div>
  )
} 