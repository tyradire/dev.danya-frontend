import { ReactElement, useEffect, useState } from "react";
import { IFilm } from "../../models/models";
import FilmItem from "../FilmItem/FilmItem";
import FilmItemMobile from "../FilmItem/FilmItemMobile";
import defaultMoviePreview from '../../assets/images/default-movie-preview-image.svg';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function FilmItems({data, isMobileDevice}: {data: IFilm[], isMobileDevice: boolean}): ReactElement {

  // const likedData = useSelector((state: RootState) => state.liked)

  // const [likedFilms, setLikedFilms] = useState<number[]>(likedData.liked);

  return (
    <ul className="film-items">
      { 
        data.map((film) => {
          if (isMobileDevice) {
            return <FilmItem
              name={film.name}
              year={film.year}
              genres={film.genres} 
              movieLength={film.movieLength || film.seriesLength} 
              rating={film.rating.kp > 0 ? film.rating.kp : film.rating.imdb}
              poster={film.poster?.previewUrl || defaultMoviePreview}
              top={film.top250}
              key={film.id}
              id={film.id}
              isSeries={(film.seriesLength||0) > film.movieLength}
            />
          } else {
            return <FilmItemMobile
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
            />
          }
        })
      }
    </ul>
  )
}