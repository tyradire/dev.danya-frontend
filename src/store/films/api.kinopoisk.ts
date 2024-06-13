import { IFilm, IFilmSingle, IPersonSingle, ServerResponse } from './../../models/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface MultipleArgs {
  query: string;
  page: number;
}

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoisk/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')
      headers.set('X-API-KEY', `${process.env.API_KEY}`)
      return headers
    }
  }),
  endpoints: build => ({
    searchFilms: build.query<IFilm[], string>({
      query: (search: string) => ({
        url: `movie/search?page=1&limit=100&query=${search}`
      }),
      transformResponse: (response: ServerResponse<IFilm>) => response.docs
    }),
    searchFilmsForMainPage: build.query<IFilm[], string>({
      query: (query: string) => ({
        url: `movie?&limit=50&rating.kp=7-10&votes.kp=500000-6666666&genres.name=${query}`
      }),
      transformResponse: (response: ServerResponse<IFilm>) => response.docs
    }),
    getTopFilms: build.query<IFilm[], number>({
      query: (page: number) => ({
        url: `movie?page=${page}&limit=50&rating.kp=8-10&votes.kp=500000-6666666`
      }),
      transformResponse: (response: ServerResponse<IFilm>) => response.docs
    }),
    getFilm: build.query<IFilmSingle, number>({
      query: (id: number) => ({
        url: `movie/${id}`
      })
    }),
    getFilmsById: build.query<IFilm[], MultipleArgs>({
      query: ({query, page}) => ({
        url: `movie?page=${page}&limit=50&selectFields=${query}`
      }),
      transformResponse: (response: ServerResponse<IFilm>) => response.docs
    }),
    getTopRatingFilms: build.query<IFilm[], string>({
      query: (query: string) => ({
        url: `movie?page=1&limit=250&${query}`
      }),
      transformResponse: (response: ServerResponse<IFilm>) => response.docs
    }),
    getPersonById: build.query<IPersonSingle, number>({
      query: (id: number) => ({
        url: `person/${id}`
      })
    })
  })
})

export const {
  useSearchFilmsQuery, 
  useGetFilmQuery, 
  useGetFilmsByIdQuery, 
  useGetTopRatingFilmsQuery, 
  useGetPersonByIdQuery,
  useLazySearchFilmsForMainPageQuery,
  useLazyGetFilmsByIdQuery,
  useLazyGetTopFilmsQuery
} = kinopoiskApi