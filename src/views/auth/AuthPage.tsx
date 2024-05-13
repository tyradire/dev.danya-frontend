import { ReactElement, useState } from "react";
import './auth.scss';
import { useLocation } from "react-router-dom";
import Login from "../../Components/Login/Login";
import Registration from "../../Components/Registration/Registration";
import Modal from "../../Components/UI/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
      <Modal />
    </div>
  )
} 