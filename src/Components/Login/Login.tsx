import { ReactElement, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../api/userAPI";
import { jwtDecode } from "jwt-decode";
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../../data/constants";
import { useDispatch } from "react-redux";
import {setUserData} from '../../store/user/userReducer';
import { FetchedUserState } from "../../models/models";
import '../../ui.scss';
import showIcon from '../../assets/images/show-eye-icon.svg';
import hideIcon from '../../assets/images/hide-eye-icon.svg';

export default function Login(): ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setSubmitDisabled(emailInput.length === 0 || passwordInput.length === 0)
  }, [emailInput, passwordInput])

  const submitLogin = (e: any) => {
    e.preventDefault();
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
    .catch(err => console.error(err))
  }

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let passwordInput: any = e.currentTarget.previousSibling;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else passwordInput.type = 'password';
    setShowPassword(!showPassword);
  }

  return (
    <form className="form" onSubmit={submitLogin}>
      <h3 className="form__title">Вход</h3>
      <label htmlFor="login-email">Почта</label>
      <input type="text" id="login-email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
      <div className="form__wrapper">
        <label htmlFor="login-password">Пароль</label>
        <input type="password" id="login-password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
        <button type="button" className="form__show-password" onClick={(e) => toggleShowPassword(e)}>
          <img src={showPassword ? hideIcon : showIcon} alt="показать пароль" width="16px" height="16px" />
        </button>
      </div>
      <div className="form__controls">
        <span className="form__error">{errorMessage}</span>
        <button className="form__button" type="submit" disabled={submitDisabled}>Войти</button>
      </div>
      <div className="form__additional">
        <p>Нет аккаунта?</p>
        <NavLink to={REGISTRATION_ROUTE} className="form__link">Создать</NavLink>
      </div>
    </form>
  )
} 