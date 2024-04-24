import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { useGetFilmQuery } from "../../store/films/api.kinopoisk";
import './film.scss';
import defaultMovieImage from '../../assets/images/default-movie-image.svg';

export default function FilmPage(): ReactElement {
  const filmId = useParams().id;
  const { isLoading: areFilmLoading, data: film }  = useGetFilmQuery(Number(filmId));

  return (
    areFilmLoading ? <Loader /> :
    <div className="film">
      <div className="film__heading">
        <h1 className="film__title">{film?.name} ({film?.year})</h1>
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
    </div>
  )
} 