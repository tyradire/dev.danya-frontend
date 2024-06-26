import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmGenresType } from "../../types/FilmTypes";
import './film-item.scss';
import likedIcon from '../../assets/images/like-icon-disabled.svg';
import likedIconActive from '../../assets/images/like-icon-active.svg';
import viewedIcon from '../../assets/images/viewed-icon-disabled.svg';
import viewedIconActive from '../../assets/images/viewed-icon-active.svg';
import wishIcon from '../../assets/images/wishlist-icon-disabled.svg';
import wishIconActive from '../../assets/images/wishlist-icon-active.svg';
import cardMenuIcon from '../../assets/images/card-menu-icon.svg';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addFilmToCollection, removeFilmFromCollection, setCollectionFilms } from "../../store/user/collectionReducer";
import { addToCollectionMovies, removeFromCollectionMovies, getCollectionMovies } from "../../api/collectionAPI";
import { setDefaultStatus, setUnauthorizedStatus } from "../../store/interface/interfaceReducer";
import { addToLikedMovies, removeFromLikedMovies } from "../../api/likedAPI";
import { addFilmToLiked, removeFilmFromLiked } from "../../store/user/likedReducer";
import { addToWishMovie, removeFromWishMovie } from "../../api/wishAPI";
import { addFilmToWishlist, removeFilmFromWishlist } from "../../store/user/wishlistReducer";

export default function FilmItemMobile({ name, year, genres, movieLength, rating, poster, top, id, isSeries }: 
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
  const wishData = useSelector((state: RootState) => state.wish)
  const interfaceData = useSelector((state: RootState) => state.interface)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [collection, setCollection] = useState<boolean>(collectionData.collection.includes(id));
  const [liked, setLiked] = useState<boolean>(likedData.liked?.includes(id)||false);
  const [wish, setWish] = useState<boolean>(wishData.wish?.includes(id)||false);

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
      removeFromWishMovie(id)
        .then(res => dispatch(removeFilmFromWishlist(res?.data.movieId)))
        .catch(err => console.log(err))
    } else {
      addToWishMovie(id)
        .then(res => dispatch(addFilmToWishlist(res?.data.movieId)))
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    setCollection(collectionData.collection?.includes(id))
  }, [collectionData])
  useEffect(() => {
    setLiked(likedData.liked?.includes(id))
  }, [likedData])
  useEffect(() => {
    setWish(wishData.wish?.includes(id))
  }, [wishData])

  return (
    <li className="film-item-mobile">
      <Link to={`/search/${id}`}>
        <LazyLoadImage 
            key={id}
            src={poster}
            alt={name}
            height={480}
            className="film-item-mobile__image"
            effect='blur'
          />
          <div className="film-item__heading">
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
      <button className="film-item-mobile__menu" onClick={() => setIsOpen(!isOpen)}>
        <img src={cardMenuIcon} width="22px" height="22px" />
      </button>
      <div className={isOpen ? "film-item-mobile__controls film-item-mobile__controls_active" : "film-item-mobile__controls"}>
        <button className={collection ? "film-item-mobile__viewed-btn film-item-mobile__viewed-btn_active" : "film-item-mobile__viewed-btn"} onClick={handleCollectionFilm}>
          <img src={collection ? viewedIconActive : viewedIcon} width="22px" height="22px"/>
        </button>
        <button className={wish ? "film-item-mobile__wish-btn film-item-mobile__wish-btn_active" : "film-item-mobile__wish-btn"} onClick={handleWishFilm} title="Буду смотреть">
          <img src={wish ? wishIconActive : wishIcon} width="22px" height="22px"/>
        </button>
        <button className={liked ? "film-item-mobile__fav-btn film-item-mobile__fav-btn_active" : "film-item-mobile__fav-btn"} onClick={handleLikedFilm}>
          <img src={liked ? likedIconActive : likedIcon} width="22px" height="22px"/>
        </button>
      </div>
    </li>
  )
}