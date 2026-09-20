import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage from './pages/SignUpPage';
import api from './services/api';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>
}));
jest.mock('./services/api', () => ({ __esModule: true, default: { register: jest.fn() } }));
beforeEach(() => { localStorage.clear(); jest.clearAllMocks(); });
function fillForm() {
  render(<SignUpPage />);
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Test Resident' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Password', { exact: true }), { target: { value: 'StrongPassword1' } });
  fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'StrongPassword1' } });
  fireEvent.submit(screen.getByLabelText('Full Name').closest('form'));
}
test('signup saves a server-issued JWT and navigates only after successful registration', async () => {
  api.register.mockResolvedValue({ success: true, data: { token: 'server-token', user: { name: 'Test Resident', email: 'test@example.com', role: 'user' } } });
  fillForm();
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/select-city'));
  expect(api.register).toHaveBeenCalledWith('Test Resident', 'test@example.com', 'StrongPassword1', 'StrongPassword1');
  expect(localStorage.getItem('denguewatch.token')).toBe('server-token');
});
test('signup displays backend errors without persisting a token or navigating', async () => {
  api.register.mockRejectedValue(new Error('Email already registered'));
  fillForm();
  expect(await screen.findByText('Email already registered')).toBeInTheDocument();
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(localStorage.getItem('denguewatch.token')).toBeNull();
});
