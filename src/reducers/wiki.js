import {
  WIKI_LOAD,
  WIKI_LOAD_SUCCESS,
  WIKI_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false
};

export default function wiki(state = initialState, action = {}) {
  switch (action.type) {
  case WIKI_LOAD:
    return {
      ...state,
      loading: true
    };
  case WIKI_LOAD_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      data: action.result,
      error: null
    };
  case WIKI_LOAD_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      data: null,
      error: action.error
    };
  default:
    return state;
  }
}

export function isLoaded(globalState) {
  return globalState.wiki && globalState.wiki.loaded;
}
