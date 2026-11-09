import { useEffect, useState } from 'react'
import { useStore } from '../store'

const menu = [
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'prices', label: 'Расценки' },
  { id: 'me', label: 'Обо мне' },
  { id: 'contacts', label: 'Контакты' },
] as const

export function Header() {
  const { view, setView, user } = useStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goSection(id: string) {
    if (view !== 'home') setView('home')
    // ждём разворота главной, чтобы секция уже была в DOM
    window.setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      // прилипающая шапка перекрывает верх экрана — отступаем её высоту
      const header = document.querySelector<HTMLElement>('.header')
      const offset = (header?.offsetHeight ?? 0) + 16
      window.scrollTo({
        top: window.scrollY + el.getBoundingClientRect().top - offset,
        behavior: 'smooth',
      })
    }, 90)
  }

  return (
    <header className={'header' + (scrolled ? ' header--solid' : '')}>
      <div className="container header__row">
        <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          Душевно<span className="logo__dot">.</span>
        </a>

        <nav className="nav" aria-label="Основное меню">
          {menu.map((item) => (
            <button
              key={item.id}
              className={
                'nav__link' +
                (item.id === 'services' && view !== 'home' ? ' nav__link--active' : '')
              }
              onClick={() => (item.id === 'services' ? setView('services') : goSection(item.id))}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="cabinet-btn" onClick={() => setView('cabinet')}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="8" r="4" fill="currentColor" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="currentColor" />
          </svg>
          <span>{user ? user.name.split(' ')[0] : 'Личный кабинет'}</span>
        </button>
      </div>
    </header>
  )
}
