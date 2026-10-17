import { BOOK_HREF, HERO } from '../content'
import { FlowMark } from './FlowMark'

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold tracking-tight" aria-label="FlowForge Digital, home">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue text-paper"><FlowMark className="h-5 w-5" /></span>
          <span className="hidden sm:inline">{HERO.wordmark}</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-mist md:flex" aria-label="Sections">
          <a href="#services" className="hover:text-paper">Services</a>
          <a href="#demo" className="hover:text-paper">Demo</a>
          <a href="#process" className="hover:text-paper">Process</a>
        </nav>
        <a href={BOOK_HREF} className="btn btn-primary min-h-11 px-4 text-sm md:min-h-12 md:px-5">{HERO.primary}</a>
      </div>
    </header>
  )
}
