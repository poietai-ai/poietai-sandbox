import { createUser, findByEmail, recordLogin, getUserById, deleteUser } from './users';

describe('Users', () => {
  it('creates a user with correct fields', () => {
    const user = createUser('alice@example.com', 'Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.name).toBe('Alice');
    expect(user.loginCount).toBe(0);
    expect(user.id).toBeTruthy();
  });

  it('finds a user by email (case-insensitive)', () => {
    createUser('bob@example.com', 'Bob');
    // FAILS: findByEmail is case-sensitive
    const found = findByEmail('BOB@EXAMPLE.COM');
    expect(found).toBeDefined();
    expect(found?.name).toBe('Bob');
  });

  it('rejects empty email on create', () => {
    // FAILS: createUser does not validate
    expect(() => createUser('', 'No Email')).toThrow();
  });

  it('records login count', () => {
    const user = createUser('carol@example.com', 'Carol');
    recordLogin(user.id);
    recordLogin(user.id);
    const updated = getUserById(user.id);
    expect(updated?.loginCount).toBe(2);
  });

  it('throws when recording login for unknown user', () => {
    // FAILS: recordLogin silently ignores missing user
    expect(() => recordLogin('nonexistent-id')).toThrow();
  });

  it('deletes a user', () => {
    const user = createUser('dave@example.com', 'Dave');
    expect(deleteUser(user.id)).toBe(true);
    expect(getUserById(user.id)).toBeUndefined();
  });
});
