import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { PersonMovie } from "../../models/models";
import './person-film.scss';

export default function PersonFilmItem({movie}: {movie: PersonMovie}): ReactElement {

  return (
    <li className="person-film">
      <Link to={`/search/${movie.id}`}>
        {
          movie.alternativeName && <p>{movie.alternativeName}</p>
        }
        {
          movie.name && <p>{movie.name}</p>
        }
        {
          movie.enProfession === 'actor' ? <p>актёры</p> : ''
        }
        <p>{movie.rating}</p>
      </Link>
    </li>
  )
}