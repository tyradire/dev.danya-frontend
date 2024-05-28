import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './tags.scss';

export default function Tags({setMainQuery, likedGenres}: {setMainQuery: any, likedGenres: string[]}): ReactElement {

  function setGenre(genre: string) {
    setMainQuery(genre)
  }

  return (
    <ul className="tags">
      {
        likedGenres.map((genre, i) => 
          <li className="tags__item" key={i}>
            <button onClick={() => setGenre(genre)}>
              {genre}
            </button>
          </li>
        )
      }
    </ul>
  )
} 