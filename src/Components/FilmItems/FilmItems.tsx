import { ReactElement, useState } from "react";
import { IFilm } from "../../models/models";
import FilmItem from "../FilmItem/FilmItem";
import FilmItemMobile from "../FilmItem/FilmItemMobile";
import defaultMoviePreview from '../../assets/images/default-movie-preview-image.svg';
import ScrollButton from "../UI/ScrollButton";
import MoreButton from "../UI/MoreButton";

export default function FilmItems({data, isMobileDevice}: {data: IFilm[], isMobileDevice: boolean}): ReactElement {

  const [moviesVisibleCount, setMoviesVisibleCount] = useState<number>(30);

  return (
    <>
      <ul className="film-items">
        { 
          data.slice(0,moviesVisibleCount).map((film) => {
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
      <MoreButton count={moviesVisibleCount} setCount={setMoviesVisibleCount} />
      <ScrollButton visible={data.length > 10} />
    </>
  )
}