import { useMemo, useState } from 'react'
import { formatPrice } from '../data/services'
import { useStore } from '../store'
import type { Purchase, PurchaseStatus } from '../types'

const statusLabels: Record<PurchaseStatus, string> = {
  awaiting_payment: 'Ожидает оплаты',
  paid: 'Оплачено',
  completed: 'Пройдено',
}

function formatDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
}

function PurchaseRow({ p }: { p: Purchase }) {
  const { markPaid } = useStore()
  return (
    <li className="order">
      <div className="order__main">
        <div className="order__head">
          <h3 className="order__title">{p.serviceTitle}</h3>
          <span className={'badge badge--' + p.status}>{statusLabels[p.status]}</span>
        </div>
        <p className="order__meta">
          {p.format} · {p.duration}
        </p>
        <p className="order__date">
          Дата встречи: <strong>{formatDate(p.visitDate)}</strong>
        </p>
        <p className="order__created">Заказ оформлен {formatDate(p.createdAt.slice(0, 10))}</p>
      </div>

      <div className="order__side">
        <span className="order__price">{formatPrice(p.price)}</span>
        {p.status === 'awaiting_payment' && (
          <button className="btn btn--accent btn--small" onClick={() => markPaid(p.id)}>
            Оплатить
          </button>
        )}
        {p.status === 'paid' && (
          <a className="btn btn--ghost-dark btn--small" href="tel:+74951234567">
            Связаться со мной
          </a>
        )}
        {p.status === 'completed' && (
          <button className="btn btn--text btn--small" onClick={() => {}}>
            Оставить отзыв
          </button>
        )}
      </div>
    </li>
  )
}

export function Cabinet() {
  const { user, signIn, signOut, purchases, totalSpent, setView } = useStore()
  const [tab, setTab] = useState<'orders' | 'profile'>('orders')

  const upcoming = useMemo(
    () => purchases.filter((p) => p.status === 'awaiting_payment').length,
    [purchases],
  )

  if (!user) {
    return (
      <section className="section section--login">
        <div className="login-card">
          <h1 className="login-card__title">Личный кабинет</h1>
          <p className="section__note">
            Войдите, чтобы видеть купленные услуги, даты встреч и историю оплаты. Аккаунт создаётся автоматически по email.
          </p>
          <LoginForm onSubmit={signIn} />
          <button className="btn btn--text" onClick={() => setView('services')}>
            ← Вернуться к услугам
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container cabinet">
        <aside className="cabinet__side">
          <div className="profile">
            <div className="profile__avatar" aria-hidden="true">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <h2 className="profile__name">{user.name}</h2>
            <p className="profile__contact">{user.email}</p>
            <p className="profile__contact">{user.phone}</p>
          </div>

          <nav className="side-nav" aria-label="Разделы кабинета">
            <button className={'side-nav__item' + (tab === 'orders' ? ' side-nav__item--on' : '')} onClick={() => setTab('orders')}>
              Мои услуги
            </button>
            <button className={'side-nav__item' + (tab === 'profile' ? ' side-nav__item--on' : '')} onClick={() => setTab('profile')}>
              Профиль
            </button>
            <button className="side-nav__item side-nav__item--new" onClick={() => setView('services')}>
              Записаться ещё
            </button>
            <button className="side-nav__item side-nav__item--out" onClick={signOut}>
              Выйти
            </button>
          </nav>
        </aside>

        <div className="cabinet__body">
          <h1 className="page-head__title page-head__title--sm">
            {tab === 'orders' ? 'Мои купленные услуги' : 'Профиль'}
          </h1>

          {tab === 'orders' && (
            <>
              <div className="stats">
                <div className="stat">
                  <span className="stat__value">{purchases.length}</span>
                  <span className="stat__label">услуг куплено</span>
                </div>
                <div className="stat">
                  <span className="stat__value">{formatPrice(totalSpent)}</span>
                  <span className="stat__label">оплачено</span>
                </div>
                <div className="stat">
                  <span className="stat__value">{upcoming}</span>
                  <span className="stat__label">ждут оплаты</span>
                </div>
              </div>

              {purchases.length === 0 ? (
                <div className="empty-box">
                  <p>Здесь появятся ваши услуги. Пока список пуст.</p>
                  <button className="btn btn--accent" onClick={() => setView('services')}>
                    Посмотреть расценки
                  </button>
                </div>
              ) : (
                <ul className="orders">
                  {purchases.map((p) => (
                    <PurchaseRow key={p.id} p={p} />
                  ))}
                </ul>
              )}
            </>
          )}

          {tab === 'profile' && (
            <div className="profile-table">
              <dl>
                <div>
                  <dt>Имя</dt>
                  <dd>{user.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{user.email}</dd>
                </div>
                <div>
                  <dt>Телефон</dt>
                  <dd>{user.phone}</dd>
                </div>
              </dl>
              <p className="section__note">
                Данные и история услуг хранятся в этом браузере (localStorage). Чтобы сменить аккаунт — выйдите и войдите с другим email.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function LoginForm({ onSubmit }: { onSubmit: (u: { name: string; email: string; phone: string }) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <form
      className="modal__form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() })
      }}
    >
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
      <button className="btn btn--accent" type="submit">
        Войти в кабинет
      </button>
    </form>
  )
}
