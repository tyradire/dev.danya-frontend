import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './modal.scss';

export default function Modal(): ReactElement {
  const interfaceData = useSelector((state: RootState) => state.interface);

  return (
    <div className={interfaceData.isOpened ? "modal modal_opened" : "modal"}>
      <p className={`modal__message modal__message_${interfaceData.status}`}>{interfaceData.modalMessage}</p>
    </div>
    // <div className={true ? "modal modal_opened" : "modal"}>
    //   <p className={`modal__message modal__message_error`}>Вы не зарегистрированы</p>
    // </div>
  )
} 