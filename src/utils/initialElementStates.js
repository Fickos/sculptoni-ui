const initialComponentState = Object.freeze({
  name: '',
  path: 'src/components',
  props: [],
  states: [],
  effects: [],
  actions: [],
  return: '',
  imports: [],
});

const initialPageState = Object.freeze({
  ...initialComponentState,
  path: 'src/pages',
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
