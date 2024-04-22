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
  sportId: number
}

export interface WithToken<T> {
  body: T
  token: string | null
}

// Define a service using a base URL and expected endpoints
export const sportApi = createApi({
  reducerPath: 'sportApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URLS.sport.all }), // TODO
  tagTypes: ['Sport', 'Exercise'],

  endpoints: (builder) => ({
    fetchSports: builder.query<Sport[], void>({
      query: () => ``,
      providesTags: ['Sport']
    }),
    fetchExercises: builder.query<Exercise[], number>({
      query: (sportId) => `${sportId}/exercise`,
      providesTags: ['Exercise']
    }),
    addSport: builder.mutation<Sport, WithToken<Partial<Sport>>>({
      query: ({ body, token }) => ({
        url: ``,
        method: 'post',
        body: body,
        headers: { authorization: `Bearer ${token}` }
      }),

      invalidatesTags: ['Sport'],
    }),
    addExercise: builder.mutation<Exercise, WithToken<Partial<Exercise>>>({
      query: ({ body, token }) => ({
        url: `${body.sportId}/exercise`,
        method: 'post',
        body: body,
        headers: { authorization: `Bearer ${token}` }
      }),
      invalidatesTags: ['Exercise'],

    }),
  }),


})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchSportsQuery, useFetchExercisesQuery, useAddSportMutation, useAddExerciseMutation } = sportApi