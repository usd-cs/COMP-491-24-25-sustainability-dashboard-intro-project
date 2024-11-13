import { vi } from 'vitest'; // Import for mocking
import { logout } from '../pages/authorized/LogoutForm.vue'; // Adjusted path

describe('logout function', () => {
  let mockRouter;
  let mockEmit;

  beforeEach(() => {
    mockRouter = {
      push: vi.fn(),
    };

    global.localStorage = {
      removeItem: vi.fn(),
    };

    mockEmit = vi.fn();
  });

  it('removes the authToken from localStorage', () => {
    logout.call({ $router: mockRouter, $emit: mockEmit });

    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
  });

  it('redirects to home using $router.push', () => {
    logout.call({ $router: mockRouter, $emit: mockEmit });

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('emits a logout event', () => {
    logout.call({ $router: mockRouter, $emit: mockEmit });

    expect(mockEmit).toHaveBeenCalledWith('logout');
  });
});
