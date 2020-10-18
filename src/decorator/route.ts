export default function route(path: string = '/') {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      path = path;
    };
  }
}