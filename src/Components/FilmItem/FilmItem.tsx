import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmGenresType } from "../../types/FilmTypes";
import './film-item.scss';
import defaultMovieImage from '../../assets/images/default-movie-image.svg';

export default function FilmItem({ name, description, genres, movieLength, rating, poster, top, id }: 
  { name: string, 
    description: string, 
    genres: FilmGenresType[], 
    movieLength: number,
    rating: number,
    poster?: string,
    top?: number,
    id: number
  }): ReactElement {

  function setFilmLength(length: number): string {
    if (length > 60) {
      return `${Math.floor(length / 60)} ч ${length % 60} мин`;
    } else return length + ' мин';
  }

  console.log(name, poster, defaultMovieImage)

  return (
    <li className="film-item">
      <div className="film-item__heading">
        <img src={poster || defaultMovieImage} className="film-item__image" />
        <div className="film-item__ranks">
          {
            rating ? <p className={`${rating > 8 ? 'film-item__rating film-item__rating_good' : rating > 6 ? 'film-item__rating film-item__rating_average' : 'film-item__rating film-item__rating_bad'}`}>{(rating.toString().slice(0,3))}</p>
            : ''
          }
          {
            top && <p className="film-item__top">Топ {top}</p>
          }
        </div>
      </div>
      <Link to={`/search/${id}`} className="film-item__name">{name}</Link>
      {
        description ? <p className="film-item__description film-item__description_expand">{description}</p> 
        : <p className="film-item__description film-item__description_disabled">Описание отсутствует</p>
      }
      <ul className="film-item__genres-list">
        {
          genres.map((genre, index) => {
            if (index < 3) {
              return <li className="film-item__genres-item">{genre.name}</li>
            } else return;
          })
        }
      </ul>
      {
        movieLength ? <p className="film-item__length">{setFilmLength(movieLength)}</p>
        : ''
      }
    </li>
  )
}