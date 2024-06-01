import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './profile.scss';
import defaultUserAvatar from '../../assets/images/default-user-avatar.svg';
import {renameUser, setUserAvatar, setUserData} from '../../store/user/userReducer';
import { HOME_ROUTE } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { setCollectionFilms } from "../../store/user/collectionReducer";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { logout, rename, submitUserAvatar } from "../../api/userAPI";

export default function Profile(): ReactElement {

  const userData = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>(userData.name)
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loadedAvatar, setLoadedAvatar] = useState<any>(null);
  const [newAvatarFromSever, setNewAvatarFromServer] = useState<string>('');
  const [avatarButtonDisabled, setAvatarButtonDisabled] = useState<boolean>(true);

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
    dispatch(setCollectionFilms([]));
    localStorage.setItem('token', '');
    navigate(HOME_ROUTE);
  }

  const changeAvatar = (e: any) => {
    if (
      !e.target.value.toLowerCase().endsWith('svg') &&
      !e.target.value.toLowerCase().endsWith('jpg') &&
      !e.target.value.toLowerCase().endsWith('jpeg') &&
      !e.target.value.toLowerCase().endsWith('gif') &&
      !e.target.value.toLowerCase().endsWith('png')) {
        return;
      }
    if (!e.target.files[0]) return;
    setAvatarPreview(URL.createObjectURL(e.target.files[0]))
    setLoadedAvatar(e.target.files[0])
    setAvatarButtonDisabled(false)
  }

  const submitAvatar = () => {
    const formData = new FormData(); 
    formData.append('img', loadedAvatar)
    submitUserAvatar(formData)
    .then(res => dispatch(setUserAvatar(res.data.avatar)))
    .catch(err => console.log(err))
    setAvatarButtonDisabled(true)
    setLoadedAvatar(null);
  }

  return (
    <div className="profile">
      <form  className="profile__avatar-form">
        <label htmlFor="profile-avatar">
          <img src={avatarPreview || userData.avatar || defaultUserAvatar} alt={`Аватар профиля ${userData.name}`} height="80px" width="80px"/>
          <div className="cover"></div>
          <input className="profile__avatar" type="file" onChange={(e) => changeAvatar(e)} id="profile-avatar" accept='image/svg,image/jpg,image/jpeg,image/gif,image/png' />
        </label>
        <button type="button" className="profile__button" disabled={avatarButtonDisabled} onClick={submitAvatar}>Обновить аватар</button>
      </form> 
      <div>
        <form className="profile__form">
          <input value={userName} className="profile__field profile__field_editable" type="text" onChange={changeUserName} onKeyDown={test} />
          <input value={`id ${userData.id}`} className="profile__field" type="text" readOnly />
        </form>
      </div>
      <button className="page__button button button__type_logout" onClick={handleLogout}>Выйти</button>
    </div>
  )
} 