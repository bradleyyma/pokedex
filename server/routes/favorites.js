import express from 'express';
import {verifyToken} from '../middleware/authJwt.js'
export const router = express.Router();

import {addFav, delFav} from '../controllers/favorites.js'

router.post('/addFav', addFav);
router.post('/delFav', delFav);