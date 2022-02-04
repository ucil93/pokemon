import { API } from "../helper/api";

export default class Endpoint {
    getListPokemon = () => {
        return API.get(`/pokemon`);
    };

    getMorePokemon = (offset) => {
        return API.get(`/pokemon?offset=${offset}&limit=20`);
    };

    getDetailPokemon = (name) => {
        return API.get(`${name}`);
    };
}