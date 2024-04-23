import { ReactElement, useState } from "react";
import Profile from "../../Components/Profile/Profile";

export default function ProfilePage(): ReactElement {

  const [userName, setUserName] = useState<string>('Пользователь');
  const [userId, setUserId] = useState<number>(0);

  return (
    <div className="profile">
      <h1 className="page__title">{userName}</h1>
      <Profile id={userId} name={userName} />
    </div>
  )
} 