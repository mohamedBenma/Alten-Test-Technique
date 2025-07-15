import { login, register } from "../controllers/auth.controller";
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/account', register);
router.post('/token', login);

export default router;