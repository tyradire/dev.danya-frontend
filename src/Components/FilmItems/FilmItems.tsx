import { ReactElement, useEffect, useState } from "react";
import { IFilm, StorageFilmItem } from "../../models/models";
import FilmItem from "../FilmItem/FilmItem";

export default function FilmItems({data}: {data: IFilm[]}): ReactElement {

  const [likedFilms, setLikedFilms] = useState<StorageFilmItem[]>(JSON.parse(localStorage.getItem('likedFilms') || '[]'));

  useEffect(() => {
    if (!localStorage.getItem('likedFilms')) {
      localStorage.setItem('likedFilms', JSON.stringify(likedFilms))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('likedFilms', JSON.stringify(likedFilms))
  }, [likedFilms])

  console.log('123 ', localStorage.getItem('likedFilms'))

  return (
    <ul className="film-items">
      { 
        data.map((film: IFilm) => {
          return <FilmItem 
                  name={film.name}
                  year={film.year}
                  genres={film.genres} 
                  movieLength={film.movieLength || film.seriesLength} 
                  rating={film.rating.kp > 0 ? film.rating.kp : film.rating.imdb}
                  poster={film.poster?.previewUrl}
                  top={film.top250}
                  key={film.id}
                  id={film.id}
                  isSeries={(film.seriesLength||0) > film.movieLength}
                  isLiked={likedFilms.some(storageId => storageId.filmId === film.id)}
                  likedFilms={likedFilms}
                  setLikedFilms={setLikedFilms}
                  />
        })
      }
    </ul>
  )
}