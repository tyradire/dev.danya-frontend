import { ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import { login } from "../../api/userAPI";
import { REGISTRATION_ROUTE } from "../../data/constants";
import '../../ui.scss';

export default function Login(): ReactElement {

  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const submitLogin = (e: any) => {
    e.preventDefault();
    console.log('сабмит')
    login(emailInput, passwordInput)
    .then(res =>
      { if (res.success) {
          console.log('успех', res)
        } else {
          console.log('ошибка', res)
        }
      }
    )
  }

  return (
    <form className="form" onSubmit={submitLogin}>
      <h3 className="form__title">Вход</h3>
      <label htmlFor="login-email">Почта</label>
      <input type="text" id="login-email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
      <label htmlFor="login-password">Пароль</label>
      <input type="password" id="login-password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
      <div className="form__controls">
        <span className="form__error">{errorMessage}</span>
        <button type="submit">Войти</button>
      </div>
      <div className="form__additional">
        <p>Нет аккаунта?</p>
        <NavLink to={REGISTRATION_ROUTE} className="form__link">Создать</NavLink>
      </div>
    </form>
  )
} 