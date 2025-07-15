import { Request } from 'express';
import { TokenPayload } from './TokenPayload';

export interface RequestWithUser extends Request {
  user?: TokenPayload;
}














