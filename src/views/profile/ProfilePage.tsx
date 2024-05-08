import { ReactElement, useState } from "react";
import Profile from "../../Components/Profile/Profile";

export default function ProfilePage(): ReactElement {

  return (
    <div className="page">
      <div className="page__heading">
        <Profile />
      </div>
    </div>
  )
} 