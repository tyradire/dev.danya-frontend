import { KeyboardEventHandler, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import defaultUserIcon from '../../assets/images/default-user-icon.svg';
import './profile.scss';

import {setUserData} from '../../store/user/userReducer';
import { HOME_ROUTE } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { setLikedFilms } from "../../store/user/likedReducer";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function Profile({id, name}: {id: number; name: string}): ReactElement {

  const likedData = useSelector((state: RootState) => state.liked)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>(name)

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
    console.log('id ',id)
  }

  const test = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  }

  const handleLogout = () => {
    dispatch(setUserData({id: 0, email: '', name: '', role: '', isAuth: false}));
    dispatch(setLikedFilms([]));
    localStorage.removeItem('token');
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
          <input value={`id ${id}`} className="profile__field" type="text" readOnly />
          <input value={`Просмотрено: ${likedData.liked.length}`} className="profile__field" type="text" readOnly />
        </form>
      </div>
      <button className="page__button button button__type_logout" onClick={handleLogout}>Выйти</button>
    </div>
  )
} 