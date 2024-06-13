import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilmItems from "../../Components/FilmItems/FilmItems";
import Loader from "../../Components/Loader/Loader";
import Tags from "../../Components/Tags/Tags";
import { IFilm } from "../../models/models";
import { useGetTopRatingFilmsQuery, useSearchFilmsQuery, useLazySearchFilmsForMainPageQuery, useLazyGetTopFilmsQuery } from "../../store/films/api.kinopoisk";
import { RootState } from "../../store/store";

export default function MainPage({isMobileDevice}: {isMobileDevice: boolean}): ReactElement {

  const likedData = useSelector((state: RootState) => state.liked)

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [mainQuery, setMainQuery] = useState<string>('');
  const [mainFilmsData, setMainFilmsData] = useState<IFilm[]>([]);
  const [filmsFinished, setFilmsFinished] = useState<boolean>(true)

  //const {data: fetchedFilms, isFetching: defaultFetching} = useSearchFilmsQuery('');
  const [fetchGenres, {data: fetchedGenresFilms, isLoading: filmsForMainPageIsLoading}] = useLazySearchFilmsForMainPageQuery();
  const [fetchFilms, {isLoading: topFilmsIsLoading}] = useLazyGetTopFilmsQuery();

  const scrollHandler = ():void => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 && filmsFinished) {
      setFetching(true);
    }
  }

  // useEffect(() => {
  //   setMainFilmsData(fetchedFilms||[])
  // }, [defaultFetching])

  useEffect(() => {
    if (fetching && filmsFinished) {
      fetchFilms(currentPage)
      .then((res: any) => {
        if (res.data?.length === 0) setFilmsFinished(false);
        setMainFilmsData(mainFilmsData => mainFilmsData.concat(res.data))
        setFetching(false)
      });
      setCurrentPage(currentPage => currentPage + 1)
    }
  }, [fetching])

  // useEffect(() => {
  //   if (fetchedGenresFilms === undefined) return;
  //   setMainFilmsData(fetchedGenresFilms);
  // }, [fetchedGenresFilms])

  useEffect(() => {
    if (mainQuery.length < 1) return;
    fetchGenres(mainQuery)
    .then((res:any) => {
      setMainFilmsData(res.data)
      setFilmsFinished(false)
    })
  }, [mainQuery])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className="main">
      <Tags likedGenres={likedData.likedGenres} setMainQuery={setMainQuery} />
      {
        topFilmsIsLoading
        ? <Loader />
        : <FilmItems data={mainFilmsData} isMobileDevice={isMobileDevice} />
      }
    </div>
  )
} 