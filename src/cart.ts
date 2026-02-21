/**
 * Shopping cart module.
 * Handles item management and price calculations.
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

  add(item: CartItem): void {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  remove(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  // BUG: does not multiply by quantity
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  // BUG: returns all items including those with quantity 0
  getItems(): CartItem[] {
    return this.items;
  }

  count(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }
}
