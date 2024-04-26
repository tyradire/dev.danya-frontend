import { ReactElement, useEffect, useState } from "react";
import FilmItems from "../../Components/FilmItems/FilmItems";
import { StorageFilmItem } from "../../models/models";
import { useGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";

export default function CollectionPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const [likedFilms, setLikedFilms] = useState<StorageFilmItem[]>(JSON.parse(localStorage.getItem('likedFilms') || '[]'));
  const [testQuery, setTestQuery] = useState<string>('&id=' + likedFilms.map(elem => elem.filmId).join('&id='));

  const {data: likedFIlmsData} = useGetFilmsByIdQuery(testQuery);

  return (
    <div className="search">
      <FilmItems data={likedFIlmsData || []} isMobileDevice={isMobileDevice} />
      {/* <FilmItems isMobileDevice={isMobileDevice} /> */}
    </div>
  )
} 