function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-paper shadow-button">
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 16.5V20h16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M7 14l3-3 2.5 2.5L18 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M16 8h2v2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div>
        <p className="text-lg font-extrabold tracking-tight text-navy sm:text-xl">
          DengueWatch AI
        </p>
        {!compact ? (
          <p className="text-sm text-ink/60">Community dengue risk intelligence</p>
        ) : null}
      </div>
    </div>
  );
}

export default BrandMark;
