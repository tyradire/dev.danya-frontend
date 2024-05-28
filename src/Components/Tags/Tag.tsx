import { ReactElement, useState } from "react";
import './tags.scss';

export default function Tag({content, id, activeId, setActiveTag, trigger}: 
  {
    content: string, 
    id: number, 
    activeId: number, 
    setActiveTag: any, 
    trigger: any
  }): 

  ReactElement {
  
  function setGenre(genre: string) {
    trigger(genre)
    setActiveTag(id)
  }

  return (
    <li className={activeId === id ? "tags__item tags__item_active" : "tags__item"}>
      <button onClick={() => setGenre(content)}>
        {content}
      </button>
    </li>
  )
} 