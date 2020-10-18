import Route from "./route";

export interface ControllerDefinition {
  new(): Controller;
}

export default interface Controller {
  path: string;
  routes: Route[];
}