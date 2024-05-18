import { KeyboardEventHandler, ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import defaultUserIcon from '../../assets/images/default-user-icon.svg';
import './profile.scss';

import {renameUser, setUserData} from '../../store/user/userReducer';
import { HOME_ROUTE } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { setLikedFilms } from "../../store/user/likedReducer";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { logout, rename } from "../../api/userAPI";

export default function Profile(): ReactElement {

  const userData = useSelector((state: RootState) => state.user)
  const likedData = useSelector((state: RootState) => state.liked)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>(userData.name)

  useEffect(() => {
    setUserName(userData.name)
  }, [userData])

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const test = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
      rename(userName)
      .then(res => dispatch(renameUser(res.data.user.name)))
      .catch(err => console.error(err))
      
    }
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  }

  const handleLogout = () => {
    logout(userData.id);
    dispatch(setUserData({id: 0, email: '', isAuth: false}));
    dispatch(setLikedFilms([]));
    localStorage.setItem('token', '');
    navigate(HOME_ROUTE);
  }

  return (
    <div className="profile">
      <div className="profile__avatar">
        <img src={defaultUserIcon} alt={`Аватар профиля ${name}`}/>
      </div>
      <div>
        <form className="profile__form">
          <input value={userName} className="profile__field profile__field_editable" type="text" onChange={changeUserName} onKeyDown={test} />
          <input value={`id ${userData.id}`} className="profile__field" type="text" readOnly />
          <input value={`Просмотрено: ${likedData?.liked?.length}`} className="profile__field" type="text" readOnly />
        </form>
      </div>
      <button className="page__button button button__type_logout" onClick={handleLogout}>Выйти</button>
    </div>
  )
} 