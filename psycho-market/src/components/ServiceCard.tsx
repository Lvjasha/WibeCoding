import { formatPrice } from '../data/services'
import type { Service } from '../types'
import { Icon } from './Icons'

interface Props {
  service: Service
  onBook: (service: Service) => void
  onDetails: (service: Service) => void
  expanded?: boolean
}

export function ServiceCard({ service, onBook, onDetails, expanded = false }: Props) {
  return (
    <article className={'scard' + (expanded ? ' scard--wide' : '')}>
      {service.badge && <span className="scard__badge">{service.badge}</span>}

      <div className="scard__icon">
        <Icon name={service.icon} />
      </div>

      <h3 className="scard__title">{service.title}</h3>
      <p className="scard__excerpt">{service.excerpt}</p>

      <div className="scard__price">
        <span className="scard__price-label">от</span>
        <span className="scard__price-value">{formatPrice(service.startingPrice)}</span>
      </div>

      {expanded ? (
        <>
          <p className="scard__desc">{service.description}</p>
          <ul className="scard__includes">
            {service.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="scard__options">
            {service.options.map((opt) => (
              <div className="opt" key={opt.label}>
                <div className="opt__meta">
                  <span className="opt__label">{opt.label}</span>
                  <span className="opt__duration">{opt.duration}</span>
                </div>
                <span className="opt__price">{formatPrice(opt.price)}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ul className="scard__short">
          {service.options.slice(0, 2).map((opt) => (
            <li key={opt.label}>
              <span>{opt.label}</span>
              <span>{formatPrice(opt.price)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="scard__actions">
        <button className="btn btn--accent" onClick={() => onBook(service)}>
          Записаться
        </button>
        <button className="btn btn--text" onClick={() => onDetails(service)}>
          {expanded ? 'Свернуть' : 'Все расценки'}
        </button>
      </div>
    </article>
  )
}
