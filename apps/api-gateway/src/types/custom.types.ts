import { Request } from 'express';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

export interface AuthRequest extends Request {
  user?: JwtPayloadDto;
  cookies: { [key: string]: string };
}
