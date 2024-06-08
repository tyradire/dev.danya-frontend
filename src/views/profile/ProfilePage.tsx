import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../../Components/Profile/Profile";
import { RootState } from "../../store/store";
import watchedIcon from '../../assets/images/viewed-icon-disabled.svg';
import likedIcon from '../../assets/images/like-icon-disabled.svg';
import './page-profile.scss';
import TopGenres from "../../Components/TopGenres/TopGenres";
import Loader from "../../Components/Loader/Loader";

export default function ProfilePage(): ReactElement {

  const collectionData = useSelector((state: RootState) => state.collection)
  const likedData = useSelector((state: RootState) => state.liked)

  return (
    <div className="page-profile">
      <div className="page__heading">
        <Profile />
        <div className="page__container">
          <div className="page__row">
            <h3 className="page__subtitle">Фильмов просмотрено:</h3>
            <p className="page__stat-value">
              {collectionData?.collection?.length}
              <img src={watchedIcon} alt="иконка просмотра"/>
            </p>
          </div>
          <div className="page__row">
            <h3 className="page__subtitle">Фильмов понравилось:</h3>
            <p className="page__stat-value">
              {likedData?.liked?.length}
              <img src={likedIcon} alt="иконка лайка"/>
            </p>
          </div>
          {
            likedData.likedGenres.length > 1 &&
            <h3 className="page__subtitle">Любимые жанры:</h3>
          }
            { 
              likedData.likedGenres.length > 1 ?
              <ul className="page__list">
                {
                  likedData.likedGenres.map((genre, i) => 
                    <li className="page__list-item" key={i}>{genre}</li>
                  )
                }
              </ul>
              : ''
            }
        </div>
      </div>
      <div className="page__main">
        <div className="page__stat">
          {
            collectionData.genres.length < 1
            ? <Loader />
            : <TopGenres />
          }
        </div>
      </div>
    </div>
  )
} 