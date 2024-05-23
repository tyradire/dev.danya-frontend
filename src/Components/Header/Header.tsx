import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import mobileProfileIcon from '../../assets/images/default-user-icon.svg';
import { LOGIN_ROUTE } from "../../data/constants";
import { RootState } from "../../store/store";
import './Header.scss';

export default function Header({isMobileDevice, isAuth}: {isMobileDevice: boolean, isAuth: boolean}): ReactElement {

  const userData = useSelector((state: RootState) => state.user)
  const collectionData = useSelector((state: RootState) => state.collection)
  const collectionCounter = collectionData?.collection?.length || 0

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
          {
            userData.isAuth &&
            <li className="nav__item">
              <NavLink to="collection"
              className={({ isActive }) =>
              isActive ? "nav__link nav__status_active" : "nav__link"
            }>
              Моя коллекция 
                { collectionCounter > 0 &&
                  <span>{collectionCounter || 0 }</span>
                }
              </NavLink>
            </li>
          }
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