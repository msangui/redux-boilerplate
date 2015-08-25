import {
	WIKI_LOAD,
	WIKI_LOAD_SUCCESS,
  WIKI_LOAD_FAIL
} from './actionTypes';
import {getWiki} from '../api/wikiApi.js';


export function load(title) {
  return {
    types: [WIKI_LOAD, WIKI_LOAD_SUCCESS, WIKI_LOAD_FAIL],
    promise: getWiki(title)
  };
}
