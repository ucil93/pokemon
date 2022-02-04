import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ownedPokemon from './reducer.ownedPoke';

export default history =>
  combineReducers({
    router: connectRouter(history),
    ownedPokemon: ownedPokemon,
  });
