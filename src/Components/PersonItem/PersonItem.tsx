import { ReactElement } from "react";
import { Link } from "react-router-dom";
import './person-item.scss';

export default function PersonItem({person, role, profession, photo, id}: {person: string, role: string, profession: string, photo: string, id: number}): ReactElement {

  return (
    <li className="person-item">
      <Link to={`/person/${id}`}>
        <p className="person-item__name">{person}</p>
        <p className="person-item__role">{role}</p>
        <img src={photo}  className="person-item__photo" alt={person} width="80px" height="80px"/>
        <p className="person-item__profession">{profession}</p>
      </Link>
    </li>
  )
} 