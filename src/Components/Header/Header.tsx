import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import collectionIcon from '../../assets/images/collection-icon.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import { LOGIN_ROUTE } from "../../data/constants";
import { RootState } from "../../store/store";
import defaultUserAvatar from '../../assets/images/default-user-avatar.svg';
import defaultThemeIcon from '../../assets/images/theme-icon-default.svg';
import lightThemeIcon from '../../assets/images/theme-icon-light.svg';
import randomIcon from '../../assets/images/random-icon.svg';
import { useTheme } from "../../hooks/useTheme";
import './Header.scss';

export default function Header({isMobileDevice, isAuth}: {isMobileDevice: boolean, isAuth: boolean}): ReactElement {

  const userData = useSelector((state: RootState) => state.user)
  const collectionData = useSelector((state: RootState) => state.collection)
  const collectionCounter = collectionData?.collection?.length || 0

  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('default');
    } else {
      setTheme('light');
    }
  }

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <svg width="44px" height="44px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".6" fillRule="evenodd" clipRule="evenodd" d="M3 4h18a1 1 0 0 1 1 1v1H2V5a1 1 0 0 1 1-1z" fill="#FFFFFF"/><path opacity=".3" fillRule="evenodd" clipRule="evenodd" d="M5 2h14a1 1 0 0 1 1 1v1H4V3a1 1 0 0 1 1-1z" fill="#FFFFFF"/><path fillRule="evenodd" clipRule="evenodd" d="M1 6h22a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 2v3h3V8H1zm0 5v3h3v-3H1zm0 5v3h3v-3H1zM20 8v3h3V8h-3zm0 5v3h3v-3h-3zm0 5v3h3v-3h-3z" fill="#FFFFFF"/></svg>
        КИНОхаб
      </NavLink>
      <button className="button theme-button" onClick={toggleTheme}>
          {
            theme === 'default'
            ? <img src={lightThemeIcon} width="24px" height="24px" />
            : <img src={defaultThemeIcon} width="24px" height="24px" />
          }
      </button>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/search"
            className={({ isActive }) =>
            isActive ? "nav__link nav__status_active" : "nav__link"
          }
            >
              { isMobileDevice
                ? 'Поиск'
                : <img src={searchIcon} width="24px" height="24px" alt="иконка поиска" />
              }
            </NavLink>
          </li>
          {
            userData.isAuth &&
            <li className="nav__item">
              <NavLink to="collection"
              className={({ isActive }) =>
              isActive ? "nav__link nav__status_active" : "nav__link"
            }>
                { isMobileDevice
                  ? 'Моя коллекция'
                  : <img src={collectionIcon} width="24px" height="24px" alt="иконка коллекции" />
                } 
                { collectionCounter > 0 &&
                  <span>{collectionCounter || 0 }</span>
                }
              </NavLink>
            </li>
          }
          <li className="nav__item">
            <NavLink to="randomizer"
              className={({ isActive }) =>
              isActive ? "nav__link nav__status_active" : "nav__link"
            }>
              
              { isMobileDevice
               ? 'Рандом'
                : <img src={randomIcon} width="36px" height="36px" />
              }
            </NavLink>
          </li>
        </ul>
      </nav>
      {
        !isAuth 
        ? <NavLink to={LOGIN_ROUTE} className="nav__profile nav__profile_button">Войти</NavLink>
        : !isMobileDevice
        ? <NavLink to="profile" className="nav__mobile-profile">
            <img src={userData.avatar || defaultUserAvatar}/>
          </NavLink>
        : <NavLink to="profile" className="nav__profile">
            <img className="nav__avatar" src={userData.avatar || defaultUserAvatar} />
            {userData.name}
          </NavLink> 
      }
    </header>
  )
} 