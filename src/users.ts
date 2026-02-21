/**
 * User management module.
 * Handles user creation, lookup, and password validation.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  loginCount: number;
}

const users: Map<string, User> = new Map();

export function createUser(email: string, name: string): User {
  // BUG: no validation — allows empty email or name
  const user: User = {
    id: Math.random().toString(36).slice(2),
    email,
    name,
    createdAt: new Date(),
    loginCount: 0,
  };
  users.set(user.id, user);
  return user;
}

export function getUserById(id: string): User | undefined {
  return users.get(id);
}

// BUG: case-sensitive email lookup — findByEmail('FOO@BAR.COM') won't match 'foo@bar.com'
export function findByEmail(email: string): User | undefined {
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return undefined;
}

export function recordLogin(id: string): void {
  const user = users.get(id);
  // BUG: silently does nothing if user not found — should throw
  if (user) {
    user.loginCount += 1;
  }
}

export function deleteUser(id: string): boolean {
  return users.delete(id);
}

export function listUsers(): User[] {
  return Array.from(users.values());
}
