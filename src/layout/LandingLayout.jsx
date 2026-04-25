function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

export default LandingLayout;
