import { Request, Response } from 'express';

import Order          from '../model/order';
import { HttpMethod } from '../model/httpMethod';
import Controller     from '../model/controller';
import Route          from '../model/route';

import guid from '../utility/guid';

import { InvalidOrder, OrderNotFound } from './exceptions';

import httpMethod from '../decorator/httpMethod';
import route      from '../decorator/route';


@route('/orders')
export default class OrderProcessingService implements Controller {
  path  : string;
  routes: Route[];

  @httpMethod('/:id')
  public getOrderById(req: Request, res: Response) {
    if (this._orders.has(req.params.id)) {
      return res.status(200).json(this._orders.get(req.params.id));
    } else {
      return res.status(OrderNotFound.code).json(OrderNotFound.reason);
    }
  }

  @httpMethod('/', HttpMethod.post)
  public placeOrder(req: Request, res: Response) {
    const order: Order = req.body;
    if (!order.items || !Array.isArray(order.items) || !order.shippingAddress) {
      return res.status(InvalidOrder.code).json(InvalidOrder.reason);
    }
    console.log(`Received Order for ${order.items.length} Items`);
    order.items.forEach(lineItem => console.log(`Item: ${lineItem.itemCode} Quantity: ${lineItem.quantity}`));

    order.orderId = guid();
    this._orders.set(order.orderId, order);

    return res.status(201).json(order);
  }

  private _orders: Map<string, Order> = new Map<string, Order>(); // Fake storage
}
