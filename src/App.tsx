import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getLikedMovies } from "./api/collectionAPI";
import Header from "./Components/Header/Header";
import { COLLECTION_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MOBILE_DEVICE_SIZE, MOVIE_ROUTE, PERSON_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "./data/constants";
import { RootState, store } from "./store/store";
import AuthPage from "./views/auth/AuthPage";

import CollectionPage from "./views/collection/CollectionPage";
import FilmPage from "./views/film/FilmPage";
import MainPage from "./views/main/MainPage";
import PersonPage from "./views/person/PersonPage";
import ProfilePage from "./views/profile/ProfilePage";
import SearchPage from "./views/search/SearchPage";

export default function App(): ReactElement {

  const userData = useSelector((state: RootState) => state.user)
  //const likedData = useSelector((state: RootState) => state.liked)

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const getWindowSize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resize", getWindowSize);
  }, [])

  const isMobile = MOBILE_DEVICE_SIZE <= windowWidth;

  useEffect(() => {
    getLikedMovies(userData.id)
  }, [userData.isAuth])

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
                <Route path={PROFILE_ROUTE} element={<ProfilePage userData={userData} />} />
              </>
            }

        </Routes>
      </main>
    </div>
  )
} 