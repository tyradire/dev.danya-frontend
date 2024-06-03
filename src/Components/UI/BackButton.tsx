import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import './back-btn.scss';

export default function BackButton(): ReactElement {

  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      Назад
    </button>
  )
} 