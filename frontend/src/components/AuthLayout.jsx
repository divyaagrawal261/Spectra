function AuthLayout({ title, description, eyebrow = 'Spectra', children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-16 h-72 w-72 rounded-full bg-amber-400/20 blur-[80px]" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-lime-400/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-14">
        <header className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-300/80">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-50 md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">{description}</p>
        </header>

        <div className="w-full max-w-2xl">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
