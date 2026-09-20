import api, { ApiError } from './api';
afterEach(() => jest.restoreAllMocks());
test('register sends name and confirmation to the API', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 201, json: async () => ({ success: true, data: { token: 'test' } }) });
  const result = await api.register('Test', 'test@example.com', 'TestPassword1', 'TestPassword1');
  expect(result.data.token).toBe('test');
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ name: 'Test', email: 'test@example.com', password: 'TestPassword1', confirmPassword: 'TestPassword1' });
});
test('HTTP validation errors retain the backend message and status', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 400, json: async () => ({ success: false, message: 'Email already registered' }) });
  await expect(api.login('test@example.com', 'bad')).rejects.toMatchObject({ name: 'ApiError', status: 400, message: 'Email already registered' });
});
test('network failures become typed errors', async () => {
  global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch'));
  await expect(api.getSummary()).rejects.toBeInstanceOf(ApiError);
});
test('non-JSON failures are handled', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 502, json: async () => { throw new SyntaxError(); } });
  await expect(api.getSummary()).rejects.toMatchObject({ status: 502 });
});
