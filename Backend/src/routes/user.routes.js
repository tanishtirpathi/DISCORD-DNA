import express from 'express';
import { getUserData } from '../controllers/discordController.js';
const router = express.Router();
router.get('/user', getUserData);
export default router;
