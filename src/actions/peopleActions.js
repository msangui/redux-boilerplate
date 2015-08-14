import {
    ADD_PEOPLE,
    ADD_PEOPLE_SUCCESS,
    ADD_PEOPLE_FAIL,
    RESET_PEOPLE_SAVED
    } from './actionTypes';

import {add as addPeople} from '../api/peopleApi';

export function add(data) {
  return {
    types: [ADD_PEOPLE, ADD_PEOPLE_SUCCESS, ADD_PEOPLE_FAIL],
    promise: addPeople(data)
  };
}

export function resetSavedState() {
    return {
        type: RESET_PEOPLE_SAVED
    };
}
