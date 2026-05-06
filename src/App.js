import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CitySelectionPage from './pages/CitySelectionPage';
import DistrictSelectionPage from './pages/DistrictSelectionPage';
import BarangaySelectionPage from './pages/BarangaySelectionPage';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<CitySelectionPage />} path="/select-city" />
        <Route element={<DistrictSelectionPage />} path="/select-district" />
        <Route element={<BarangaySelectionPage />} path="/select-barangay" />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout pageTitle="Dashboard">
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/dashboard"
        />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout pageTitle="Map View">
                <MapPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/map"
        />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout pageTitle="Alerts">
                <AlertsPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/alerts"
        />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout pageTitle="Analytics">
                <AnalyticsPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/analytics"
        />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout pageTitle="AI Assistant">
                <ChatPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/chat"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;