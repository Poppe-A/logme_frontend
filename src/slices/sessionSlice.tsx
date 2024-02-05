import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';
import { API_URLS } from '../urls';
import { stat } from 'fs';

interface Exercise {
  exerciseId: number;
  exerciseName: string;
  series: Serie[];
}

interface Serie {
  id: number;
  order: number;
  value: number;
  sessionId: number;
  exerciseId: number;
  exercise: {
    name: string;
  };
}

export interface Session {
  id: number;
  name: string;
  sportId: number;
  createdAt: Date;
  sportName: string;
  exercises: Exercise[];
}

export interface CreateSessionDto {
  sportId: number;
  name: string;
}

interface SessionState {
  sessions: Session[];
  currentSession: Session | null;
}

// Define the initial state using that type
const initialState: SessionState = {
  sessions: [],
  currentSession: null,
};

export const fetchUserSessions = createAsyncThunk('sport/fetchUserSessions', async () => {
  const response = await axios.get(API_URLS.sport.sessions);
  console.log('response.data', response.data);
  return response.data;
});

export const createNewSession = createAsyncThunk(
  'sport/createNewSession',
  async (session: CreateSessionDto) => {
    const response = await axios.post(API_URLS.sport.sessions, { data: session });
    console.log('response.data', response.data);
    return response.data;
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state.sessions);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSessions.fulfilled, (state, action) => {
      state.sessions = action.payload;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectSports = (state: RootState) => state.sport
export const selectCurrentSession = (state: RootState) => state.session.currentSession;
export const selectAllSessions = (state: RootState) => state.session.sessions;

export default sessionSlice.reducer;
