import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { FilmGenresType } from "../../types/FilmTypes";
import './film-item.scss';
import defaultMoviePreview from '../../assets/images/default-movie-preview-image.svg';
import likeIconActive from '../../assets/images/like-icon-active.svg';
import likeIcon from '../../assets/images/like-icon-disabled.svg';
import { StorageFilmItem } from "../../models/models";

export default function FilmItemMobile({ name, year, genres, movieLength, rating, poster, top, id, isSeries, isLiked, likedFilms, setLikedFilms }: 
  { name: string,
    year: number,
    genres: FilmGenresType[], 
    movieLength?: number,
    rating: number,
    poster?: string,
    top?: number,
    id: number,
    isSeries: boolean,
    isLiked: boolean,
    likedFilms: StorageFilmItem[]
    setLikedFilms: Dispatch<SetStateAction<StorageFilmItem[]>>,
  }): ReactElement {

  const [liked, setLiked] = useState<boolean>(isLiked);

  function setFilmLength(length: number): string {
    if (length > 60) {
      return `${Math.floor(length / 60)} ч ${length % 60} мин`;
    } else return length + ' мин';
  }

  const handleLikeFilm = () => {
    setLiked(!liked)
    if (liked) {
      setLikedFilms([...likedFilms].filter(film => film.filmId !== id))
  } else {
    setLikedFilms([...likedFilms, {filmId: id, userRating: 0}])
  }
  }

  return (
    <li className="film-item-mobile" style={{backgroundImage: `url(${poster || defaultMoviePreview})`}}>
      <Link to={`/search/${id}`}>
        <p className="film-item-mobile__name">{name}</p>
        <div className="film-item__heading">
          {
            rating > 0 &&
            <div className="film-item__ranks">
              {
                // rating ? <p className={`${rating > 8 ? 'film-item__rating film-item__rating_good' : rating > 6 ? 'film-item__rating film-item__rating_average' : 'film-item__rating film-item__rating_bad'}`}>{(rating.toString().slice(0,3))}</p>
                rating ? <p className={`${rating >= 8 ? 'film-item__rating film-item__rating_good' : rating > 6 ? 'film-item__rating film-item__rating_average' : 'film-item__rating film-item__rating_bad'}`}>{(rating.toFixed(1))}</p>
                : ''
              }
              {
                top && <p className="film-item__top">Топ {top}</p>
              }
            </div>
          }
          <p className="film-item__year">{year}</p>
        </div>
        <div className="film-item-mobile__bottom">
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
        </div>
      </Link>
      <button className="film-item__fav-btn" onClick={handleLikeFilm}>
        <img src={liked ? likeIconActive : likeIcon} width="22px" height="22px"/>
      </button>
    </li>
  )
}