import { ReactElement, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import { COLLECTION_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MOBILE_DEVICE_SIZE, MOVIE_ROUTE, PERSON_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "./data/constants";
import AuthPage from "./views/auth/AuthPage";

import CollectionPage from "./views/collection/CollectionPage";
import FilmPage from "./views/film/FilmPage";
import MainPage from "./views/main/MainPage";
import PersonPage from "./views/person/PersonPage";
import ProfilePage from "./views/profile/ProfilePage";
import SearchPage from "./views/search/SearchPage";

export default function App(): ReactElement {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isAuth, setIsAuth] = useState<boolean>(true);

  useEffect(() => {
    const getWindowSize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resize", getWindowSize);
  }, [])

  const isMobile = MOBILE_DEVICE_SIZE <= windowWidth;

  return (
    <div className="app">
      <Header isMobileDevice={isMobile} isAuth={isAuth} />
      <main className="page">
        <Routes>

          <Route path={HOME_ROUTE} element={<MainPage isMobileDevice={isMobile}/>}/>
          <Route path={SEARCH_ROUTE} element={<SearchPage isMobileDevice={isMobile}/>}/>
          <Route path={MOVIE_ROUTE} element={<FilmPage />}/>
          <Route path={PERSON_ROUTE} element={<PersonPage />}/>

          <Route path={LOGIN_ROUTE} element={<AuthPage />}/>
          <Route path={REGISTRATION_ROUTE} element={<AuthPage />}/>
          
            {
              isAuth &&
              <>
                <Route path={COLLECTION_ROUTE} element={<CollectionPage isMobileDevice={isMobile}/>}/>
                <Route path={PROFILE_ROUTE} element={<ProfilePage/>}/>
              </>
            }

        </Routes>
      </main>
    </div>
  )
} 