import { IFilm, IFilmSingle, ServerResponse } from './../../models/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY } from '../../data/constants';

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoisk/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')
      headers.set('X-API-KEY', API_KEY)
      return headers
    }
  }),
  endpoints: build => ({
    searchFilms: build.query<IFilm[], string>({
      query: (search: string) => ({
        url: `movie/search?page=1&limit=20&query=${search}`,
        params: {
          per_page: 20
        }
      }),
      transformResponse: (response: ServerResponse<IFilm>) => response.docs
    }),
    getFilm: build.query<IFilmSingle, number>({
      query: (id: number) => ({
        url: `movie/${id}`
      })
    })
  })
})

export const {useSearchFilmsQuery, useGetFilmQuery} = kinopoiskApi