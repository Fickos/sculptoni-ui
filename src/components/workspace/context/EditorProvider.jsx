import { useReducer } from 'react';
import { EditorContext, EditorDispatchContext } from './EditorContext';
import { EDITOR_ACTION_TYPE } from '../../../costants/editorActionTypes';

function editorReducer(state, action) {
  switch (action.type) {
    case EDITOR_ACTION_TYPE.SET_SCALE: {
      return { ...state, scale: action.payload };
    }
    default:
      return state;
  }
}

const initialEditorState = {
  scale: 1,
};

// eslint-disable-next-line react/prop-types
export function EditorProvider({ children }) {
  const [editorInfo, dispatch] = useReducer(editorReducer, initialEditorState);

  return (
    <EditorContext.Provider value={editorInfo}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorContext.Provider>
  );
}
