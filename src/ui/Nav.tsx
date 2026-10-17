import { BOOK_HREF, HERO } from '../content'
import { FlowMark } from './FlowMark'

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 px-4 pt-4 md:px-8 md:pt-6">
      <div className="pill-nav mx-auto flex max-w-[1200px] items-center justify-between py-2 pl-5 pr-2">
        <a href="#top" className="flex items-center gap-2.5 font-bold tracking-tight" aria-label="FlowForge Digital, home">
          <FlowMark className="h-5 w-5 text-teal" />
          <span className="hidden sm:inline">{HERO.wordmark}</span>
        </a>
        <nav className="hidden items-center gap-9 text-sm text-mist md:flex" aria-label="Sections">
          <a href="#work" className="hover:text-paper">Work</a>
          <a href="#services" className="hover:text-paper">Services</a>
          <a href="#projects" className="hover:text-paper">Projects</a>
          <a href="#about" className="hover:text-paper">About</a>
        </nav>
        <a href={BOOK_HREF} className="btn btn-primary min-h-10 px-4 text-sm md:min-h-11 md:px-5">{HERO.primary}</a>
      </div>
    </header>
  )
}
