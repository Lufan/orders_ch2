import { UserData } from './user';
import { ClientData } from './client';

export default interface Token {
  accessToken: string;
  accessTokenExpiresAt: Date;
  clientId: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  userId: string;
  scope?: string;
}

export interface AccessToken {
  accessToken: string;
  client: ClientData;
  accessTokenExpiresAt: Date;
  user: UserData;
  scope?: string;
}

export interface RefreshToken {
  refreshToken: string;
  client: ClientData;
  refreshTokenExpiresAt?: Date;
  user: UserData;
  scope?: string;
}

export interface TokenData {
  accessToken: string;
  accessTokenExpiresAt: Date;
  client: ClientData;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  user: UserData;
  scope?: string;
}