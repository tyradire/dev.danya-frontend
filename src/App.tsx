import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";

import CollectionPage from "./views/collection/CollectionPage";
import FilmPage from "./views/film/FilmPage";
import MainPage from "./views/main/MainPage";
import ProfilePage from "./views/profile/ProfilePage";
import SearchPage from "./views/search/SearchPage";

export default function App(): ReactElement {
  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/search/:id" element={<FilmPage />}/>
          <Route path="/collection" element={<CollectionPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </main>
    </>
  )
} 