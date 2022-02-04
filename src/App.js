import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home';
import MyPokemon from './pages/mypokemon';
import PokemonDetail from './pages/pokemondetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/mypokemon" element={<MyPokemon />}></Route>
                <Route exact path="/pokemon/:name" element={<PokemonDetail />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
