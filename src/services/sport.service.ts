// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { error } from 'console'
import { API_URLS } from '../urls'

export interface Sport {
  name: string
  id: number
}

export interface Exercise {
  name: string
  id: number
  description: string
}

// Define a service using a base URL and expected endpoints
export const sportApi = createApi({
  reducerPath: 'sportApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URLS.sport.all }), // TODO
  endpoints: (builder) => ({
    fetchSports: builder.query<Sport[], void>({
      query: () => ``,
    }),
    fetchExercises: builder.query<Exercise[], number>({
      query: (sportId) => `${sportId}/exercise`,
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchSportsQuery, useFetchExercisesQuery } = sportApi