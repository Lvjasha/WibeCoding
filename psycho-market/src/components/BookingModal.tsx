import { useMemo, useState } from 'react'
import { formatPrice } from '../data/services'
import { useStore } from '../store'
import type { Purchase, Service } from '../types'

interface Props {
  service: Service
  onClose: () => void
}

/** Один шаг формы: сначала вход/регистрация, затем выбор формата и даты. */
export function BookingModal({ service, onClose }: Props) {
  const { user, register, addPurchase, setView } = useStore()
  const [step, setStep] = useState<'auth' | 'booking'>(user ? 'booking' : 'auth')

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')

  const [optionIndex, setOptionIndex] = useState(0)
  const [date, setDate] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10))
  const [comment, setComment] = useState('')
  const [done, setDone] = useState<Purchase | null>(null)

  const minDate = useMemo(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10), [])
  const option = service.options[optionIndex]

  function submitAuth(e: React.FormEvent) {
    e.preventDefault()
    register({ name: name.trim(), email: email.trim(), phone: phone.trim() })
    setStep('booking')
  }

  function submitBooking(e: React.FormEvent) {
    e.preventDefault()
    const purchase: Purchase = {
      id: 'ord_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      serviceId: service.id,
      serviceTitle: service.title,
      format: option.label,
      duration: option.duration,
      price: option.price,
      visitDate: date,
      createdAt: new Date().toISOString(),
      status: 'awaiting_payment',
    }
    addPurchase(purchase)
    setDone(purchase)
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={'Запись: ' + service.title} onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Закрыть">×</button>

        {done ? (
          <div className="modal__done">
            <div className="done-mark">✓</div>
            <h3>Вы записаны</h3>
            <p>
              {done.serviceTitle} · {done.format} · {done.duration}
            </p>
            <p className="modal__total">{formatPrice(done.price)}</p>
            <p className="modal__hint">
              Заказ сохранён в личном кабинете. Я свяжусь с вами в течение дня, чтобы подтвердить дату и время.
            </p>
            <button
              className="btn btn--accent"
              onClick={() => {
                onClose()
                setView('cabinet')
              }}
            >
              Открыть личный кабинет
            </button>
          </div>
        ) : step === 'auth' ? (
          <form onSubmit={submitAuth} className="modal__form">
            <h3>Запись на «{service.title}»</h3>
            <p className="modal__hint">
              Чтобы вести историю услуг, укажите контакты — это займёт минуту. Данные сохраняются только в вашем браузере.
            </p>
            <label className="field">
              <span className="field__label">Имя</span>
              <input className="field__input" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} placeholder="Мария" />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input className="field__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="maria@mail.ru" />
            </label>
            <label className="field">
              <span className="field__label">Телефон</span>
              <input className="field__input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+7 900 000-00-00" />
            </label>
            <button className="btn btn--accent" type="submit">Продолжить запись</button>
          </form>
        ) : (
          <form onSubmit={submitBooking} className="modal__form">
            <h3>Запись на «{service.title}»</h3>

            <div className="field">
              <span className="field__label">Формат и длительность</span>
              <div className="radio-list">
                {service.options.map((opt, i) => (
                  <label className={'radio' + (i === optionIndex ? ' radio--on' : '')} key={opt.label}>
                    <input type="radio" name="opt" checked={i === optionIndex} onChange={() => setOptionIndex(i)} />
                    <span className="radio__label">{opt.label}</span>
                    <span className="radio__duration">{opt.duration}</span>
                    <span className="radio__price">{formatPrice(opt.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="field">
              <span className="field__label">Желаемая дата</span>
              <input className="field__input" type="date" value={date} min={minDate} onChange={(e) => setDate(e.target.value)} required />
            </label>

            <label className="field">
              <span className="field__label">Комментарий (необязательно)</span>
              <textarea className="field__input field__input--area" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Кратко о запросе и удобное время для встречи" />
            </label>

            <div className="modal__total">
              <span>Итого</span>
              <strong>{formatPrice(option.price)}</strong>
            </div>

            <button className="btn btn--accent" type="submit">Подтвердить запись</button>
            <button className="btn btn--text" type="button" onClick={onClose}>
              Отмена
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
