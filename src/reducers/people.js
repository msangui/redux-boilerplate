import {
    ADD_PEOPLE,
    ADD_PEOPLE_SUCCESS,
    ADD_PEOPLE_FAIL,
    RESET_PEOPLE_SAVED
    } from '../actions/actionTypes';

const initialState = {
    loading: false,
    saved: false,
    data: [],
    error: ''
};

export default function people(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_PEOPLE:
            return {
                ...state,
                loading: true
            };
        case ADD_PEOPLE_SUCCESS:
            return {
                loading: false,
                saved: true,
                error: '',
                data: state.data.concat([action.result])
            };
        case ADD_PEOPLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case RESET_PEOPLE_SAVED:
            return {
                ...state,
                saved: false
            };
        default:
            return state;
    }
}