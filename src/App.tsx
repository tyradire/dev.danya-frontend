import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getCollectionMovies } from "./api/collectionAPI";
import { getLikedMovies } from "./api/likedAPI";
import Header from "./Components/Header/Header";
import { COLLECTION_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MOBILE_DEVICE_SIZE, MOVIE_ROUTE, PERSON_ROUTE, PROFILE_ROUTE, RANDOMIZER_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "./data/constants";
import { RootState, store } from "./store/store";
import { jwtDecode } from "jwt-decode";

import AuthPage from "./views/auth/AuthPage";
import CollectionPage from "./views/collection/CollectionPage";
import FilmPage from "./views/film/FilmPage";
import MainPage from "./views/main/MainPage";
import PersonPage from "./views/person/PersonPage";
import ProfilePage from "./views/profile/ProfilePage";
import SearchPage from "./views/search/SearchPage";

import { getAllUserData, setUserData } from "./store/user/userReducer";
import { FetchedUserState, ProfileGenre } from "./models/models";
import { useDispatch } from "react-redux";
import { setCollectionFilms, setCollectionGenres } from "./store/user/collectionReducer";
import { getUserData } from "./api/userAPI";
import { setLikedFilms, setLikedGenres } from "./store/user/likedReducer";
import Modal from "./Components/UI/Modal";
import { useGetFilmsByIdQuery, useLazyGetFilmsByIdQuery } from "./store/films/api.kinopoisk";
import BackButton from "./Components/UI/BackButton";
import { getWishListMovies } from "./api/wishAPI";
import { setWishlistFilmsIds } from "./store/user/wishlistReducer";
import RandomizerPage from "./views/randomizer/RandomizerPage";

export default function App(): ReactElement {
  const dispatch = useDispatch();
  const location = useLocation();

  const userData = useSelector((state: RootState) => state.user)
  const likedData = useSelector((state: RootState) => state.liked)
  const collectionData = useSelector((state: RootState) => state.collection)

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [localUserData, setLocalUserData] = useState<string>(localStorage.getItem('token') || '');
  const [queryToApi, setQueryToApi] = useState<string>('&id=' + likedData?.liked?.join('&id=') || '');
  const [queryToApiCollection, setQueryToApiCollection] = useState<string>('&id=' + collectionData?.collection?.join('&id=') || '');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const [likedFilmsIds, setLikedFilmsIds] = useState<string[]>([])
  const [genresInCollection, setGenresInCollection] = useState<ProfileGenre[]>([])

  const {data: collectionFIlmsData, isSuccess: collectionIsSuccess} = useGetFilmsByIdQuery({query: queryToApiCollection, page: currentPage});
  const {data: likedFIlmsData, isSuccess} = useGetFilmsByIdQuery({query: queryToApi, page: currentPage});
  const [fetchFilms, {data: LcollectionFIlmsData, isSuccess: LcollectionIsSuccess}] = useLazyGetFilmsByIdQuery();

  if (collectionIsSuccess && genresInCollection.length < 1) {
    const collectionGenres: Array<any[]> = [];
    const genresCollection: any = {};
    const genresArray: any = [];

    collectionFIlmsData?.forEach(filmGenres => collectionGenres.push(filmGenres.genres))
    collectionGenres.forEach(genres => {
      genres.forEach(genre => {
        if (!genresCollection[genre.name]) {
          genresCollection[genre.name] = 1;
        } else {
          genresCollection[genre.name]++
        }
      })
    })

    for (let i = 0; i < Object.keys(genresCollection).length; i++) {
      genresArray.push({genre: Object.keys(genresCollection)[i], count: Object.values(genresCollection)[i]})
    }
    genresArray.sort((a: any, b: any) => a.count < b.count ? 1 : -1);

    setGenresInCollection([...genresArray])
  }
  
  // useEffect(() => {
  //   fetchFilms()
  // }, [])

  useEffect(() => {
    const getWindowSize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resize", getWindowSize);
  }, [])

  useEffect(() => {
    setQueryToApi('&id=' + likedData?.liked?.join('&id='));
  }, [likedData])

  useEffect(() => {
    setQueryToApiCollection('&id=' + collectionData?.collection?.join('&id='));
  }, [collectionData])

  useEffect(() => {
    if (likedFilmsIds.length < 1) return;
    dispatch(setLikedGenres(likedFilmsIds))
  }, [likedFilmsIds])

  const isMobile = MOBILE_DEVICE_SIZE <= windowWidth;

  useEffect(() => {
    if (!userData.isAuth) return;
    
    getUserData()
    .then(res => {
    dispatch(getAllUserData(res))})
    .catch(err => { console.log('err ',err)
    })

    getCollectionMovies()
    .then(res => {
      dispatch(setCollectionFilms(res.data.watched))
      if (res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken)
      }
    })
    .catch(err => {
        console.log(err)
    })

    getLikedMovies()
    .then(res => {
      dispatch(setLikedFilms(res.data.liked))
      if (res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken)
      }
    })
    .catch(err => {
      console.log(err)
    })

    getWishListMovies()
    .then(res => {
      dispatch(setWishlistFilmsIds(res.data.wish))
      if (res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken)
      }
    })
    
  }, [userData.isAuth])

  useEffect(() => {
    if (!localUserData.length) return;

    let data: FetchedUserState = jwtDecode(localUserData);
    dispatch(setUserData({id: data.id, email: data.email, isAuth: true}));
  }, [localUserData])

  useEffect(() => {
    if (genresInCollection.length < 1) return;
    dispatch(setCollectionGenres(genresInCollection))
  }, [genresInCollection])

  if (isSuccess && likedFilmsIds.length < 1) {
    const collectionGenres: Array<any[]> = [];
    const genresCollection: any = {};
    const genresArray: any = [];

    likedFIlmsData?.forEach(filmGenres => collectionGenres.push(filmGenres.genres))
    collectionGenres.forEach(genres => {
      genres.forEach(genre => {
        if (!genresCollection[genre.name]) {
          genresCollection[genre.name] = 1;
        } else {
          genresCollection[genre.name]++
        }
      })
    })

    for (let i = 0; i < Object.keys(genresCollection).length; i++) {
      genresArray.push({genre: Object.keys(genresCollection)[i], count: Object.values(genresCollection)[i]})
    }

    genresArray.sort((a: any, b: any) => a.count < b.count ? 1 : -1);
    setLikedFilmsIds([genresArray[0].genre, genresArray[1].genre, genresArray[2].genre])
  }

  return (
    <div className="app">
      <Header isMobileDevice={isMobile} isAuth={userData.isAuth} />
      <main className="page">
        {
          (location.pathname.split('/')[1] === 'search' && location.pathname.split('/')[2]) && <BackButton />
        }
        <Routes>

          <Route path={HOME_ROUTE} element={<MainPage isMobileDevice={isMobile}/>}/>
          <Route path={SEARCH_ROUTE} element={<SearchPage isMobileDevice={isMobile}/>}/>
          <Route path={MOVIE_ROUTE} element={<FilmPage />}/>
          <Route path={PERSON_ROUTE} element={<PersonPage />}/>

          <Route path={LOGIN_ROUTE} element={<AuthPage />}/>
          <Route path={REGISTRATION_ROUTE} element={<AuthPage />}/>
          
            {
              userData.isAuth &&
              <>
                <Route path={COLLECTION_ROUTE} element={<CollectionPage isMobileDevice={isMobile}/>}/>
                <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
                <Route path={RANDOMIZER_ROUTE} element={<RandomizerPage />}/>
              </>
            }

        </Routes>
      </main>
      <Modal />
    </div>
  )
} 