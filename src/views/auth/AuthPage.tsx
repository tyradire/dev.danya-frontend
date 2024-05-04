import { ReactElement, useState } from "react";
import './auth.scss';
import '../../ui.scss';
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../data/constants";

export default function AuthPage(): ReactElement {

  const [isLoginPage, setIsLoginPage] = useState<boolean>(useLocation().pathname === '/registration');
  console.log(isLoginPage)

  return (
    <div className="auth">
      <form className="auth__form form">
        <h3 className="form__title">
          {
            !isLoginPage
            ? 'Вход'
            : 'Регистрация'
          }
        </h3>
        <label htmlFor="auth-email">Почта</label>
        <input type="text" id="auth-email"/>
        <label htmlFor="auth-password">Пароль</label>
        <input type="password" id="auth-password"/>
        <button type="submit">Войти</button>
        {
          !isLoginPage
          ? <NavLink to={REGISTRATION_ROUTE} className="auth__link" onClick={() => setIsLoginPage(!isLoginPage)}>Регистрация</NavLink>
          : <NavLink to={LOGIN_ROUTE} className="auth__link" onClick={() => setIsLoginPage(!isLoginPage)}>Вход</NavLink>
        }
        
      </form>
    </div>
  )
} 