import React, { useState, useEffect } from 'react';
import Endpoint from '../endpoint/endpoint';
import { Row, Col, Card, CardBody, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const url = new Endpoint();

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [count, setCount] = useState(1);
    const ownedPokemons = useSelector(state => state.ownedPokemon.pokemons);
    let totalOwned = 0;
  
    useEffect(() => {
        url.getListPokemon().then((data) => {
                setPokemons(data.data);
            });
    }, []);
  
    const morePokemon = () => {
        url.getMorePokemon(count + 19).then((data) => {
            setPokemons(data.data);
            setCount((prevCount) => {
                return prevCount + 20;
            });
        });
    };
  
    const lessPokemon = () => {
        url.getMorePokemon(count - 21).then((data) => {
            setPokemons(data.data);
            setCount((prevCount) => {
                return prevCount - 20;
            });
        });
    };

    const resultOwnedPokemons = Object.values(ownedPokemons.reduce((c, { name, owns }) => {
        c[name] = c[name] || { name, owns: [] };
        c[name].owns = c[name].owns.concat(Array.isArray(owns) ? owns : [owns]);
        return c;
    }, {}))
  
    return (
        <Row>
            <Row style={{ marginTop:'2rem' }}>
                <Col md={3}>
                </Col>
                <Col md={6}>
                    <Nav justified tabs>
                        <NavItem>
                            <NavLink active href="/">
                                <h3><b>Pokemon List</b></h3>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/mypokemon">
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
                    pokemons['results'] &&
                        pokemons['results'].map((pokemon, index) => {

                            totalOwned =
                                resultOwnedPokemons.length > 0
                                    ? resultOwnedPokemons.filter(poke => {
                                        return poke.name === pokemon.name ? true : false;
                                    })
                                    : 0;

                            const id = count + index;

                            return (
                                <Col lg={3} md={3} sm={6} xs={12} key={index}>
                                    <Card style={{ border: '5px solid #3c5aa6', alignItems: 'center', borderRadius: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: '1rem' }}>
                                        <CardBody>
                                            <Link to={{ pathname: `/pokemon/${pokemon.name}` }} style={{ color:'black', textDecoration:'none' }}>
                                                <h3>{pokemon.name.toUpperCase()}</h3>
                                                <img
                                                    style={{ width: "150px", height: '150px' }}
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                    alt='pokemon-pic'
                                                />
                                                <h6>Owned :&nbsp;
                                                    {
                                                        totalOwned = totalOwned.length > 0 ? totalOwned[0].owns.length : 0
                                                    }
                                                </h6>
                                            </Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                }
            </Row>
            <Row>
                <Col lg={4} md={4} sm={2} xs={2}>
                </Col>
                <Col lg={2} md={2} sm={4} xs={4}>
                    <Button block color="success" outline size="lg" onClick={lessPokemon} style={{ border:'2px solid' }} disabled={count === 1}>Back</Button>
                </Col>
                <Col lg={2} md={2} sm={4} xs={4}>
                    <Button block color="success" outline size="lg" onClick={morePokemon} style={{ border:'2px solid' }}>Next</Button>
                </Col>
                <Col lg={4} md={4} sm={2} xs={2}>
                </Col>
            </Row>
        </Row>
    );
};
  
export default Home;
