import { EDITOR_ACTION_TYPE } from '../../../costants/editorActionTypes';

export const setScale = (scale) => {
  return {
    type: EDITOR_ACTION_TYPE.SET_SCALE,
    payload: scale,
  };
};
