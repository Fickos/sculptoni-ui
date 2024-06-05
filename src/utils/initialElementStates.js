const initialComponentState = Object.freeze({
  name: '',
  states: [],
  effects: [],
  actions: [],
  return: '',
  imports: [],
});

const initialPageState = Object.freeze({
  ...initialComponentState,
  url: '',
});

const initialServiceState = Object.freeze({
  functions: [],
});

const initialUtilState = Object.freeze({
  functions: [],
});

const initialReduxState = Object.freeze({
  name: '',
  initialState: {},
  reducers: [],
  selectors: [],
});

export const initialElementStates = {
  component: initialComponentState,
  page: initialPageState,
  service: initialServiceState,
  util: initialUtilState,
  redux: initialReduxState,
};
