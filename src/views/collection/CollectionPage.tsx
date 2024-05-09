import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import { useGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";

export default function CollectionPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const likedData = useSelector((state: RootState) => state.liked)
  const [queryToApi, setQueryToApi] = useState<string>('&id=' + likedData.liked.join('&id='));

  const {data: likedFIlmsData} = useGetFilmsByIdQuery(queryToApi);

  useEffect(() => {
    setQueryToApi('&id=' + likedData.liked.join('&id='));
  }, [likedData])

  return (
    <div className="search">
      <FilmItems data={likedFIlmsData || []} isMobileDevice={isMobileDevice} />
      {/* <FilmItems isMobileDevice={isMobileDevice} /> */}
    </div>
  )
} 