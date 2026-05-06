import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const userName = localStorage.getItem('denguewatch.userName');
  const selectedCity = localStorage.getItem('denguewatch.selectedCity');
  const selectedBarangay = localStorage.getItem('denguewatch.selectedBarangay');

  if (!userName) return <Navigate to="/" replace />;
  if (!selectedCity) return <Navigate to="/select-city" replace />;
  if (!selectedBarangay) return <Navigate to="/select-barangay" replace />;

  return children;
}

export default ProtectedRoute;