import { HttpMethod } from "../model/httpMethod";
import Route from "../model/route";

export default function httpMethod(path: string = '/', method: HttpMethod = HttpMethod.get) {
  return function(target, propertyKey: string) {
    if (!target.routes) {
      target.routes = [];
    }
    const routes: Route[] = target.routes;
    routes.push({
      path,
      httpMethod: method,
      ctrlMethod: propertyKey
    });
  }
}