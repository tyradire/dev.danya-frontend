import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import PersonFilmItems from "../../Components/PersonFilmItem/PersonFilmItems";
import { useGetPersonByIdQuery } from "../../store/films/api.kinopoisk";
import './person.scss';

export default function PersonPage(): ReactElement {

  const id = Number(useParams().id);

  const {data: personData} = useGetPersonByIdQuery(id);

  const birth = new Date(personData?.birthday || '').toLocaleString('ru-RU').split(',')[0];

  return (
    <div className="person-page">
      <h1 className="person-page__name">{personData?.name} ({personData?.enName})</h1>
      <p className="person-page__age">{birth} ({personData?.age})</p>
      <p className="person-page__place">{personData?.birthPlace[0]?.value} {personData?.birthPlace[1]?.value} {personData?.birthPlace[2]?.value}</p>
      <img src={personData?.photo} alt={personData?.name} width="320px" height="500px"/>
      <PersonFilmItems movies={personData?.movies || []} />
    </div>
  )
} 