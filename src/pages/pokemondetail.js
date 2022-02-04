import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Table, Button, CardImg, Modal, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import Endpoint from '../endpoint/endpoint';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { catchPokemon } from '../redux/action/action.ownedPoke';

const url = new Endpoint();

const PokemonDetil = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ownedPokemons = useSelector(state => state.ownedPokemon.pokemons);

    const tidakBerhasilTangkap = () => toast.error("Pokemon broke the pokeball! Try again!");
    const berhasilTangkap = () => toast.success("Pokemon saved!");

    const [pokemon, setPokemon] = useState([]);
    const [modalNickname, setModalNickname] = useState(false);
    const [txtNickname, setTxtNickname] = useState("");
    const [hasilValidasiTxtNickname, setHasilValidasiTxtNickname] = useState("");
    const [validasiTxtNickname, setValidasiTxtNickname] = useState(false);

    const resultOwnedPokemons = Object.values(ownedPokemons.reduce((c, { name, owns }) => {
        c[name] = c[name] || { name, owns: [] };
        c[name].owns = c[name].owns.concat(Array.isArray(owns) ? owns : [owns]);
        return c;
    }, {}))
    
    useEffect(() => {
        url.getDetailPokemon(location.pathname).then((data) => {
            setPokemon(data.data);
        });
    }, [location.pathname]);

    const getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const tangkapPokemon = () => {
        if (getRandomInt(2) === 1) {
            setModalNickname(true);
        } else {
            tidakBerhasilTangkap();
        }
    };

    const closeModalNickname = () => {
        setModalNickname(false);
        setTxtNickname("");
        setValidasiTxtNickname(false);
        setHasilValidasiTxtNickname("");
    };

    const handleBlurTxtNickname = () => {
        if (txtNickname) {
            setValidasiTxtNickname(false);
            setHasilValidasiTxtNickname("");
        }
        else {
            setValidasiTxtNickname(true);
            setHasilValidasiTxtNickname("Nickname must be filled");
        }
    }

    const checkSavePokemon = () => {
        let valid = true;

        if (txtNickname === '') {
            valid = false
            setValidasiTxtNickname(true);
            setHasilValidasiTxtNickname("Nickname must be filled");
        } else {
            resultOwnedPokemons.length > 0
                && resultOwnedPokemons.forEach((poke) => {
                    if (poke.name === name) {
                        poke.owns.forEach(own => {
                            own === txtNickname && <>{valid = false}{setValidasiTxtNickname(true)}{setHasilValidasiTxtNickname("That Nickname already exist!")}</>;
                        });
                    }
                })
        }
        if (valid === true) {
            savePokemon();
        }
    }

    const savePokemon = () => {
        dispatch(catchPokemon({ pokemons: [{ name, owns: [txtNickname] }] }));
        closeModalNickname();
        berhasilTangkap();
        setTimeout(() => {
            window.history.back();
        }, 2000);
    };

    const { id, name, height, weight, base_experience } = pokemon;

    return (
        <>
            <Row style={{ marginTop: '2rem' }}>
                {
                    pokemon &&
                    <>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <Card style={{ border: '2px solid #3c5aa6', alignItems: 'center', borderRadius: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                <CardBody>
                                    <Row>
                                        <Col md={12} style={{ borderBottom: '2px solid #3c5aa6', alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                            <h1>
                                                {name}
                                            </h1>
                                        </Col>
                                        <Col md={4} style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                            <CardImg
                                                alt="pokemon-pic"
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                top
                                                width="100%"
                                            />
                                        </Col>
                                        <Col md={8} style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "60%" }}>No.</td>
                                                        <th style={{ width: "40%" }}>{id}</th>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "60%" }}>Type</td>
                                                        <th style={{ width: "40%" }}>
                                                            {
                                                                pokemon.types &&
                                                                pokemon.types.map((type, index) => {
                                                                    return (
                                                                        <span key={index}>
                                                                            {type['type']['name']}<br />
                                                                        </span>
                                                                    );
                                                                })
                                                            }
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "60%" }}>Height</td>
                                                        <th style={{ width: "40%" }}>{height}</th>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "60%" }}>Weight</td>
                                                        <th style={{ width: "40%" }}>{weight}</th>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "60%" }}>Base XP</td>
                                                        <th style={{ width: "40%" }}>{base_experience}</th>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "60%" }}>Abilities</td>
                                                        <th style={{ width: "40%" }}>
                                                            {
                                                                pokemon.abilities &&
                                                                pokemon.abilities.map((ability, index) => {
                                                                    return (
                                                                        <span key={index}>
                                                                            {ability['ability']['name']}<br />
                                                                        </span>
                                                                    );
                                                                })
                                                            }
                                                        </th>
                                                    </tr>
                                                    {
                                                        pokemon.stats &&
                                                        pokemon.stats.map((stat, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ width: "60%" }}>{stat['stat']['name']}</td>
                                                                    <th style={{ width: "40%" }}>{stat.base_stat}</th>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </Col>
                                        <Row style={{ marginBottom: '1rem', marginLeft: '0px' }}>
                                            <Col md={4} style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                                <Button block color="secondary" size="lg" onClick={() => { window.history.back() }}>Back</Button>
                                            </Col>
                                            <Col md={8} style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                                <Button block color="primary" size="lg" onClick={tangkapPokemon}>Catch Pokemon</Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={3}></Col>
                    </>
                }
                <Modal isOpen={modalNickname} size="lg">
                    <div style={{ width: '100%', padding: '1em' }}>
                        <div
                            style={{ float: 'right', cursor: 'pointer', fontWeight: 700, border: '0px solid #cccccc' }}
                            onClick={closeModalNickname}>X
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 700 }}>Give Your Pokemon a Nickname</span>
                    </div>
                    <ModalBody>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label>Nickname</Label>
                                    <Input
                                        className="text-normal-global"
                                        type="text"
                                        name="text"
                                        placeholder="Nickname"
                                        value={txtNickname}
                                        onChange={(e) => {
                                            setTxtNickname(e.target.value)
                                        }}
                                        onBlur={handleBlurTxtNickname}
                                        style={validasiTxtNickname ? { border: '1px solid red' } : { border: '1px solid #e2e7f1' }}
                                    />
                                    <span style={validasiTxtNickname ? { color: '#F86C6B', width: '100%', fontSize: '80%' } : { visibility: 'collapse', width: '100%' }}>{hasilValidasiTxtNickname}</span>
                                </FormGroup>
                            </Col>
                            <Col md={12} style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                <Button color="primary" size="sm" onClick={checkSavePokemon}>Save Pokemon</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
                <ToastContainer />
            </Row>
        </>
    );
};

export default PokemonDetil;