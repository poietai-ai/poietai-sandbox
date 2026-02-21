# poietai-sandbox

A sandbox project for testing Poietai.AI agents. Contains intentional bugs for agents to find and fix.

## Setup

```bash
npm install
npm test
```

## Modules

### `src/cart.ts` — Shopping cart
- `getTotal()` — **bug:** doesn't multiply price by quantity
- `getItems()` — **bug:** returns items with quantity 0

### `src/users.ts` — User management
- `findByEmail()` — **bug:** case-sensitive lookup
- `createUser()` — **bug:** no validation on empty email/name
- `recordLogin()` — **bug:** silently ignores unknown user instead of throwing

## Suggested tickets

| Title | File | What to fix |
|-------|------|-------------|
| Fix cart total calculation | `cart.ts` | Multiply `price * quantity` in `getTotal()` |
| Filter zero-quantity items from cart | `cart.ts` | `getItems()` should exclude `quantity === 0` |
| Case-insensitive email lookup | `users.ts` | Normalize to lowercase in `findByEmail()` |
| Validate user fields on create | `users.ts` | Throw on empty email or name in `createUser()` |
| Throw on unknown user in recordLogin | `users.ts` | Throw if user not found in `recordLogin()` |
