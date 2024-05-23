import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmGenresType } from "../../types/FilmTypes";
import './film-item.scss';
import viewedIcon from '../../assets/images/viewed-icon-disabled.svg';
import viewedIconActive from '../../assets/images/viewed-icon-active.svg';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addToCollectionMovies, removeFromCollectionMovies } from "../../api/collectionAPI";
import { useDispatch } from "react-redux";
import { addFilmToCollection, removeFilmFromCollection, setCollectionFilms } from "../../store/user/collectionReducer";

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

  const [collection, setCollection] = useState<boolean>(collectionData.collection?.includes(id)||false);

  function setFilmLength(length: number): string {
    if (length > 60) {
      return `${Math.floor(length / 60)} ч ${length % 60} мин`;
    } else return length + ' мин';
  }

  const handleCollectionFilm = () => {
    if (!userData.isAuth) return;
    setCollection(!collection)
      if (collection) {
        removeFromCollectionMovies(id)
          .then(res => dispatch(removeFilmFromCollection(res?.data.movieId)))
          .catch(err => console.log(err))
    } else {
      addToCollectionMovies(id)
      .then(res => dispatch(addFilmToCollection(res?.data.movieId)))
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
      <button className={collection ? "film-item__fav-btn film-item__fav-btn_active" : "film-item__fav-btn"} onClick={handleCollectionFilm} >
        <img src={collection ? viewedIconActive : viewedIcon} width="22px" height="22px"/>
      </button>
    </li>
  )
}