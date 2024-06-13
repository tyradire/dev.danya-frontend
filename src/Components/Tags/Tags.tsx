import { ReactElement, useState } from "react";
import Tag from "./Tag";
import './tags.scss';

export default function Tags({setMainQuery, likedGenres, setCurrentPage}: {setMainQuery: any, likedGenres: string[], setCurrentPage: any}): ReactElement {

  const [activeTag, setActiveTag] = useState<number>(-1);

  function setGenre(genre: string) {
    setCurrentPage(1);
    setMainQuery(genre)
  }

  return (
      <ul className="tags">
        {
          likedGenres.map((genre, i) => 
            <Tag content={genre} key={i} id={i} activeId={activeTag} setActiveTag={setActiveTag} trigger={setGenre} />
          )
        }
      </ul>
  )
} 