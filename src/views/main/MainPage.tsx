import { ReactElement, useEffect, useState } from "react";
import FilmItems from "../../Components/FilmItems/FilmItems";
import { useGetTopRatingFilmsQuery } from "../../store/films/api.kinopoisk";

export default function MainPage(): ReactElement {

  const qqwrwr = "rating.kp=8-10";

  const {data: likedFIlmsData} = useGetTopRatingFilmsQuery(qqwrwr);

  return (
    <div className="main">
      <FilmItems data={likedFIlmsData || []} />
    </div>
  )
} 