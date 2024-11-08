import express from 'express';
import AppController from '../controllers/App.controller.js';

const router = express.Router();

router.get('/', AppController.index);

export default router;