interface exception {
  code: number,
  reason: string
}

export const OrderNotFound: exception = {
  code: 404,
  reason: 'Order not found'
};

export const InvalidOrder: exception = {
  code: 400,
  reason: 'Invalid Order'
};


