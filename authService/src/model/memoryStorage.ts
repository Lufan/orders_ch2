import Client, { ClientData } from './client';
import Token, { AccessToken, RefreshToken, TokenData }  from './token';
import User, { UserData }   from './user';

export default class MemoryStorage {
  private clients: Client[] = [];
  private tokens : Token[]  = [];
  private users  : User[]   = [];

  public constructor() {
    // fake data to use
    this.clients.push({
      clientId    : 'orderprocessingapp',
      clientSecret: 'orderprocessingappsecret',
      redirectUris: '',
      grants      : 'client_credentials password',
      scopes      : 'read write'
    });
    this.clients.push({
      clientId    : 'orderprocessingservice',
      clientSecret: 'orderprocessingservicesecret',
      redirectUris: '',
      grants      : 'client_credentials password',
      scopes      : 'read'
    });
    this.users.push({
      id      : '123',
      userName: 'nuwan',
      password: 'nuwan123',
      roles   :'buyer seller priv-buyer'
    });
  }

  public getAccessToken(bearerToken: string): Promise<AccessToken | undefined> {
    return new Promise(resolve => {
      const token = this.tokens.find(token => token.accessToken === bearerToken);
      const client = this.clients.find(client => token?.clientId === client.clientId);
      resolve(token
        ? {
          accessToken         : token.accessToken,
          client              : {id: token.clientId, grants: client?.grants.split(' ')},
          user                : {id: token.userId},
          accessTokenExpiresAt: token.accessTokenExpiresAt
        }
        : undefined
      );
    });
  }

  public getRefreshToken(bearerToken: string): Promise<RefreshToken | undefined> {
    return new Promise(resolve => {
      const token = this.tokens.find(token => token.refreshToken === bearerToken);
      const client = this.clients.find(client => token?.clientId === client.clientId);
      resolve(token
        ? {
          refreshToken         : token.refreshToken,
          client               : {id: token.clientId, grants: client?.grants.split(' ')},
          user                 : {id: token.userId},
          refreshTokenExpiresAt: token.refreshTokenExpiresAt
        }
        : undefined
      );
    });
  }

  public getClient(clientId: string, clientSecret: string): Promise<ClientData | undefined> {
    return new Promise(resolve => {
      const client = this.clients.find(client => client.clientId === clientId && client.clientSecret === clientSecret);
      resolve(client
        ? {
          id: client.clientId,
          grants: client.grants.split(' ')
        }
        : undefined
        );
    });
  }

  public getUser(username: string, password: string): Promise<UserData | undefined> {
    return new Promise(resolve => {
      const user = this.users.find(user => user.userName === username && user.password === password);
      resolve(user ? {id: user.id} : undefined);
    });
  }

  public saveToken(token: TokenData, client: ClientData, user: UserData): Promise<TokenData | undefined> {
    return new Promise(resolve => {
      this.tokens.push({
        accessToken          : token.accessToken,
        accessTokenExpiresAt : token.accessTokenExpiresAt,
        refreshToken         : token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope                : token.scope,
        clientId             : client.id,
        userId               : user.id
      });
      resolve({
        accessToken          : token.accessToken,
        accessTokenExpiresAt : token.accessTokenExpiresAt,
        refreshToken         : token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope                : token.scope,
        client               : client,
        user                 : user
      });
    });
  }

  public verifyScope(token: TokenData, scope: string): Promise<boolean> {
    return new Promise(resolve => {
      if (!token.scope) {
        return resolve(false);
      }
      let requestedScopes = scope.split(' ');
      let authorizedScopes = token.scope.split(' ');
      return resolve(requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0));
    });
  }

  // ? need to check why we need this for oauth2-server package
  public getUserFromClient(client: ClientData) {
    return new Promise(resolve => {
      return resolve(true);
    });
  }

}