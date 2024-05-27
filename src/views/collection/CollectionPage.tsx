import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import { useGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";
import { setLikedGenres } from "../../store/user/likedReducer";

export default function CollectionPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {
  const dispatch = useDispatch();

  const collectionData = useSelector((state: RootState) => state.collection)

  const [queryToApi, setQueryToApi] = useState<string>('&id=' + collectionData?.collection?.join('&id=') || '');

  const {data: collectionFIlmsData, isSuccess} = useGetFilmsByIdQuery(queryToApi);

  useEffect(() => {
    setQueryToApi('&id=' + collectionData?.collection?.join('&id='));
  }, [collectionData])

  return (
    <div className="collection">
      {
        collectionFIlmsData?.length
        ? <FilmItems data={collectionFIlmsData || []} isMobileDevice={isMobileDevice} />
        : <p className="page__notice">Коллекция пуста.</p>
      }
    </div>
  )
} 