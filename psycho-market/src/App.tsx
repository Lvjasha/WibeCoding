import { useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Cabinet } from './pages/Cabinet'
import { StoreProvider, useStore } from './store'

function Screens() {
  const { view } = useStore()

  // новый экран начинается с верхнего края: иначе его шапка остаётся под sticky-меню
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [view])

  return (
    <div className="page">
      <Header />
      <main>
        {view === 'home' && <Home />}
        {view === 'services' && <Services />}
        {view === 'cabinet' && <Cabinet />}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Screens />
    </StoreProvider>
  )
}
