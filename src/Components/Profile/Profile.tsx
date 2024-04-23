import { ReactElement, useState } from "react";
import defaultUserIcon from '../../assets/images/default-user-icon.svg';
import './profile.scss';

export default function Profile({id, name}: {id: number; name: string}): ReactElement {

  return (
    <div className="profile">
      <div className="profile__avatar">
        <img src={defaultUserIcon} alt={`изображение профиля ${name}`}/>
      </div>
      <p className="profile__id">id#{id}</p>
    </div>
  )
} 