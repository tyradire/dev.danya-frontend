import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getLikedMovies } from "./api/collectionAPI";
import Header from "./Components/Header/Header";
import { COLLECTION_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MOBILE_DEVICE_SIZE, MOVIE_ROUTE, PERSON_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "./data/constants";
import { RootState, store } from "./store/store";
import { jwtDecode } from "jwt-decode";

import AuthPage from "./views/auth/AuthPage";
import CollectionPage from "./views/collection/CollectionPage";
import FilmPage from "./views/film/FilmPage";
import MainPage from "./views/main/MainPage";
import PersonPage from "./views/person/PersonPage";
import ProfilePage from "./views/profile/ProfilePage";
import SearchPage from "./views/search/SearchPage";

import { getAllUserData, setAccessToken, setUserData, UserState } from "./store/user/userReducer";
import { FetchedUserState } from "./models/models";
import { useDispatch } from "react-redux";
import { setLikedFilms } from "./store/user/likedReducer";
import { getUserData } from "./api/userAPI";

export default function App(): ReactElement {
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user)

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [localUserData, setLocalUserData] = useState<string>(localStorage.getItem('token') || '')

  useEffect(() => {
    const getWindowSize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resize", getWindowSize);
  }, [])

  const isMobile = MOBILE_DEVICE_SIZE <= windowWidth;

  useEffect(() => { console.log('accessToken ', userData.accessToken )

    if (!userData.isAuth) return;
    
    getUserData()
    .then(res => {
    dispatch(getAllUserData(res))})
    .catch(err => { console.log('err ',err)
    })

    getLikedMovies()
    .then(res => {
      dispatch(setLikedFilms(res.data.liked))
      console.log('RES S SERVERA ',res)
      if (res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken)
      }
    })
    .catch(err => {
        console.log(err)
    })
  }, [userData.isAuth])

  useEffect(() => {
    if (!localUserData.length) return;

    let data: FetchedUserState = jwtDecode(localUserData);
    dispatch(setUserData({id: data.id, email: data.email, isAuth: true}));
  }, [localUserData])

  return (
    <div className="app">
      <Header isMobileDevice={isMobile} isAuth={userData.isAuth} />
      <main className="page">
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
              </>
            }

        </Routes>
      </main>
    </div>
  )
} 