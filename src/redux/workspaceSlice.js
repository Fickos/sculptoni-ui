import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    setComponentName: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return { ...el, data: { ...el.data, name: action.payload } };
        }
        return el;
      });
    },
    setPageUrl: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return { ...el, data: { ...el.data, url: action.payload } };
        }
        return el;
      });
    },
    addProp: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: { ...el.data, props: [...el.data.props, action.payload] },
          };
        }
        return el;
      });
    },
    removeProp: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              props: el.data.props.filter((p) => p !== action.payload),
            },
          };
        }
      });
    },
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
    addEffect: (state, action) => {
      // TO DO: make sure that the action name is unique on the component level
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              effects: [
                ...el.data.effects,
                { ...action.payload, id: uuidv4() },
              ],
            },
          };
        }
        return el;
      });
    },
    removeEffect: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              effects: el.data.effects.filter(
                (eff) => eff.id !== action.payload
              ),
            },
          };
        }
        return el;
      });
    },
    addAction: (state, action) => {
      // TO DO: make sure that the action name is unique on the component level
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              actions: [
                ...el.data.actions,
                { ...action.payload, id: uuidv4() },
              ],
            },
          };
        }
        return el;
      });
    },
    editAction: (state, action) => {
      // TO DO: make sure that the action name is unique on the component level
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              actions: el.data.actions.map((a) => {
                if (a.id !== action.payload.id) {
                  return a;
                }
                return action.payload;
              }),
            },
          };
        }
        return el;
      });
    },
    removeAction: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              actions: el.data.actions.filter((a) => a.id !== action.payload),
            },
          };
        }
        return el;
      });
    },
    setHtmlContent: (state, action) => {
      state.elements = state.elements.map((el) => {
        if (el.workspaceId === state.selectedElement) {
          return {
            ...el,
            data: {
              ...el.data,
              return: action.payload,
            },
          };
        }
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
  suggestionsForEffectFunctions: ({ workspace }) => {
    const suggestions = [];
    // Suggestions can be handler functions from the element itself
    // Or the setState functions from element itself
    // Or any of the service / util function from the workspace
    if (workspace.selectedElement) {
      const selectedElObject = workspace.elements?.find(
        (el) => el.workspaceId === workspace.selectedElement
      ).data;
      for (let state of selectedElObject.states) {
        suggestions.push(
          'set' + state.name.charAt(0).toUpperCase() + state.name.slice(1)
        );
      }
    }
    return suggestions;
  },
  suggestionsForEffectDependencyArr: ({ workspace }) => {
    let suggestions = [];
    // Suggestions can be props or state from the element itself
    if (workspace.selectedElement) {
      const selectedElObject = workspace.elements?.find(
        (el) => el.workspaceId === workspace.selectedElement
      ).data;
      suggestions = [
        ...selectedElObject.props.map((p) => p),
        ...selectedElObject.states.map((s) => s.name),
      ];
    }
    return suggestions;
  },
};

export const {
  addElement,
  setSelectedElement,
  addStateToComponent,
  deleteStateFromComponent,
  setComponentName,
  setPageUrl,
  addProp,
  removeProp,
  addEffect,
  removeEffect,
  addAction,
  editAction,
  removeAction,
  setHtmlContent,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
