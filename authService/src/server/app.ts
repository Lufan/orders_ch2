import * as express from 'express';
import { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import MemoryStorage from '../model/memoryStorage';
import * as ExpressOAuthServer from 'express-oauth-server';

export default class App {
  app : Application;
  port: number;
  oauth: ExpressOAuthServer;

  constructor(appInit: {port: number}) {
    this.app  = express();
    this.port = appInit.port;

    this.app.use(json());
    this.app.use(urlencoded({extended: true}));

    this.oauth = new ExpressOAuthServer({
      model: new MemoryStorage()
    });

    this.app.post('/auth/token', this.oauth.token());
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`HTTP server listening on the http://localhost:${this.port}`)
    })
  }
}