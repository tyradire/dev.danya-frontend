import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmGenresType } from "../../types/FilmTypes";
import './film-item.scss';
import likedIcon from '../../assets/images/like-icon-disabled.svg';
import likedIconActive from '../../assets/images/like-icon-active.svg';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addToCollectionMovies, removeFromCollectionMovies } from "../../api/collectionAPI";
import { addToLikedMovies, removeFromLikedMovies } from "../../api/likedAPI";
import { useDispatch } from "react-redux";
import { addFilmToCollection, removeFilmFromCollection, setCollectionFilms } from "../../store/user/collectionReducer";
import { addFilmToLiked, removeFilmFromLiked } from "../../store/user/likedReducer";
import { setDefaultStatus, setUnauthorizedStatus } from "../../store/interface/interfaceReducer";

export default function FilmItem({ name, year, genres, movieLength, rating, poster, top, id, isSeries }: 
  { name: string,
    year: number,
    genres: FilmGenresType[], 
    movieLength?: number,
    rating: number,
    poster?: string,
    top?: number,
    id: number,
    isSeries: boolean,
  }): ReactElement {
  const dispatch = useDispatch();
  
  const userData = useSelector((state: RootState) => state.user)
  const collectionData = useSelector((state: RootState) => state.collection)
  const likedData = useSelector((state: RootState) => state.liked)
  const interfaceData = useSelector((state: RootState) => state.interface)

  const [collection, setCollection] = useState<boolean>(collectionData.collection?.includes(id)||false);
  const [liked, setLiked] = useState<boolean>(likedData.liked?.includes(id)||false);

  function setFilmLength(length: number): string {
    if (length > 60) {
      return `${Math.floor(length / 60)} ч ${length % 60} мин`;
    } else return length + ' мин';
  }

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
      removeFromCollectionMovies(id)
        .then(res => dispatch(removeFilmFromCollection(res?.data.movieId)))
        .catch(err => console.log(err))
      if (!liked) return;
      removeFromLikedMovies(id)
        .then(res => dispatch(removeFilmFromLiked(res?.data.movieId)))
        .catch(err => console.log(err))
    } else {
      addToCollectionMovies(id)
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
      removeFromLikedMovies(id)
        .then(res => dispatch(removeFilmFromLiked(res?.data.movieId)))
        .catch(err => console.log(err))
    } else {
      addToLikedMovies(id)
        .then(res => dispatch(addFilmToLiked(res?.data.movieId)))
        .catch(err => console.log(err))
      if (collection) return;
      addToCollectionMovies(id)
        .then(res => dispatch(addFilmToCollection(res?.data.movieId)))
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    setCollection(collectionData.collection?.includes(id))
  }, [collectionData])
  useEffect(() => {
    setLiked(likedData.liked?.includes(id))
  }, [likedData])

  return (
    <li className="film-item">
      <Link to={`/search/${id}`}>
        <div className="film-item__heading">
          <LazyLoadImage
            key={id}
            src={poster}
            alt={name}
            className="film-item__image" 
            width={260}
            height={390}
            effect='blur'
          />
          {
            rating > 0 &&
            <div className="film-item__ranks">
              {
                rating ? <p className={`${rating >= 8 ? 'film-item__rating film-item__rating_good' : rating > 6 ? 'film-item__rating film-item__rating_average' : 'film-item__rating film-item__rating_bad'}`}>{(rating.toFixed(1))}</p>
                : ''
              }
              {
                top && <p className="film-item__top">Топ {top}</p>
              }
            </div>
          }
          <p className="film-item__name">{name}</p>
          <p className="film-item__year">{year}</p>
        </div>
      </Link>
      <div className="film-item__row">
        <button 
          className={collection ? "film-item__viewed film-item__viewed_active" : "film-item__viewed"} 
          onClick={handleCollectionFilm}
        >
        {
          collection ? 'Просмотрен' : 'Уже просмотрено?'
        }
        </button>
        {
          movieLength ? 
          <p className="film-item__length">
            {
              isSeries ? `Серия ~ ${setFilmLength(movieLength)}` :
              setFilmLength(movieLength)
            }
          </p>
          : ''
        }
      </div>
      <ul className="film-item__genres-list">
        {
          genres.map((genre, index) => {
            if (index < 3) {
              return <li className="film-item__genres-item" key={index}>{genre.name}</li>
            } else return;
          })
        }
      </ul>
      <button className={liked ? "film-item__fav-btn film-item__fav-btn_active" : "film-item__fav-btn"} onClick={handleLikedFilm}>
        <img src={liked ? likedIconActive : likedIcon} width="22px" height="22px"/>
      </button>
    </li>
  )
}