import { Cart, CartItem } from './cart';

const apple: CartItem = { id: 'apple', name: 'Apple', price: 1.50, quantity: 3 };
const banana: CartItem = { id: 'banana', name: 'Banana', price: 0.75, quantity: 2 };

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it('adds items and tracks count', () => {
    cart.add(apple);
    expect(cart.count()).toBe(3);
  });

  it('merges duplicate items', () => {
    cart.add(apple);
    cart.add({ ...apple, quantity: 2 });
    expect(cart.count()).toBe(5);
  });

  it('removes items by id', () => {
    cart.add(apple);
    cart.add(banana);
    cart.remove('apple');
    expect(cart.count()).toBe(2);
  });

  it('calculates total correctly', () => {
    cart.add(apple);   // 1.50 * 3 = 4.50
    cart.add(banana);  // 0.75 * 2 = 1.50
    // FAILS: getTotal() doesn't multiply by quantity
    expect(cart.getTotal()).toBeCloseTo(6.00);
  });

  it('only returns items with quantity > 0', () => {
    cart.add(apple);
    cart.add({ ...banana, quantity: 0 });
    // FAILS: getItems() returns all items including zero-quantity
    expect(cart.getItems()).toHaveLength(1);
  });

  it('clears the cart', () => {
    cart.add(apple);
    cart.clear();
    expect(cart.count()).toBe(0);
  });
});
