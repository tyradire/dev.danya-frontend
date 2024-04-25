import { ReactElement } from "react";
import FilmItem from "../../Components/FilmItem/FilmItem";
import { IFilm } from "../../models/models";

export default function CollectionPage(): ReactElement {
  return (
    <div className="search">
      {/* <ul className="film-items">
        { 
          [].map((film: IFilm) => {
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
                    isLiked=
                    />
          })
        }
      </ul> */}
    </div>
  )
} 