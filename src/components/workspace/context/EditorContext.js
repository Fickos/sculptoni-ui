import { createContext, useContext } from 'react';

export const EditorContext = createContext(null);
export const EditorDispatchContext = createContext(null);

export function useEditor() {
  return useContext(EditorContext);
}

export function useEditorDispatch() {
  return useContext(EditorDispatchContext);
}
