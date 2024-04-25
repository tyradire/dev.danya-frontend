import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmGenresType } from "../../types/FilmTypes";
import './film-item.scss';
import defaultMoviePreview from '../../assets/images/default-movie-preview-image.svg';
import likeIconActive from '../../assets/images/like-icon-active.svg';
import likeIcon from '../../assets/images/like-icon-disabled.svg';

export default function FilmItem({ name, year, genres, movieLength, rating, poster, top, id, isSeries }: 
  { name: string,
    year: number,
    genres: FilmGenresType[], 
    movieLength?: number,
    rating: number,
    poster?: string,
    top?: number,
    id: number,
    isSeries: boolean;
  }): ReactElement {

  const [isLiked, setIsLiked] = useState<boolean>(false);

  function setFilmLength(length: number): string {
    if (length > 60) {
      return `${Math.floor(length / 60)} ч ${length % 60} мин`;
    } else return length + ' мин';
  }

  return (
    <li className="film-item">
      <Link to={`/search/${id}`}>
        <div className="film-item__heading">
          <img src={poster || defaultMoviePreview} className="film-item__image" alt={name} loading="lazy" />
          {
            rating > 0 &&
            <div className="film-item__ranks">
              {
                rating ? <p className={`${rating > 8 ? 'film-item__rating film-item__rating_good' : rating > 6 ? 'film-item__rating film-item__rating_average' : 'film-item__rating film-item__rating_bad'}`}>{(rating.toString().slice(0,3))}</p>
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
      <button className="film-item__fav-btn" onClick={() => setIsLiked(!isLiked)}>
        <img src={isLiked ? likeIconActive : likeIcon} width="22px" height="22px"/>
      </button>
    </li>
  )
}