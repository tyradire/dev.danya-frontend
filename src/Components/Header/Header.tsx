import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import mobileProfileIcon from '../../assets/images/default-user-icon.svg';
import headerLogoIcon from '../../assets/images/logo.svg';
import { LOGIN_ROUTE } from "../../data/constants";
import { RootState } from "../../store/store";
import './Header.scss';

export default function Header({isMobileDevice, isAuth}: {isMobileDevice: boolean, isAuth: boolean}): ReactElement {

  const userData = useSelector((state: RootState) => state.user)
  const collectionData = useSelector((state: RootState) => state.collection)
  const collectionCounter = collectionData?.collection?.length || 0

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <svg width="44px" height="44px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".6" fill-rule="evenodd" clip-rule="evenodd" d="M3 4h18a1 1 0 0 1 1 1v1H2V5a1 1 0 0 1 1-1z" fill="#FFFFFF"/><path opacity=".3" fill-rule="evenodd" clip-rule="evenodd" d="M5 2h14a1 1 0 0 1 1 1v1H4V3a1 1 0 0 1 1-1z" fill="#FFFFFF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1 6h22a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 2v3h3V8H1zm0 5v3h3v-3H1zm0 5v3h3v-3H1zM20 8v3h3V8h-3zm0 5v3h3v-3h-3zm0 5v3h3v-3h-3z" fill="#FFFFFF"/></svg>
        КИНОхаб
      </NavLink>
      <nav className="nav">
        <ul className="nav__list">
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
        ? <NavLink to={LOGIN_ROUTE} className="nav__profile nav__profile_button">Войти</NavLink>
        : !isMobileDevice
        ? <NavLink to="profile" className="nav__mobile-profile">
            <img src={userData.avatar}/>
          </NavLink>
        : <NavLink to="profile" className="nav__profile">
            <img className="nav__avatar" src={userData.avatar} />
            {userData.name}
          </NavLink> 
      }
    </header>
  )
} 