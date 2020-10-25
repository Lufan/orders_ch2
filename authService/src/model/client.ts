export default interface Client {
  clientId    : string;
  clientSecret: string;
  redirectUris: string;
  grants      : string;
  scopes      : string;
}

export interface ClientData {
  id    : string;
  grants: string[];
}