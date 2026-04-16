import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthRequest, User } from '../types';
import { AppError } from '../middleware/error.middleware';

export async function signup(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  // Check if user exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  const hashedPassword = await hashPassword(password);
  const id = uuid();

  db.prepare(
    'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'
  ).run(id, name, email, hashedPassword);

  const token = generateToken({ id, email, role: 'user' });

  res.status(201).json({
    success: true,
    data: {
      user: { id, name, email, role: 'user' },
      token,
    },
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
}

export function getMe(req: AuthRequest, res: Response): void {
  const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user!.id) as any;

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: user,
  });
}
