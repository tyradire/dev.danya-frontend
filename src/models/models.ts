export interface ServerResponse<T> {
  docs: T[]
  total: number
  limit: number
  page: number
  pages: number
}

export interface IFilm {
  internalNames: string[]
  name: string
  alternativeName?: string
  enName: string
  year: number
  genres: Genre[]
  countries: Country[]
  releaseYears: ReleaseYear[]
  id: number
  externalId: ExternalId
  names: Name[]
  type: string
  description?: string
  shortDescription: string
  logo?: Logo
  poster?: Poster
  backdrop?: Backdrop
  rating: Rating
  votes: Votes
  movieLength: number
  internalRating: number
  internalVotes: number
  isSeries: boolean
  ticketsOnSale: boolean
  totalSeriesLength?: number
  seriesLength?: number
  ratingMpaa?: string
  ageRating?: number
  top10: number
  top250: number
  typeNumber: number
  status?: string
}

export interface Genre {
  name: string
}

export interface Country {
  name: string
}

export interface ReleaseYear {
  start: number
  end: number
}

export interface ExternalId {
  imdb?: string
  kpHD?: string
  tmdb?: number
}

export interface Name {
  name: string
  language?: string
  type?: string
}

export interface Logo {
  url?: string
  previewUrl?: string
}

export interface Poster {
  url?: string
  previewUrl?: string
}

export interface Backdrop {
  url?: string
  previewUrl?: string
}

export interface Rating {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await?: number
}

export interface Votes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface IFilmSingle {
  a: number
  id: number
  externalId: ExternalId
  name: string
  alternativeName?: any
  enName: any
  names: Name[]
  type: string
  typeNumber: number
  year: number
  description?: string
  shortDescription: string
  slogan: any
  status: any
  rating: Rating
  votes: Votes
  movieLength: number
  totalSeriesLength: any
  seriesLength: any
  ratingMpaa: any
  ageRating: number
  poster: Poster
  backdrop?: Backdrop
  genres: Genre[]
  countries: Country[]
  persons: Person[]
  premiere: Premiere
  watchability: Watchability
  top10: any
  top250: any
  isSeries: boolean
  ticketsOnSale: boolean
  lists: string[]
  networks: any
  createdAt: string
  updatedAt: string
}

export interface Votes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface Country {
  name: string
}

export interface Person {
  id: number
  photo: string
  name: string
  enName: any
  description: any
  profession: string
  enProfession: string
}

export interface Premiere {
  country: any
  world: any
  russia: any
  digital: any
  cinema: any
  bluray: any
  dvd: any
}

export interface Watchability {
  items: WatchabilityItem[]
}

export interface WatchabilityItem {
  name: string
  logo: Logo
  url: string
}

export interface StorageFilmItem {
  filmId?: number,
  userRating?: number
}

export interface IPersonSingle {
  id: number
  name: string
  enName: string
  photo: string
  sex: string
  growth: number
  birthday: string
  death: any
  age: number
  birthPlace: BirthPlace[]
  deathPlace: any[]
  spouses: any[]
  countAwards: any
  profession: any[]
  facts: Fact[]
  movies: PersonMovie[]
  createdAt: string
  updatedAt: string
}

export interface BirthPlace {
  value: string
}

export interface Fact {
  value: string
}

export interface PersonMovie {
  id: number
  name?: string
  alternativeName?: string
  rating?: number
  general: boolean
  description?: string
  enProfession: string
}

export interface FetchedUserState {
  id: number
  email: string
  name: string
  role: string
}
