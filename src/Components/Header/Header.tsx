import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mobileProfileIcon from '../../assets/images/default-user-icon.svg';
import './Header.scss';

export default function Header({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const [movieCounter, setMovieCounter] = useState<number>(0);

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">Главная</Link>
          </li>
          <li className="nav__item">
            <Link to="/search">Поиск</Link>
          </li>
          <li className="nav__item">
            <Link to="collection">Моя коллекция 
              { movieCounter > 0 &&
                <span>{movieCounter}</span>
              }
            </Link>
          </li>
        </ul>
      </nav>
      {
        isMobileDevice ? 
        <Link to="profile" className="nav__profile">Профиль</Link> 
        : 
        <Link to="profile" className="nav__mobile-profile">
          <img src={mobileProfileIcon}/>
        </Link>
      }
    </header>
  )
} 