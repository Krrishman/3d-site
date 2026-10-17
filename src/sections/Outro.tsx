const YEAR = new Date().getFullYear()

export function Outro() {
  return (
    <footer className="flex min-h-[60svh] flex-col justify-end px-6 pb-10 md:px-16">
      <p className="text-3xl font-medium tracking-tight md:text-5xl">Placeholder closing line.</p>
      <div className="mt-10 flex items-center justify-between border-t border-paper/15 pt-6 text-sm text-paper/60">
        <span>3D Site</span>
        <span>{YEAR}</span>
      </div>
    </footer>
  )
}
