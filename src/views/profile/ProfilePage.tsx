import { ReactElement, useState } from "react";
import Profile from "../../Components/Profile/Profile";

export default function ProfilePage(): ReactElement {

  const [userName, setUserName] = useState<string>('Пользователь');
  const [userId, setUserId] = useState<number>(0);

  return (
    <div className="profile-page">
      <h1 className="page__title">Профиль</h1>
      <Profile id={userId} name={userName} />
    </div>
  )
} 