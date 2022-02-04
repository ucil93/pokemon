import React from 'react';
import { Row, Col, Nav, NavItem, NavLink, Button, Table } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { releasePokemon } from '../redux/action/action.ownedPoke';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyPokemon = () => {
    const pokemons = useSelector(state => state.ownedPokemon.pokemons);
    const dispatch = useDispatch();
    const berhasilRelease = () => toast.success("Pokemon released!");

    const resultPokemons = Object.values(pokemons.reduce((c, { name, owns }) => {
        c[name] = c[name] || { name, owns: [] };
        c[name].owns = c[name].owns.concat(Array.isArray(owns) ? owns : [owns]);
        return c;
    }, {}))

    const releasePokemonButton = (name, own) => {
        let releasedPokemon = resultPokemons.map(poke => {
            if (poke.name === name) {
                poke.owns = poke.owns.filter(o => {
                    return o === own ? false : true;
                });
            }
            return poke;
        });
        
        releasedPokemon = releasedPokemon.filter(poke => {
            return poke.owns.length > 0 ? true : false;
        });
        
        dispatch(releasePokemon({ pokemons: releasedPokemon }));
        berhasilRelease();
    };

    return (
        <>
            <Row style={{ marginTop:'2rem' }}>
                <Col md={3}>
                </Col>
                <Col md={6} >
                    <Nav justified tabs>
                        <NavItem>
                            <NavLink href="/">
                                <h3><b>Pokemon List</b></h3>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active href="/mypokemon">
                                <h3><b>My Pokemon List</b></h3>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
            <Row style={{ padding:'2rem' }}>
                {
                    resultPokemons.length > 0 ?
                        <Col md={12} style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            <Table striped >
                                <thead>
                                    <tr>
                                        <th style={{ width: "40%" }}>
                                            Pokemon
                                        </th>
                                        <th style={{ width: "20%" }}>
                                            Owned
                                        </th>
                                        <th style={{ width: "40%" }}>
                                            Nickname
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resultPokemons.map((pokemon) => {
                                            return (
                                                <tr key={pokemon}>
                                                    <td style={{ width: "40%" }}>{pokemon.name}</td>
                                                    <td style={{ width: "20%" }}>{pokemon.owns.length}</td>
                                                    <td style={{ width: "40%" }}>
                                                        {
                                                            pokemon.owns.map(own => {
                                                                return (
                                                                    <Row key={own} style={{ marginBottom:'5px' }}>
                                                                        <Col md={8}><strong>{own}</strong></Col>
                                                                        <Col md={4}>
                                                                            <Button
                                                                                color="danger"
                                                                                onClick={() => releasePokemonButton(pokemon.name, own)}
                                                                            >
                                                                                Release
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                );
                                                            })
                                                        }
                                                    </td>
                                                </tr>
                                            
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    :
                    <Col md={12} style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        <h1><b>Pokemon Doesn't Exist, Catch Pokemon!</b></h1>
                    </Col>
                } 
            <ToastContainer />
            </Row>
        </>
    );
};
  
export default MyPokemon;
