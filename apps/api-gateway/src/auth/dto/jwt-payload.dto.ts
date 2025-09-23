import { Role } from 'src/types/enums';

export class JwtPayloadDto {
  username: string;
  id: number;
  role: Role;
}
