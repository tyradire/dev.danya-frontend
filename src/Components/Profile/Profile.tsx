import { KeyboardEventHandler, ReactElement, useState } from "react";
import defaultUserIcon from '../../assets/images/default-user-icon.svg';
import './profile.scss';

export default function Profile({id, name}: {id: number; name: string}): ReactElement {

  const [likedFilmsCounter, setLikedFilmsCounter] = useState<number>(JSON.parse(localStorage.getItem('likedFilms') || '[]').length);
  const [userName, setUserName] = useState<string>(name)

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const test = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
    if (e.keyCode === 32) {
      e.preventDefault();
    }
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
          <input value={`Просмотрено: ${likedFilmsCounter}`} className="profile__field" type="text" readOnly />
        </form>
      </div>
    </div>
  )
} 