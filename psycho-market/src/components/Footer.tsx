import { useStore } from '../store'

export function Footer() {
  const { setView } = useStore()
  return (
    <footer className="footer" id="contacts">
      <div className="container footer__grid">
        <div>
          <p className="footer__logo">Душевно.</p>
          <p className="footer__text">
            Частная практика психолога Ирины Соколовой. Приём онлайн и в кабинете в центре Москвы с 2014 года.
          </p>
        </div>
        <div>
          <h4 className="footer__title">Разделы</h4>
          <ul className="footer__list">
            <li><button onClick={() => setView('services')}>Услуги и расценки</button></li>
            <li><button onClick={() => setView('cabinet')}>Личный кабинет</button></li>
            <li><button onClick={() => document.getElementById('me')?.scrollIntoView({ behavior: 'smooth' })}>Обо мне</button></li>
          </ul>
        </div>
        <div>
          <h4 className="footer__title">Контакты</h4>
          <ul className="footer__list">
            <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
            <li><a href="mailto:hello@dushevno.ru">hello@dushevno.ru</a></li>
            <li>Москва, Покровский б-р, 12, каб. 304</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">© 2026 Душевно. Информация на сайте не является публичной офертой.</div>
      </div>
    </footer>
  )
}
