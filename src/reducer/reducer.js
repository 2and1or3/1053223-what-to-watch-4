import {combineReducers} from "redux";

import {reducer as dataReducer} from './data/data';
import {reducer as applicationReducer} from './application/application';
import {reducer as userReducer} from './user/user';
import NameSpace from './namespace';

const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.APPLICATION]: applicationReducer,
  [NameSpace.USER]: userReducer,
});

export {reducer};
