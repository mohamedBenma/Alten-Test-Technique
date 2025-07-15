import { RequestHandler } from "express";
import { UserDto } from "../types/User.dto";
import * as authService from "../services/auth.service";
export const register: RequestHandler = async (req, res) => {
  try {
    const user: UserDto = req.body;
    const newUser = await authService.register(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
const token = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({
  error: 'Identifiants invalides',
  message: (error as Error).message,
});
  }
};
