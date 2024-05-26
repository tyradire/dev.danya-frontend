import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../../Components/Profile/Profile";
import { RootState } from "../../store/store";
import watchedIcon from '../../assets/images/viewed-icon-active.svg';
import likedIcon from '../../assets/images/like-icon-active.svg';

export default function ProfilePage(): ReactElement {

  const collectionData = useSelector((state: RootState) => state.collection)
  const likedData = useSelector((state: RootState) => state.liked)

  return (
    <div className="page-profile">
      <div className="page__heading">
        <Profile />
        <div className="page__container">
          <h3 className="page__subtitle">Фильмов просмотрено:</h3>
          <p className="page__stat-value">
            {collectionData?.collection?.length}
            <img src={watchedIcon} alt="иконка просмотра"/>
          </p>
          <h3 className="page__subtitle">Фильмов понравилось:</h3>
          <p className="page__stat-value">
            {likedData?.liked?.length}
            <img src={likedIcon} alt="иконка лайка"/>
          </p>
          <h3 className="page__subtitle">Любимые жанры:</h3>
          <ul className="page__list">
            <li className="page__list-item">Боевик</li>
            <li className="page__list-item">Драма</li>
            <li className="page__list-item">Триллер</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 