import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './tags.scss';

export default function Tags(): ReactElement {

  const likedData = useSelector((state: RootState) => state.liked)

  console.log(likedData.likedGenres[0])

  return (
    <ul className="tags">
      <li className="tags__item">не просмотренные</li>
      {
        likedData.likedGenres.map(genre => 
          <li className="tags__item">{genre}</li>
        )
      }
    </ul>
  )
} 