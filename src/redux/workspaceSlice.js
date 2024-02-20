import { createSlice } from '@reduxjs/toolkit';

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    elements: [],
  },
  reducers: {
    addElement: (state, action) => {
      state.elements = [...state.elements, { ...action.payload }];
    },
  },
});

export const { addElement } = workspaceSlice.actions;

export default workspaceSlice.reducer;
