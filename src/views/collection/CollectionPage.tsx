import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import { useGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";

export default function CollectionPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const likedData = useSelector((state: RootState) => state.liked)

  const {data: likedFIlmsData} = useGetFilmsByIdQuery('&id=' + likedData.liked.map(elem => elem).join('&id='));

  return (
    <div className="search">
      <FilmItems data={likedFIlmsData || []} isMobileDevice={isMobileDevice} />
      {/* <FilmItems isMobileDevice={isMobileDevice} /> */}
    </div>
  )
} 