import { routerReducer } from 'react-router-redux';
import { handleActionsReducor } from '../utils/reducer-helper';
import user from './user';

export const reducerTree = {
  routing: routerReducer,
  user: {
    name: handleActionsReducor('', user.userName),
    age: handleActionsReducor('', user.userAge), //typeof user
  },
};

export default reducerTree;
