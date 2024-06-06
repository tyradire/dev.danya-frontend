import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import './more-button.scss';

export default function MoreButton({count, setCount}: {count: number, setCount: Dispatch<SetStateAction<number>>}): ReactElement {

  return (
    <button className="more-button" onClick={() => setCount(count + 30)}>
      Показать ещё
    </button>
  )
} 