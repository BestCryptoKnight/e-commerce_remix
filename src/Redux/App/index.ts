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
    requestStart: (state) => {
      state.loading = true;
    },

    requestSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },

    requestFailure(state) {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const data = (state: finalStateTypes) => state.app.data;
export const loading = (state: finalStateTypes) => state.app.loading;

export const { requestStart, requestSuccess, requestFailure } =
  appReducer.actions;

export default appReducer.reducer;
