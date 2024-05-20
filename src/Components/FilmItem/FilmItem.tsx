import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmGenresType } from "../../types/FilmTypes";
import './film-item.scss';
import likeIconActive from '../../assets/images/like-icon-active.svg';
import likeIcon from '../../assets/images/like-icon-disabled.svg';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addToLikedMovies, getLikedMovies, removeFromLikedMovies } from "../../api/collectionAPI";
import { useDispatch } from "react-redux";
import { addFilmToLiked, removeFilmFromLiked, setLikedFilms } from "../../store/user/likedReducer";

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
  const likedData = useSelector((state: RootState) => state.liked)

  const [liked, setLiked] = useState<boolean>(likedData.liked?.includes(id)||false);

  function setFilmLength(length: number): string {
    if (length > 60) {
      return `${Math.floor(length / 60)} ч ${length % 60} мин`;
    } else return length + ' мин';
  }

  const handleLikeFilm = () => {
    if (!userData.isAuth) return;
    setLiked(!liked)
      if (liked) {
        removeFromLikedMovies(id)
          .then(res => dispatch(removeFilmFromLiked(res?.data.movieId)))
          .catch(err => console.log(err))
    } else {
      addToLikedMovies(id)
      .then(res => dispatch(addFilmToLiked(res?.data.movieId)))
      .catch(err => console.log(err))
    } 
  }

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
      <ul className="film-item__genres-list">
        {
          genres.map((genre, index) => {
            if (index < 3) {
              return <li className="film-item__genres-item" key={index}>{genre.name}</li>
            } else return;
          })
        }
      </ul>
      <button className="film-item__fav-btn" onClick={handleLikeFilm} >
        <img src={liked ? likeIconActive : likeIcon} width="22px" height="22px"/>
      </button>
    </li>
  )
}