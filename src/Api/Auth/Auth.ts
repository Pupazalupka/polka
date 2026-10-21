import type { User, UserWithPassword, LoginResponse } from '../../Types';

const API_URL = '/api';

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(
    `${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

  if (!res.ok) throw new Error('Network error');

  const users = (await res.json()) as UserWithPassword[];

  if (users.length === 0) throw new Error('Invalid credentials');

  const found = users[0];

  const { password: _pw, ...user } = found;

  const token = `fake-token-${user.id}`;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return { token, user };
}

export async function getMe(): Promise<User> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');

  const userId = token.replace('fake-token-', '');
  if (!userId) throw new Error('Invalid token');

  const res = await fetch(`${API_URL}/users/${userId}`);

  if (!res.ok) throw new Error('Unauthorized');

  const found = (await res.json()) as UserWithPassword;
  const { password: _pw, ...user } = found;

  return user;
}