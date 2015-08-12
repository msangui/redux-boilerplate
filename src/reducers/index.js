import {createFormReducer} from 'redux-form';

export wiki from './wiki';
export counter from './counter';
export const form = createFormReducer('form', ['name', 'email', 'occupation']);
