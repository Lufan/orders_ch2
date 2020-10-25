import * as express from 'express';
import { Application, RequestHandler } from 'express';

import Controller, { ControllerDefinition } from '../model/controller';

export default class App {
  app : Application;
  port: number;

  constructor(appInit: {port: number; controllers: ControllerDefinition[]; middlewares: RequestHandler[]}) {
    this.app  = express();
    this.port = appInit.port;

    this.middlewares(appInit.middlewares);
    this.routes(appInit.controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`HTTP server listening on the http://localhost:${this.port}`)
    })
}

  private routes(controllers: ControllerDefinition[]) {
    controllers.forEach(ctrlDef => {
      const ctrl: Controller = new ctrlDef();
      ctrl.routes.forEach(
        route => this.app[route.httpMethod](
          ctrl.path + route.path,
          ctrl[route.ctrlMethod].bind(ctrl)
        )
      );
    });
  }

  private middlewares(middlewares: RequestHandler[]) {
    middlewares.forEach(mw => this.app.use(mw));
  }
}