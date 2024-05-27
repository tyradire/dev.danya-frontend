import { ReactElement, useEffect, useState } from "react";
import FilmItems from "../../Components/FilmItems/FilmItems";
import Tags from "../../Components/Tags/Tags";
import { useGetTopRatingFilmsQuery, useSearchFilmsQuery } from "../../store/films/api.kinopoisk";

export default function MainPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const qqwrwr = "rating.kp=8-10&";

  const {data: fetchedFilms} = useSearchFilmsQuery('');

  return (
    <div className="main">
      <Tags />
      <FilmItems data={fetchedFilms || []} isMobileDevice={isMobileDevice} />
    </div>
  )
} 