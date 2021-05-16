import React, {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import axios from '../axios.js'
import { CircularProgress } from '@material-ui/core';
import {NavLink} from 'react-router-dom';

import './Pokemon.css'

function Pokemon({pokelist}) {
    const [pokemon, setPokemon] = useState(undefined);
    const [pokeNum, setPokeNum] = useState(0);
    const [imgLoad, setImgLoad] = useState(false)
    const len = pokelist.length
    let {name} = useParams();

    // console.log(pokeNum, pokelist)
    // const findPoke = (name) => {
    //     for(let pokemon of pokelist){
    //         if (name.toLowerCase() === pokemon.name.toLowerCase()){
    //             console.log(pokemon.name)
    //             return pokemon
    //         }
    //     }
    //     return undefined;
    // }
    // let chosen_pokemon = findPoke(name);

    useEffect( () => {
        axios.get(`/pokemon/${name}`)
            .then(response => {

                setPokemon(response.data)
                setPokeNum(response.data.id)
                setImgLoad(true)

            })
            .catch(error => console.log(error))
    }, [name])

    const resetPage = (num_change) => {
        setImgLoad(false)
        setPokeNum(pokeNum + num_change)
    }

    if(pokemon == undefined){
        return <CircularProgress/>
    }
    else if(pokemon){
        return (
            <div>
                <h2>{name} #{pokeNum}</h2>
                <div className='images'>

                    {imgLoad ? 
                        <img className='images__main' src={pokemon.sprites.other["official-artwork"].front_default}></img> 
                            : 
                        <div className='images__main'>
                            <CircularProgress disableShrink size={'30vh'} thickness={1.6}/>
                        </div>
                        
                    }   
                   
                    {/* <img id='main' src={pokemon.name != 'venusaur' ? pokemon.sprites.other["official-artwork"].front_default : "https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"}></img> */}
                    
                    {imgLoad ?
                        <div className="images__sprites">
                            <img src={pokemon.sprites.front_default}></img>
                            <img src={pokemon.sprites.front_shiny}></img>
                        </div>
                        :
                        <div className="images__sprites">
                            <CircularProgress disableShrink size={'5vh'} thickness={1.6}/>
                            <CircularProgress disableShrink size={'5vh'} thickness={1.6}/>
                        </div>
                    }
                    
                    
                </div>
                <div className='pokeDescription'>
                    {pokemon.description}
                </div>

                <div className='navigation'>
                    {(pokeNum > 1  && pokeNum <= len) && <NavLink to={`/pokemon/${pokelist[pokeNum-2].name}`}  className='navigation__prev' onClick={() => resetPage(-1)}>Prev </NavLink>}
                    {pokeNum < len && <NavLink to={`/pokemon/${pokelist[pokeNum].name}`} className='navigation__next' onClick={() => resetPage(1)}>Next</NavLink>}
                </div>
            </div>
        )
    }
    else{
        return <h1>Pokemon {name} does not exist</h1>
    }
    
    
    
}

export default Pokemon
