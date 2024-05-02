import { ReactElement } from "react";
import './person.scss';

export default function PersonItem({person, role, profession, photo}: {person: string, role: string, profession: string, photo: string}): ReactElement {

  return (
    <li className="person">
      <p className="person__name">{person}</p>
      <p className="person__role">{role}</p>
      <img src={photo}  className="person__photo" alt={person} width="80px" height="80px"/>
      <p className="person__profession">{profession}</p>
    </li>
  )
} 