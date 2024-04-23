type FilmCountriesType = {
  name: string;
}
type FilmGenresType = {
  name: string;
}
type FilmNamesType = {
  language: string;
  name: string;
  type: string;
}
type FilmRatingType = {
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
}

type FilmItemType = {
  ageRating: number;
  alternativeName: string;
  poster: {
    previewUrl: string,
    url: string
  }
  countries: FilmCountriesType[];
  description: string;
  genres: FilmGenresType[];
  id: number;
  isSeries: boolean;
  movieLength: number;
  name: string;
  names: FilmNamesType[];
  rating: FilmRatingType;
  seriesLength?: number;
  shortDescription: string;
  top250: number;
  totalSeriesLength?: number;
  type: string;
  votes: {
    await: number;
    filmCritics: number;
    imdb: number;
    kp: number;
    russianFilmCritics: number;
  };
  year: number;
}

export type { 
  FilmItemType,
  FilmNamesType,
  FilmRatingType,
  FilmGenresType,
  FilmCountriesType
};