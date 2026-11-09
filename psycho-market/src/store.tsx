import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Purchase, User, View } from './types'
import { readPurchases, readUser, writePurchases, writeUser } from './lib/storage'

interface Store {
  view: View
  setView: (view: View) => void
  user: User | null
  purchases: Purchase[]
  /** Вход с переходом в кабинет (форма на странице «Личный кабинет»). */
  signIn: (user: User) => void
  /** Вход без смены экрана (шаг авторизации внутри записи на услугу). */
  register: (user: User) => void
  signOut: () => void
  addPurchase: (purchase: Purchase) => void
  markPaid: (id: string) => void
  totalSpent: number
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('home')
  const [user, setUser] = useState<User | null>(() => readUser())
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    const existing = readUser()
    return existing ? readPurchases(existing.email) : []
  })

  function applyUser(next: User) {
    setUser(next)
    writeUser(next)
    setPurchases(readPurchases(next.email))
  }

  const register = useCallback((next: User) => applyUser(next), [])

  const signIn = useCallback((next: User) => {
    applyUser(next)
    setView('cabinet')
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    writeUser(null)
    setPurchases([])
    setView('home')
  }, [])

  const addPurchase = useCallback((purchase: Purchase) => {
    setPurchases((prev) => {
      const next = [purchase, ...prev]
      const current = readUser()
      if (current) writePurchases(current.email, next)
      return next
    })
  }, [])

  const markPaid = useCallback((id: string) => {
    setPurchases((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, status: 'paid' as const } : p))
      const current = readUser()
      if (current) writePurchases(current.email, next)
      return next
    })
  }, [])

  const totalSpent = useMemo(
    () => purchases.filter((p) => p.status !== 'awaiting_payment').reduce((sum, p) => sum + p.price, 0),
    [purchases],
  )

  const value = useMemo<Store>(
    () => ({
      view,
      setView,
      user,
      purchases,
      signIn,
      register,
      signOut,
      addPurchase,
      markPaid,
      totalSpent,
    }),
    [view, user, purchases, signIn, register, signOut, addPurchase, markPaid, totalSpent],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore должен вызываться внутри StoreProvider')
  return ctx
}
