import React from 'react'
import {NavLink} from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navigation() {
    return (
        <div>
            <nav>
                <NavLink strict to='/pokemon'>
                    <HomeIcon/>
                </NavLink>
                <NavLink to='/about'>
                    <InfoIcon/>
                </NavLink>
                <NavLink to='/profile'>
                    <AccountCircleIcon/>
                </NavLink>

            </nav>
        </div>
    )
}


export default Navigation
