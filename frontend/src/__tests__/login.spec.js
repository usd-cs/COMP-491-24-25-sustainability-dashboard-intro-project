// tests/login.spec.js
import { describe, it, expect, vi, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { login } from '../login';

const mock = new MockAdapter(axios);

describe('login function', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should login successfully and redirect', async () => {
    // Mock the axios POST request
    mock.onPost('http://localhost:3000/api/auth/login').reply(200, {
      message: 'Login successful',
      user: { user_id: '12345' },
    });

    const formData = { username: 'validUser', password: 'validPassword' };
    const router = { push: vi.fn() }; // Mock router.push using vitest's vi.fn()

    // Call the login function
    const result = await login(formData, router);

    // Assert that the response is as expected
    expect(result).toBe('Login successful');
    expect(localStorage.getItem('userId')).toBe('12345');
    expect(router.push).toHaveBeenCalledWith('/authorized');
  });

  it('should show error when credentials are invalid', async () => {
    mock.onPost('http://localhost:3000/api/auth/login').reply(400, {
      message: 'Invalid login credentials.',
    });

    const formData = { username: 'invalidUser', password: 'invalidPassword' };
    const router = { push: vi.fn() };

    const result = await login(formData, router);

    expect(result).toBe('Invalid login credentials.');
    expect(router.push).not.toHaveBeenCalled();
  });
});
