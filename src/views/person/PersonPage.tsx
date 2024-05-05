import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import PersonFilmItems from "../../Components/PersonFilmItem/PersonFilmItems";
import { useGetPersonByIdQuery } from "../../store/films/api.kinopoisk";

export default function PersonPage(): ReactElement {

  const id = Number(useParams().id);

  const {data: personData} = useGetPersonByIdQuery(id);

  const birth = new Date(personData?.birthday || '').toLocaleString('ru-RU').split(',')[0];

  return (
    <div className="person-page">
      <h1>{personData?.name} ({personData?.enName})</h1>
      <p>{birth} ({personData?.age})</p>
      <p>{personData?.birthPlace[0]?.value} {personData?.birthPlace[1]?.value} {personData?.birthPlace[2]?.value}</p>
      <img src={personData?.photo} alt={personData?.name} width="320px" height="500px"/>
      <PersonFilmItems movies={personData?.movies || []} />
    </div>
  )
} 