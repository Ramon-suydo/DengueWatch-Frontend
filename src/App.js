import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import BarangaySelectionPage from './pages/BarangaySelectionPage';
import DashboardPage from './pages/DashboardPage';
import SignUpPage from './pages/SignUpPage';
import MapPage from './pages/MapPage';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<BarangaySelectionPage />} path="/select-barangay" />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/dashboard"
        />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout>
                <MapPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/map"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;