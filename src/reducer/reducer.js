import {combineReducers} from "redux";

import {reducer as dataReducer} from './data/data.js';
import {reducer as applicationReducer} from './application/application.js';
import NameSpace from './namespace.js';

const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.APPLICATION]: applicationReducer,
});

export {reducer};
