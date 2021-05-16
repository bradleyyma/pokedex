import React from 'react';
import {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Profile from './pages/Profile.js';
import Pokemon from './pages/Pokemon.js';


function Main({pokelist}) {
    // useEffect(() => {
    //     console.log('pokelist in main:', pokelist)
    // }, [pokelist])
    return (
        <div>
            <Switch>
                <Route exact path="/pokemon">
                    <Home
                        pokelist={pokelist}/>
                </Route>

                <Route path="/about">
                    <About/>
                </Route>

                <Route path="/profile">
                    <Profile/>
                </Route>

                <Route path="/pokemon/:name">
                    <Pokemon pokelist={pokelist}/>
                </Route>

            </Switch>
        </div>
    )
}

export default Main
