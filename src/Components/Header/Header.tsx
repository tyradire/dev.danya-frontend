import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import mobileProfileIcon from '../../assets/images/default-user-icon.svg';
import { LOGIN_ROUTE } from "../../data/constants";
import { RootState } from "../../store/store";
import './Header.scss';

export default function Header({isMobileDevice, isAuth}: {isMobileDevice: boolean, isAuth: boolean}): ReactElement {

  const likedData = useSelector((state: RootState) => state.liked)

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/"
            className={({ isActive }) =>
            isActive ? "nav__link nav__status_active" : "nav__link"
          }
            >Главная</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/search"
            className={({ isActive }) =>
            isActive ? "nav__link nav__status_active" : "nav__link"
          }
            >Поиск</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="collection"
            className={({ isActive }) =>
            isActive ? "nav__link nav__status_active" : "nav__link"
          }
            >Моя коллекция 
              { likedData.liked.length > 0 &&
                <span>{likedData.liked.length}</span>
              }
            </NavLink>
          </li>
        </ul>
      </nav>
      {
        !isAuth 
        ? <NavLink to={LOGIN_ROUTE} className="nav__profile">Войти</NavLink>
        : !isMobileDevice
        ? <NavLink to="profile" className="nav__mobile-profile">
            <img src={mobileProfileIcon}/>
          </NavLink>
        : <NavLink to="profile" className="nav__profile">Профиль</NavLink> 
      }
    </header>
  )
} 