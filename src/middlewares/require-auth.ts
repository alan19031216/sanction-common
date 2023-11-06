import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { Jwt } from '../services/jwt';

interface Payload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader == 'undefined') {
    throw new NotAuthorizedError();
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  try {
    Jwt.decrypt(bearerToken)
    // req.token = payload

    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
