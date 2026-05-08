import { useState, useEffect } from 'react';
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
  ChevronDown,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/chat', label: 'Chat', icon: MessageCircle },
];

function MainLayout({ children, pageTitle = 'Dashboard' }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  // Read from localStorage
  const userName = localStorage.getItem('denguewatch.userName') || localStorage.getItem('userName') || 'User';
  const selectedCity = localStorage.getItem('denguewatch.selectedCity') || 
                       localStorage.getItem('denguewatch.selectedBarangay') || 
                       localStorage.getItem('selectedBarangay') || 
                       'Select Location';

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close drawer when navigating
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleChangeBarangay = () => {
    localStorage.removeItem('denguewatch.selectedBarangay');
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

  // Get active nav item
  const activeNav = navItems.find(item => location.pathname === item.to);

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden"
          onClick={closeDrawer}
          role="presentation"
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen w-4/5 max-w-xs flex-col bg-navy text-white shadow-2xl transition-transform duration-300 md:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4 pt-6">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info Section */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/10">
              <User size={28} className="text-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-semibold text-white text-sm">{userName}</p>
              <p className="truncate text-xs text-white/60 mt-1">{selectedCity}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {/* Change Location */}
          <button
            onClick={handleChangeBarangay}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Change location"
          >
            <MapPin size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">Change Location</span>
          </button>

          {/* About DengueWatch AI */}
          <button
            onClick={() => {
              setShowAboutModal(true);
              setDrawerOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="About DengueWatch AI"
          >
            <Info size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">About DengueWatch</span>
          </button>

          {/* How It Works */}
          <button
            onClick={() => {
              setShowHowItWorksModal(true);
              setDrawerOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="How it works"
          >
            <HelpCircle size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">How It Works</span>
          </button>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-white/10 p-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-alert transition-colors duration-200 hover:bg-alert/10 active:bg-alert/20 focus:outline-none focus:ring-2 focus:ring-alert/30 font-medium"
            aria-label="Logout"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:bg-navy lg:text-white lg:shadow-xl">
        {/* Logo/Title */}
        <div className="flex h-20 items-center justify-center border-b border-white/10 px-6">
          <h1 className="text-2xl font-bold tracking-tight">DengueWatch</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                      isActive
                        ? 'bg-alert text-white shadow-lg shadow-alert/30'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={22} className="flex-shrink-0" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Location Info */}
        <div className="border-t border-white/10 p-4 mx-4 rounded-lg bg-white/5 mb-4">
          <p className="text-xs text-white/60 font-semibold uppercase tracking-wide mb-2">Current Location</p>
          <div className="flex items-center gap-2 text-white">
            <MapPin size={16} className="flex-shrink-0 text-alert" />
            <p className="truncate text-sm font-medium">{selectedCity}</p>
          </div>
        </div>

        {/* Desktop User Info & Logout */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/10 flex-shrink-0">
              <User size={24} className="text-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white">{userName}</p>
              <p className="truncate text-xs text-white/60 mt-1">User</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-alert transition-colors duration-200 hover:bg-alert/10 focus:outline-none focus:ring-2 focus:ring-alert/30"
            aria-label="Logout"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white border-b border-navy/10 px-4 py-3 shadow-sm md:px-6 lg:px-8">
          {/* Left: Menu Icon (Mobile/Tablet) */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-navy/10 focus:outline-none focus:ring-2 focus:ring-navy/20 lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <Menu size={24} className="text-navy" />
          </button>

          {/* Center: Location Display */}
          <div className="flex-1 mx-4 flex items-center gap-2 min-w-0">
            <MapPin size={18} className="text-navy flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-ink/60 font-medium">Location</p>
              <p className="truncate text-sm font-semibold text-navy">{selectedCity}</p>
            </div>
          </div>

          {/* Right: Page Title + Avatar */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Page Title - Hidden on mobile */}
            <span className="hidden md:block text-sm font-semibold text-navy truncate">
              {pageTitle}
            </span>
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 border-2 border-navy/20 flex-shrink-0">
              <User size={20} className="text-navy" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-paper pb-20 md:pb-0 lg:pb-0">
          <div className="mx-auto w-full max-w-full px-4 py-6 md:px-6 lg:px-8 lg:max-w-7xl">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 flex h-20 items-center justify-around border-t border-navy/10 bg-white shadow-2xl md:hidden pb-safe" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`group flex flex-col items-center justify-center gap-1.5 px-3 py-2 transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 flex-1 ${
                  isActive
                    ? 'text-alert'
                    : 'text-ink/50 hover:text-ink/70'
                }`}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-active:scale-95'}`}>
                  <Icon size={26} />
                </div>
                <span className="text-xs font-semibold leading-tight">{label}</span>
                {isActive && (
                  <div className="h-1 w-6 bg-alert rounded-full mt-0.5" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 transition-opacity duration-300 p-4">
          <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl md:rounded-2xl animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-alert/10">
                <Info size={24} className="text-alert" />
              </div>
              <h3 className="text-xl font-bold text-navy">About DengueWatch</h3>
            </div>
            <p className="text-sm text-ink/70 leading-relaxed">
              DengueWatch AI is an AI-powered dengue risk prediction system designed to help communities stay informed about dengue activity in their area. Get personalized alerts and health insights powered by machine learning and real-time data analysis.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-navy/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-navy/30"
                onClick={() => setShowAboutModal(false)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How It Works Modal */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 transition-opacity duration-300 p-4">
          <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl md:rounded-2xl animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <HelpCircle size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-navy">How It Works</h3>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy font-semibold text-xs flex-shrink-0">1</div>
                <div>
                  <p className="text-sm font-semibold text-ink">Collects Data</p>
                  <p className="text-xs text-ink/60">Historical cases, weather, and location data</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy font-semibold text-xs flex-shrink-0">2</div>
                <div>
                  <p className="text-sm font-semibold text-ink">Analyzes Patterns</p>
                  <p className="text-xs text-ink/60">AI model identifies risk trends and clusters</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy font-semibold text-xs flex-shrink-0">3</div>
                <div>
                  <p className="text-sm font-semibold text-ink">Sends Alerts</p>
                  <p className="text-xs text-ink/60">Real-time notifications for your area</p>
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-navy/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-navy/30"
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