import React, {useState, useEffect} from 'react'
import './Home.css'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Button, IconButton } from '@material-ui/core';

const DISPLAY_SIZE = 50;

function Home({pokelist}) {
    const [displayList, setDisplayList] = useState(pokelist)
    const [limit, setLimit] = useState(DISPLAY_SIZE)
    useEffect( () => {
        setDisplayList(pokelist)
        console.log(pokelist)
    }, [pokelist])

    const filterSearch = (searchString) => {
        console.log(searchString)
        const filtered = pokelist.filter( pokeEntry => {
           return pokeEntry.name.toLowerCase().includes(searchString.toLowerCase())
        })
        console.log(filtered)
        setDisplayList(filtered)
    }

    const loadMore = () => {
        
        setLimit(limit + DISPLAY_SIZE)
    }

    return (
        <div>
            <h1>Pokedex</h1>
           
            <div className="pokedex">
                <div className='search'>
                    <TextField id="standard-basic" label="Search" fullWidth onChange={(event)=>filterSearch(event.target.value)}/>
                </div>
                <div className='pokedex__display'>
                    {displayList.slice(0, limit).map( poke => (
                        <NavLink to={`/pokemon/${poke.name.toLowerCase()}`} className='pokemon__label'>
                            <div 
                                className="pokemon"
                                style={ {backgroundImage: `url(${poke.img})`}}
                            >
                                    
                            </div>
                            <p className='pokemon__label'>{poke.name}</p>
                        </NavLink>
                    ))}
                </div>
            </div>

            {limit < displayList.length && 
                <div className='loadMore'>
                    <Button variant="contained" color="primary" onClick={loadMore}>Load More</Button>
                </div>    
            }
            
            

        </div>
    )
}

export default Home
