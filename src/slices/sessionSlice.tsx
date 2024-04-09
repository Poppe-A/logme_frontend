import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';
import { API_URLS } from '../urls';
import { SessionOptions } from '../pages/NewSessionPage';

export interface SessionExercise {
  id: number;
  name: string;
  description: string;
  series: Serie[];
}

export interface Serie {
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
  exercises: SessionExercise[];
  isFinished: Boolean;
}

export interface CreateSessionDto {
  sportId: number;
  name: string;
  sessionOptions?: SessionOptions;
}

export interface CreateSerieDto {
  sessionId: number;
  exerciseId: number;
  value?: number;
  order?: number;
}

export interface UpdateSerieDto {
  id: number;
  value: number;
  sessionId: number;
}

interface SessionState {
  loading: boolean;
  sessions: Session[];
  currentSession: Session | null;
}

// Define the initial state using that type
const initialState: SessionState = {
  loading: false,
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
    console.log('session', session);
    const response = await axios.post(API_URLS.sport.sessions, session);
    console.log('session creation response.data', response.data);
    return response.data;
  }
);

export const createSerie = createAsyncThunk('sport/createSerie', async (serie: CreateSerieDto) => {
  console.log('serie', serie);
  const response = await axios.post(API_URLS.sport.serie, serie);
  console.log('create sereie sess', response);
  return response.data;
});

export const updateSerie = createAsyncThunk(
  'sport/updateSerie',
  async (serie: UpdateSerieDto): Promise<Session> => {
    console.log('update serie', serie);
    const response = await axios.patch(API_URLS.sport.serie, serie);
    console.log('update sereie sess', response);
    return response.data;
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    chooseSession: (state, action: PayloadAction<number | null>) => {
      const sessionToSelect = state.sessions.find((session) => session.id === action.payload);
      if (sessionToSelect) {
        state.currentSession = sessionToSelect;
      } else {
        state.currentSession = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSessions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserSessions.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
    });
    builder.addCase(createNewSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewSession.fulfilled, (state, action) => {
      state.loading = false;
      //replace in allsessions
      state.currentSession = action.payload;
    });
    builder.addCase(createSerie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSerie.fulfilled, (state, action) => {
      console.log('action.', action.payload);
      state.loading = false;
      state.currentSession = action.payload;
    });
    builder.addCase(updateSerie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSerie.fulfilled, (state, action) => {
      state.loading = false;
      state.currentSession = action.payload;
      //TODO : update only one serie, to avoid refreshing the whole session component
    });
  },
});

export const { chooseSession } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectSports = (state: RootState) => state.sport
export const selectCurrentSession = (state: RootState) => state.session.currentSession;
export const selectIsSessionLoading = (state: RootState) => state.session.loading;
export const selectAllSessions = (state: RootState) => state.session.sessions;

export default sessionSlice.reducer;
