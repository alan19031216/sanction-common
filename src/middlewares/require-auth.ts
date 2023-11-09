import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { Jwt } from '../services/jwt';

interface TokenPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      token?: TokenPayload;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader == 'undefined') {
    throw new NotAuthorizedError();
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  try {
    const { payload } = await Jwt.decrypt(bearerToken)
    req.token = {
      id: payload.id,
      email: payload.email
    }

    if (!req.token) {
      throw new NotAuthorizedError();
    }

    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
