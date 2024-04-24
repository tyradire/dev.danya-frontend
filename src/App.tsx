import { ReactElement, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import { MOBILE_DEVICE_SIZE } from "./data/constants";

import CollectionPage from "./views/collection/CollectionPage";
import FilmPage from "./views/film/FilmPage";
import MainPage from "./views/main/MainPage";
import ProfilePage from "./views/profile/ProfilePage";
import SearchPage from "./views/search/SearchPage";

export default function App(): ReactElement {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const getWindowSize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resize", getWindowSize);
  }, [])

  const isMobile = MOBILE_DEVICE_SIZE <= windowWidth;

  return (
    <div className="app">
      <Header isMobileDevice={isMobile} />
      <main className="page">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/search/:id" element={<FilmPage />}/>
          <Route path="/collection" element={<CollectionPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </main>
    </div>
  )
} 