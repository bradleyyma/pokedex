import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Pokedex from 'pokedex-promise-v2';
import {filter_obj} from './helpers.js';
import mongoose from 'mongoose';
import User from './models/User.js';
import {router as authRoutes} from './routes/auth.js'
import {router as favRoutes} from './routes/favorites.js'
import {verifyToken} from './middleware/authJwt.js'

const IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'

// App config
const app = express();
const port = process.env.PORT || 3001

const P = new Pokedex();

// DB config
const connection_url = 'mongodb+srv://user1:5mYOfnaCMMHmRJb4@cluster0.qkgir.mongodb.net/pokedex?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then( () => console.log('DB Connected'))

//Middlewares
app.use(cors());
app.use(express.json())


//routes
app.use('/api/', authRoutes)
app.use('/api/', verifyToken, favRoutes)

const checkDuplicate = (req, res, next) => {
    //Username
    User.findOne({
        username:req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({message: err});
            return
        }
        if(user){
            res.status(400).send({ message: "Username is already taken"});
            return
        }
    })
    next();
}



// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());


// DB config?

// API Endpoints
app.get('/pokemon', (req, res) => {
    const interval = {
        limit: 300
    }
    // P.getPokemonsList(interval)
    //     .then((response) => {
    //         return response.results.map(mon => {
    //             return P.resource(mon.url)
    //         })
    //     })
    //     .then(response => {

    //         Promise.all(response).then(values => {
    //             res.send(values.map(poke => (
    //                 {
    //                     name: poke.name,
    //                     order: poke.order,
    //                     img: poke.sprites.other["official-artwork"].front_default,
    //                 }
    //             )))
    //         })
    //     })
    P.getPokemonsList(interval)
        .then( response => {
            res.send(response.results.map( (pokemon, num) => {
                pokemon["img"] = `${IMG}${num + 1}.png`
                pokemon["num"] = num + 1
                return pokemon
            }))
        })
})

app.get('/pokemon/:id', (req, res) => {
    const allowed = ['name', 'id', 'forms', 'sprites', 'species']
    P.getPokemonByName(req.params.id)
        .then(pokemon => {
            let pokemon_filtered = filter_obj(allowed, pokemon)
            P.resource(pokemon_filtered.species.url)
                .then(species_info  => {
                    pokemon_filtered['species'] = filter_obj(['flavor_text_entries'], species_info)
                    const english_flavor = pokemon_filtered.species.flavor_text_entries.filter(entry => entry.language.name == 'en')
                    pokemon_filtered.description = english_flavor[Math.floor(Math.random() * english_flavor.length)].flavor_text
                    delete pokemon_filtered.species.flavor_text_entries
                    res.send(pokemon_filtered)
                })
            
        })
        .catch(error => {
            res.status(404).send(error)
        })
        
})



// Listening
app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})