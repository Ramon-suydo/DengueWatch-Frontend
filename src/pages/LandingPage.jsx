import HeroSection from '../components/HeroSection';
import LandingNavbar from '../components/LandingNavbar';
import LandingLayout from '../layout/LandingLayout';

function LandingPage() {
  return (
    <LandingLayout>
      <LandingNavbar />
      <main className="flex flex-1 items-center">
        <HeroSection />
      </main>
    </LandingLayout>
  );
}

export default LandingPage;
