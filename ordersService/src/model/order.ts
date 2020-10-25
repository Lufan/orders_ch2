import LineItem from "./lineItem";

export default class Order {
  private _orderId: string;
  private _items: LineItem[];
  private _shippingAddress: string;

  get orderId() {
    return this._orderId;
  }
  set orderId(orderId: string) {
    this._orderId = orderId;
  }
  get items() {
    return this._items;
  }
  set items(items: LineItem[]) {
    this._items = items;
  }
  get shippingAddress() {
    return this._shippingAddress;
  }
  set shippingAddress(shippingAddress: string) {
    this._shippingAddress = shippingAddress;
  }
}