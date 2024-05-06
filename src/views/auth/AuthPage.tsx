import { ReactElement, useState } from "react";
import './auth.scss';
import { useLocation } from "react-router-dom";
import Login from "../../Components/Login/Login";
import Registration from "../../Components/Registration/Registration";

export default function AuthPage(): ReactElement {

  const location = useLocation();
  const locationPath = location.pathname;

  return (
    <div className="auth">
      {
        locationPath === '/login'
        ? <Login />
        : <Registration />
      }
    </div>
  )
} 