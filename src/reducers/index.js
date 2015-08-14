import {createFormReducer} from 'redux-form';

import wiki from './wiki';
import counter from './counter';
import people from './people';
const personForm = createFormReducer('personForm', ['name', 'email', 'occupation']);
export {
    wiki,
    counter,
    people,
    personForm
}
