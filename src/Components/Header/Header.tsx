import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import './Header.scss';

export default function Header(): ReactElement {

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
            <Link to="collection">Моя коллекция <span>{movieCounter}</span></Link>
          </li>
        </ul>
      </nav>
      <Link to="profile" className="nav__profile">Профиль</Link>
    </header>
  )
} 