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
  comment?: string;
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
  comment?: string;
}

interface SessionState {
  loading: boolean;
  sessions: Session[];
  currentSession: Session | null;
  lastSeriesFromExercise: Serie[];
}

// Define the initial state using that type
const initialState: SessionState = {
  loading: false,
  sessions: [],
  currentSession: null,
  lastSeriesFromExercise: [],
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

export const getLastSeries = createAsyncThunk(
  'sport/lastSeriesFromExercise',
  async (exerciseId: number): Promise<Serie[]> => {
    console.log('lastSeriesFromExercise', exerciseId);
    const response = await axios.get(`${API_URLS.sport.lastSeries}/${exerciseId}`);
    console.log('lastSeriesFromExercise 2', response);
    return response.data;
  }
);

export const deleteSeries = createAsyncThunk(
  'sport/deleteSeries',
  async (serieIds: number[]): Promise<Session> => {
    console.log('deleteSerie', serieIds);
    const response = await axios.delete(API_URLS.sport.serie, { data: serieIds });
    console.log('deleteSerie 2', response);
    // update session
    return response.data;
  }
);

export const setSessionAsFinished = createAsyncThunk(
  'sport/setSessionAsFinished',
  async (sessionId: number): Promise<Session> => {
    console.log('finishSession', sessionId);
    const response = await axios.patch(`${API_URLS.sport.finishSession}/${sessionId}`);
    console.log('finishSession 2', response);
    // update session
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
    // TODO Il faudrait mieux gérer les loaders (session, series, update, ...)
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
    builder.addCase(deleteSeries.fulfilled, (state, action) => {
      state.loading = false;
      console.log('deleted', action.payload);
      state.currentSession = action.payload;
      //TODO : update only one serie, to avoid refreshing the whole session component
    });
    builder.addCase(getLastSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.lastSeriesFromExercise = action.payload;
    });
    builder.addCase(setSessionAsFinished.fulfilled, (state, action) => {
      state.loading = false;
      state.currentSession = null;
    });
  },
});

export const { chooseSession } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectSports = (state: RootState) => state.sport
export const selectCurrentSession = (state: RootState) => state.session.currentSession;
export const selectIsSessionLoading = (state: RootState) => state.session.loading;
export const selectAllSessions = (state: RootState) => state.session.sessions;
export const lastSeriesFromExercise = (state: RootState) => state.session.lastSeriesFromExercise;

export default sessionSlice.reducer;
