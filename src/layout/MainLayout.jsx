import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Map,
  Bell,
  MessageCircle,
  User,
  Menu,
  X,
  MapPin,
  Info,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/chat', label: 'AI Chat', icon: MessageCircle },
];

function MainLayout({ children, pageTitle = 'Dashboard' }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Read from localStorage
  const userName = localStorage.getItem('userName') || 'User';
  const selectedBarangay =
    localStorage.getItem('selectedBarangay') || 'Brgy. 001 - Tondo';

  const handleChangeBarangay = () => {
    localStorage.removeItem('selectedBarangay');
    setDrawerOpen(false);
    navigate('/select-barangay');
  };

  const handleLogout = () => {
    localStorage.clear();
    setDrawerOpen(false);
    navigate('/');
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="flex min-h-screen bg-sand text-ink">
      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen w-4/5 max-w-xs flex-col bg-navy text-white shadow-soft transition-transform duration-300 md:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10"
            onClick={closeDrawer}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info Section */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <User size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-semibold text-white">{userName}</p>
              <p className="truncate text-xs text-white/70">{selectedBarangay}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 p-4">
          {/* Change Barangay */}
          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
            onClick={handleChangeBarangay}
          >
            <MapPin size={18} />
            <span className="text-sm font-medium">Change Barangay</span>
          </button>

          {/* About DengueWatch AI */}
          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
            onClick={() => {
              setShowAboutModal(true);
              setDrawerOpen(false);
            }}
          >
            <Info size={18} />
            <span className="text-sm font-medium">About DengueWatch AI</span>
          </button>

          {/* How It Works */}
          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
            onClick={() => {
              setShowHowItWorksModal(true);
              setDrawerOpen(false);
            }}
          >
            <HelpCircle size={18} />
            <span className="text-sm font-medium">How It Works</span>
          </button>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-white/10 p-4">
          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-alert transition hover:bg-alert/10"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:bg-navy md:text-white">
        {/* Logo/Title */}
        <div className="flex h-16 items-center justify-center border-b border-white/10">
          <h1 className="text-xl font-bold">DengueWatch AI</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-alert text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop User Info & Logout */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <User size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white">{userName}</p>
              <p className="truncate text-xs text-white/70">{selectedBarangay}</p>
            </div>
          </div>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-alert transition hover:bg-alert/10"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:ml-0">
        {/* Top Header */}
        <header className="flex h-14 items-center justify-between bg-navy px-4 py-3 text-white shadow-soft md:px-6">
          {/* Left: Menu Icon (Mobile Only) */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 md:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Center: Page Title */}
          <h2 className="text-lg font-bold md:flex-1 md:text-left">{pageTitle}</h2>

          {/* Right: Barangay + Avatar */}
          <div className="flex items-center gap-2">
            <span className="truncate text-xs font-medium md:text-sm">{selectedBarangay}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 flex-shrink-0">
              <User size={14} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-sand pb-20 md:pb-0">
          <div className="mx-auto w-full max-w-lg px-4 py-6 md:max-w-none md:px-6">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t border-navy/10 bg-white shadow-soft md:hidden">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                  isActive ? 'text-alert' : 'text-ink/50'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 rounded-2xl bg-white p-6 shadow-soft max-w-sm">
            <h3 className="text-lg font-bold text-navy">About DengueWatch AI</h3>
            <p className="mt-4 text-sm text-ink/70">
              DengueWatch AI is an AI-powered dengue risk prediction system
              designed to help communities stay informed about dengue activity
              in their area. Get personalized alerts and health insights powered
              by machine learning.
            </p>
            <button
              className="mt-6 w-full rounded-lg bg-navy px-4 py-2 text-white transition hover:bg-navy/90"
              onClick={() => setShowAboutModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* How It Works Modal */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 rounded-2xl bg-white p-6 shadow-soft max-w-sm">
            <h3 className="text-lg font-bold text-navy">How It Works</h3>
            <p className="mt-4 text-sm text-ink/70">
              DengueWatch AI uses historical case data, humidity levels, and case
              clustering patterns to predict dengue risk in your barangay. Our AI
              model analyzes trends and provides real-time alerts to help you stay
              safe.
            </p>
            <button
              className="mt-6 w-full rounded-lg bg-navy px-4 py-2 text-white transition hover:bg-navy/90"
              onClick={() => setShowHowItWorksModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout;