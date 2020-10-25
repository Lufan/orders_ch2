export default class LineItem {
  private _itemCode: string;
  private _quantity: number;
  get itemCode() {
    return this._itemCode;
  }
  set itemCode(itemCode: string) {
    this._itemCode = itemCode;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(quantity: number) {
    this._quantity = quantity;
  }
}