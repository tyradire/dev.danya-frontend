import { ReactElement } from "react";
import './scroll-button.scss';

export default function ScrollButton({visible}: {visible: boolean}): ReactElement {

  const scrollToTop = () => {
    window.scroll({top: 0, behavior: 'smooth'});
  }

  return (
    <button className={visible ? "scroll-button scroll-button_visible" : "scroll-button"} onClick={scrollToTop}>
      <svg fill="#fff5a1" width="42px" height="42px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M8 20.695l7.997-11.39L24 20.695z"/></svg>
    </button>
  )
} 