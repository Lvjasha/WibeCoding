import { Icon } from './Icons'
import { useStore } from '../store'

const features = [
  {
    icon: 'leaf',
    title: 'Бережный подход',
    text: 'Никаких оценок и советов «как надо». Веду вас в вашем темпе и объясняю, что происходит на каждом этапе работы.',
  },
  {
    icon: 'bulb',
    title: 'Доказательные методы',
    text: 'Работаю в КПТ, схема-терапии и EMDR — направлениях с подтверждённой исследованиями эффективностью.',
  },
  {
    icon: 'plane',
    title: 'Онлайн и очно',
    text: 'Принимаю в кабинете в центре Москвы и по видео из любой точки. Запись и история услуг — в личном кабинете.',
  },
] as const

export function FeatureCards() {
  const { setView } = useStore()
  return (
    <section className="features" id="about">
      <div className="container features__grid">
        {features.map((f) => (
          <article className="feature" key={f.title}>
            <div className="feature__icon">
              <Icon name={f.icon} />
            </div>
            <h3 className="feature__title">{f.title}</h3>
            <p className="feature__text">{f.text}</p>
            <button className="btn btn--dark" onClick={() => setView('services')}>
              Подробнее
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
