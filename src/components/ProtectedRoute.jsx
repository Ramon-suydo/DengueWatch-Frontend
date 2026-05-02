import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const userName = localStorage.getItem('denguewatch.userName');
  const selectedBarangay = localStorage.getItem('denguewatch.selectedBarangay');

  // If no user session, redirect to landing
  if (!userName) {
    return <Navigate to="/" replace />;
  }

  // If no barangay selected yet, redirect to selection
  if (!selectedBarangay) {
    return <Navigate to="/select-barangay" replace />;
  }

  return children;
}

export default ProtectedRoute;