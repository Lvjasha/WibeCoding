import { useCallback, useEffect, useRef, useState } from 'react'
import meadow from '../assets/hero-daisy.jpg'
import { useStore } from '../store'

const slides = [
  {
    image: meadow,
    title: 'Спокойствие начинается с разговора',
    text: 'Помогаю справиться с тревогой, выгоранием и кризисами в отношениях — бережно и по делу.',
    cta: 'Выбрать услугу',
  },
  {
    image: meadow,
    title: '12 лет практики и доказательные методы',
    text: 'Работаю в КПТ, схема-терапии и EMDR. Профильное образование, постоянная супервизия и обучение у сертифицированных тренеров.',
    cta: 'Смотреть расценки',
  },
  {
    image: meadow,
    title: 'Первая встреча — бесплатно',
    text: '20 минут в видеоформате: рассказываю, как устроена работа, и мы решаем, подходим ли мы друг другу.',
    cta: 'Записаться бесплатно',
  },
]

export function HeroSlider() {
  const { setView } = useStore()
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)

  const restart = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
  }, [])

  useEffect(() => {
    restart()
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [restart])

  function goTo(next: number) {
    setIndex((next + slides.length) % slides.length)
    restart()
  }

  const slide = slides[index]

  return (
    <section className="hero" id="top" aria-roledescription="карусель">
      <div className="hero__bg" style={{ backgroundImage: 'url(' + slide.image + ')' }} aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />

      <button className="hero__arrow hero__arrow--prev" onClick={() => goTo(index - 1)} aria-label="Предыдущий слайд">‹</button>
      <button className="hero__arrow hero__arrow--next" onClick={() => goTo(index + 1)} aria-label="Следующий слайд">›</button>

      <div className="container hero__content">
        <p className="hero__eyebrow">Психолог Ирина Соколова</p>
        <h1 className="hero__title">{slide.title}</h1>
        <p className="hero__text">{slide.text}</p>
        <div className="hero__actions">
          <button className="btn btn--accent" onClick={() => setView('services')}>{slide.cta}</button>
          <button className="btn btn--ghost" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            Как я работаю
          </button>
        </div>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Слайды карусели">
        {slides.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={i === index}
            className={'dot' + (i === index ? ' dot--active' : '')}
            onClick={() => goTo(i)}
            aria-label={'Слайд ' + (i + 1)}
          />
        ))}
      </div>
    </section>
  )
}
