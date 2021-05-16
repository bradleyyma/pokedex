import express from 'express';
export const router = express.Router();

import {signup, signin} from '../controllers/auth.js'

router.post('/signup', signup);
router.post('/signin', signin);
