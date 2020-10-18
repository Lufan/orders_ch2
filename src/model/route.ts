import { HttpMethod } from "./httpMethod";

export default interface Route {
  path      : string;
  httpMethod: HttpMethod;
  ctrlMethod: string;
}
