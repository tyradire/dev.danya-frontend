import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import { useGetFilmsByIdQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";
import { setLikedGenres } from "../../store/user/likedReducer";
import './collection.scss';

export default function CollectionPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const collectionData = useSelector((state: RootState) => state.collection)
  const likedData = useSelector((state: RootState) => state.liked)

  const [filmsType, setFilmsType] = useState<string>('collection');
  const [queryToApiCollection, setQueryToApiCollection] = useState<string>('&id=' + collectionData?.collection?.join('&id=') || '');
  const [queryToApiLiked, setQueryToApiLiked] = useState<string>('&id=' + likedData?.liked?.join('&id=') || '');

  const {data: collectionFIlmsData} = useGetFilmsByIdQuery(queryToApiCollection);
  const {data: likedFIlmsData} = useGetFilmsByIdQuery(queryToApiLiked);

  useEffect(() => {
    setQueryToApiCollection('&id=' + collectionData?.collection?.join('&id='));
  }, [collectionData])

  useEffect(() => {
    setQueryToApiLiked('&id=' + likedData?.liked?.join('&id='));
  }, [likedData])

  useEffect(() => {
    console.log(filmsType)
  }, [filmsType])

  return (
    <div className="collection">

        <fieldset className="collection__switch">
          
          <input type="radio" name="collection" value="watched" id="allCollection" onChange={(e) => setFilmsType(e.target.value)} defaultChecked/>
          <label className="collection__switch-item" htmlFor="allCollection">Просмотренные</label>

          <input type="radio" name="collection" value="liked" id="onlyLiked" onChange={(e) => setFilmsType(e.target.value)}/>
          <label className="collection__switch-item" htmlFor="onlyLiked">Любимое</label>

          <input type="radio" name="collection" value="wish" id="onlyWish" onChange={(e) => setFilmsType(e.target.value)} disabled={true}/>
          <label className="collection__switch-item" htmlFor="onlyWish">Желаемое</label>

        </fieldset>

      {
        filmsType === 'watched' && collectionFIlmsData?.length
        ? <FilmItems data={collectionFIlmsData || []} isMobileDevice={isMobileDevice} />
        : filmsType === 'liked' && likedFIlmsData?.length
        ? <FilmItems data={likedFIlmsData || []} isMobileDevice={isMobileDevice} />
        : <p className="page__notice">Коллекция пуста.</p>
      }
    </div>
  )
} 