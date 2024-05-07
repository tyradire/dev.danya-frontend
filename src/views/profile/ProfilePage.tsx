import { ReactElement, useState } from "react";
import Profile from "../../Components/Profile/Profile";
import { UserState } from "../../store/user/userReducer";

export default function ProfilePage({userData}: {userData: UserState}): ReactElement {

  const [userName, setUserName] = useState<string>(userData.name);

  return (
    <div className="page">
      <div className="page__heading">
        <Profile id={userData.id} name={userName} />
      </div>
    </div>
  )
} 