import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import Loader from "../../Components/Loader/Loader";
import Tags from "../../Components/Tags/Tags";
import { IFilm } from "../../models/models";
import { useGetTopRatingFilmsQuery, useSearchFilmsQuery, useLazySearchFilmsForMainPageQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";

export default function MainPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const likedData = useSelector((state: RootState) => state.liked)

  const [mainQuery, setMainQuery] = useState<string>('');
  const [mainFilmsData, setMainFilmsData] = useState<IFilm[] | undefined>([])

  const {data: fetchedFilms, isFetching: defaultFetching} = useSearchFilmsQuery('');
  const [fetchGenres, {data: fetchedGenresFilms, isLoading}] = useLazySearchFilmsForMainPageQuery();

  useEffect(() => {
    setMainFilmsData(fetchedFilms)
  }, [defaultFetching])

  useEffect(() => {
    if (mainQuery.length < 1) return;
    fetchGenres(mainQuery);
  }, [mainQuery])
  useEffect(() => {
    if (fetchedGenresFilms === undefined) return;
    setMainFilmsData(fetchedGenresFilms);
  }, [fetchedGenresFilms])

  return (
    <div className="main">
      <Tags likedGenres={likedData.likedGenres} setMainQuery={setMainQuery} />
      {
        isLoading
        ? <Loader />
        : <FilmItems data={mainFilmsData || []} isMobileDevice={isMobileDevice} />
      }
    </div>
  )
} 