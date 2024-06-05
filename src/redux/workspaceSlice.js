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
    // Component form handlers
    addStateToComponent: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          if (action.payload.edit) {
            return {
              ...el,
              data: {
                ...el.data,
                states: [
                  ...el.data.states.filter(
                    (s) => s.name !== action.payload.name
                  ),
                  {
                    name: action.payload.name,
                    defaultValue: action.payload.defaultValue,
                  },
                ],
              },
            };
          }
          return {
            ...el,
            data: { ...el.data, states: [...el.data.states, action.payload] },
          };
        }
        return el;
      });
    },
    deleteStateFromComponent: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              states: el.data?.states?.filter((s) => s.name !== action.payload),
            },
          };
        }
        return el;
      });
    },
  },
});

export const workspaceSliceSelectors = {
  selectedElement: ({ workspace }) => {
    return workspace.elements?.find(
      (el) => el.workspaceId === workspace.selectedElement
    );
  },
};

export const {
  addElement,
  setSelectedElement,
  addStateToComponent,
  deleteStateFromComponent,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
