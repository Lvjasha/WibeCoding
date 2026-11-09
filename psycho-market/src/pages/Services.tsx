import { useState } from 'react'
import { ServiceCard } from '../components/ServiceCard'
import { BookingModal } from '../components/BookingModal'
import { services, formatPrice } from '../data/services'
import type { Service } from '../types'
import { useStore } from '../store'

type Filter = 'all' | 'online' | 'offline' | 'both'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Все услуги' },
  { id: 'online', label: 'Только онлайн' },
  { id: 'offline', label: 'Только очно' },
  { id: 'both', label: 'Онлайн или очно' },
]

export function Services() {
  const { user, setView } = useStore()
  const [filter, setFilter] = useState<Filter>('all')
  const [booking, setBooking] = useState<Service | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const list = services.filter((s) => {
    if (filter === 'all') return true
    if (filter === 'both') return s.format === 'both'
    return s.format === filter || s.format === 'both'
  })

  const min = Math.min(...services.map((s) => s.startingPrice))

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="section__eyebrow">Услуги психолога</p>
          <h1 className="page-head__title">Расценки и запись на встречи</h1>
          <p className="section__lead">
            Шесть направлений: индивидуальная и семейная терапия, работа с детьми, группы и программы.
            Все встречи провожу сама. Консультации — от {formatPrice(min)} за встречу, пакеты — со скидкой.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Фильтр по формату">
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={'tab' + (filter === f.id ? ' tab--on' : '')}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid--3">
            {list.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                expanded={expandedId === s.id}
                onBook={setBooking}
                onDetails={(svc) => setExpandedId((cur) => (cur === svc.id ? null : svc.id))}
              />
            ))}
          </div>

          {list.length === 0 && <p className="empty">В этом формате пока нет услуг — выберите другой фильтр.</p>}

          <div className="price-table">
            <h2 className="section__title">Все расценки в таблице</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Услуга</th>
                    <th>Формат</th>
                    <th>Длительность</th>
                    <th>Цена</th>
                    <th aria-label="Действие" />
                  </tr>
                </thead>
                <tbody>
                  {services.flatMap((s) =>
                    s.options.map((o) => (
                      <tr key={s.id + o.label}>
                        <td data-label="Услуга">{s.title}</td>
                        <td data-label="Формат">{o.label}</td>
                        <td data-label="Длительность">{o.duration}</td>
                        <td data-label="Цена" className="td-price">
                          {formatPrice(o.price)}
                        </td>
                        <td>
                          <button className="btn btn--small" onClick={() => setBooking(s)}>
                            Записаться
                          </button>
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cta-band">
            <div>
              <h3>Не знаете, что выбрать?</h3>
              <p className="section__note">Первые 20 минут бесплатно — на них определим, какой формат работы подойдёт.</p>
            </div>
            <div className="cta-band__actions">
              <button className="btn btn--accent" onClick={() => setBooking(services[0])}>
                Записаться бесплатно
              </button>
              {user && (
                <button className="btn btn--ghost-dark" onClick={() => setView('cabinet')}>
                  Мои услуги
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {booking && <BookingModal service={booking} onClose={() => setBooking(null)} />}
    </>
  )
}
