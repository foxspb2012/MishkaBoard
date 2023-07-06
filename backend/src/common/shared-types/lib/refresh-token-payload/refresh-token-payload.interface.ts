import { TokenPayload } from '../token-payload/token-payload.interface'

export interface RefreshTokenPayload extends TokenPayload {
  refreshTokenId: string;
}
