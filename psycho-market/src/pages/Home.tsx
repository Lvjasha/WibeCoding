import { useState } from 'react'
import { HeroSlider } from '../components/HeroSlider'
import { FeatureCards } from '../components/FeatureCards'
import { ServiceCard } from '../components/ServiceCard'
import { BookingModal } from '../components/BookingModal'
import { services, formatPrice } from '../data/services'
import type { Service } from '../types'
import { useStore } from '../store'

const steps = [
  { n: '01', title: 'Оставляете заявку', text: 'Выбираете услугу и дату в форме записи или звоните мне.' },
  { n: '02', title: 'Созваниваемся бесплатно', text: '20 минут знакомимся, формулируем запрос и решаем, подходим ли мы друг другу.' },
  { n: '03', title: 'Составляем план', text: 'Определяем цели, формат и регулярность встреч, договариваемся о правилах работы.' },
  { n: '04', title: 'Работаем по плану', text: 'Встречи по расписанию, прогресс фиксирую в личном кабинете и обсуждаем его с вами.' },
]

const credentials = [
  { label: 'Образование', value: 'МГУ, клиническая психология; переподготовка по КПТ (ИМиП)' },
  { label: 'Опыт', value: '12 лет частной практики, более 4 000 проведённых сессий' },
  { label: 'Методы', value: 'КПТ, схема-терапия, EMDR; работаю под супервизией' },
  { label: 'Форматы', value: 'Индивидуально, пары, дети от 6 лет, группы до 8 человек' },
]

export function Home() {
  const { setView } = useStore()
  const [booking, setBooking] = useState<Service | null>(null)
  const top = services.slice(0, 3)

  return (
    <>
      <HeroSlider />
      <FeatureCards />

      <section className="section" id="prices">
        <div className="container">
          <p className="section__eyebrow">Расценки</p>
          <h2 className="section__title">Популярные услуги</h2>
          <p className="section__lead">
            Цена зависит от формата встречи: онлайн дешевле, пакеты выгоднее. Полный прайс и запись — на странице услуг.
          </p>

          <div className="grid grid--3">
            {top.map((s) => (
              <ServiceCard key={s.id} service={s} onBook={setBooking} onDetails={() => setView('services')} />
            ))}
          </div>

          <div className="section__foot">
            <button className="btn btn--dark" onClick={() => setView('services')}>
              Все услуги и расценки
            </button>
            <p className="section__note">
              Самая доступная услуга — групповая терапия, от {formatPrice(1800)} за встречу.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint" id="how">
        <div className="container">
          <p className="section__eyebrow">Как это работает</p>
          <h2 className="section__title">Четыре шага до первой встречи</h2>
          <ol className="steps">
            {steps.map((s) => (
              <li className="step" key={s.n}>
                <span className="step__num">{s.n}</span>
                <div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="me">
        <div className="container about">
          <div className="about__photo" aria-hidden="true">
            <span className="about__initials">ИС</span>
            <p className="about__photo-note">Фото Ирины Соколовой — здесь будет снимок</p>
          </div>

          <div className="about__body">
            <p className="section__eyebrow section__eyebrow--left">Обо мне</p>
            <h2 className="section__title section__title--left">Ирина Соколова, психолог</h2>
            <p className="section__lead section__lead--left">
              Веду частную практику в Москве с 2014 года. Помогаю взрослым и подросткам справиться с тревогой,
              выгоранием и кризисами в отношениях. Работаю в доказательных методах и всегда объясняю, что происходит
              на встрече и зачем.
            </p>

            <dl className="about__facts">
              {credentials.map((c) => (
                <div className="fact" key={c.label}>
                  <dt>{c.label}</dt>
                  <dd>{c.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about__actions">
              <button className="btn btn--accent" onClick={() => setBooking(services[0])}>
                Записаться на первую встречу
              </button>
              <button className="btn btn--ghost-dark" onClick={() => setView('services')}>
                Посмотреть расценки
              </button>
            </div>
          </div>
        </div>
      </section>

      {booking && <BookingModal service={booking} onClose={() => setBooking(null)} />}
    </>
  )
}
