import { ReactElement, useState } from "react";
import Profile from "../../Components/Profile/Profile";
import { store } from "../../store/store";
import { UserState } from "../../store/user/userReducer";

export default function ProfilePage({userData}: {userData: UserState}): ReactElement {

  const [userName, setUserName] = useState<string>(userData.name);
  //const [userId, setUserId] = useState<number>(userData.id);



  return (
    <div className="page">
      <h1 className="page__title">Профиль</h1>
      <div className="page__heading">
        <Profile id={userData.id} name={userName} />
        <button className="page__button button__type_logout">Выйти</button>
      </div>
    </div>
  )
} 