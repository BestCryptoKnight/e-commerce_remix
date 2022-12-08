import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  isAuthorized: boolean;
  loading: boolean;
  hasErrors: boolean;
  data: [];
}

export interface finalStateTypes {
  app: {
    isAuthorized: boolean;
    loading: boolean;
    hasErrors: boolean;
    data: [];
  };
}

const initialState: initialStateTypes = {
  isAuthorized: false,
  loading: false,
  hasErrors: false,
  data: [],
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    requestStartInitilizeLoading: (state) => {
      state.loading = true;
    },

    requestSuccessUpdateStateData(state, { payload }) {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },

    requestFailure(state) {
      state.loading = false;
      state.hasErrors = true;
    },
    requestCompleteDisableLoading(state) {
      state.loading = false;
    },
  },
});

export const data = (state: finalStateTypes) => state.app.data;
export const loading = (state: finalStateTypes) => state.app.loading;

export const {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestFailure,
  requestCompleteDisableLoading,
} = appReducer.actions;

export default appReducer.reducer;
