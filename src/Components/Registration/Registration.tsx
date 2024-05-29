import { jwtDecode } from "jwt-decode";
import { isValidElement, ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../../api/userAPI";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../data/constants";
import { FetchedUserState } from "../../models/models";
import { setSuccessStatus } from "../../store/interface/interfaceReducer";
import { setUserData } from "../../store/user/userReducer";
import '../../ui.scss';

export default function Registration(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const submitRegistration = async (e: any) => {
    e.preventDefault();
    registration(emailInput, passwordInput)
    .then(res =>
      { if (res.success) {
          setErrorMessage('');
          setEmailInput('');
          setPasswordInput('');
          setPasswordConfirmInput('');
          setIsSuccess(true)
        } else {
          setErrorMessage(res.result)
          setIsSuccess(false)
        }
      }
    )
    .then(res => 
      login(emailInput, passwordInput)
      .then(res =>
        { if (res.success) {
            let data: FetchedUserState = jwtDecode(res.result);
            dispatch(
              setUserData({id: data.id, email: data.email, isAuth: res.success}));
              navigate(HOME_ROUTE);
          } else {
            setErrorMessage(res.result);
          }
        }
      )
    )
    .catch(err => console.error(err))
    dispatch(setSuccessStatus({status: 'success'}))
  }

  useEffect(() => {
    if (!passwordInput) return;
    setSubmitDisabled(passwordInput !== passwordConfirmInput);
  }, [passwordInput, passwordConfirmInput])

  useEffect(() => {
    console.log(isValidElement(emailInput))
  }, [emailInput])

  return (
    <form className="form" onSubmit={submitRegistration}>
      <h3 className="form__title">Регистрация</h3>
      <label htmlFor="registration-email">Почта</label>
      <input type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" id="registration-email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
      <label htmlFor="registration-password">Пароль</label>
      <input type="password" id="registration-password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
      <label htmlFor="registration-password-confirm">Подтверждение пароля</label>
      <input type="password" id="registration-password-confirm" value={passwordConfirmInput} onChange={(e) => setPasswordConfirmInput(e.target.value)}/>
      <div className="form__controls">
        <span className={isSuccess ? "form__status form__status_success" : "form__status form__status_error"}>{errorMessage}</span>
        <button className="form__button" type="submit" disabled={submitDisabled}>Зарегистрироваться</button>
      </div>
      <div className="form__additional">
        <p>Уже зарегистрированы?</p>
        <NavLink to={LOGIN_ROUTE} className="form__link">Войти</NavLink>
      </div>
    </form>
  )
} 