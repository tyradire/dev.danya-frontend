import { ReactElement, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { registration } from "../../api/userAPI";
import { LOGIN_ROUTE } from "../../data/constants";
import '../../ui.scss';

export default function Registration(): ReactElement {

  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const submitRegistration = async (e: any) => {
    e.preventDefault();
    registration(emailInput, passwordInput)
    .then(res =>
      { if (res.success) {
          setErrorMessage('Профиль создан!');
          setEmailInput('');
          setPasswordInput('');
          setIsSuccess(true)
        } else {
          setErrorMessage(res.result)
          setIsSuccess(false)
        }
      }
    )
  }

  return (
    <form className="form" onSubmit={submitRegistration}>
      <h3 className="form__title">Регистрация</h3>
      <label htmlFor="registration-email">Почта</label>
      <input type="text" id="registration-email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
      <label htmlFor="registration-password">Пароль</label>
      <input type="password" id="registration-password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
      <div className="form__controls">
        <span className={isSuccess ? "form__status form__status_success" : "form__status form__status_error"}>{errorMessage}</span>
        <button type="submit">Зарегистрироваться</button>
      </div>
      <div className="form__additional">
        <p>Уже зарегистрированы?</p>
        <NavLink to={LOGIN_ROUTE} className="form__link">Войти</NavLink>
      </div>
    </form>
  )
} 