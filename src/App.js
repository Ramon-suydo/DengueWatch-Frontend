import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import BarangaySelectionPage from './pages/BarangaySelectionPage';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ChatPage from './pages/ChatPage';
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
<<<<<<< HEAD
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
=======
            <MainLayout pageTitle="Dashboard">
              <DashboardPage />
            </MainLayout>
>>>>>>> origin/frontend-ui-updates
          }
          path="/dashboard"
        />
        <Route
          element={
<<<<<<< HEAD
            <ProtectedRoute>
              <MainLayout>
                <MapPage />
              </MainLayout>
            </ProtectedRoute>
          }
          path="/map"
        />
=======
            <MainLayout pageTitle="Map View">
              <MapPage />
            </MainLayout>
          }
          path="/map"
        />
        <Route
          element={
            <MainLayout pageTitle="Alerts">
              <AlertsPage />
            </MainLayout>
          }
          path="/alerts"
        />
        <Route
          element={
            <MainLayout pageTitle="Analytics">
              <AnalyticsPage />
            </MainLayout>
          }
          path="/analytics"
        />
        <Route
          element={
            <MainLayout pageTitle="AI Assistant">
              <ChatPage />
            </MainLayout>
          }
          path="/chat"
        />
>>>>>>> origin/frontend-ui-updates
      </Routes>
    </BrowserRouter>
  );
}

export default App;