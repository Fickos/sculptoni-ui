import { createSlice } from '@reduxjs/toolkit';

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    elements: [],
    selectedElement: null,
  },
  reducers: {
    addElement: (state, action) => {
      state.elements = [...state.elements, { ...action.payload }];
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload ?? null;
    },
  },
});

export const { addElement, setSelectedElement } = workspaceSlice.actions;

export default workspaceSlice.reducer;
