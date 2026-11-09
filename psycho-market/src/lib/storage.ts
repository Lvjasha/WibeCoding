import type { Purchase, User } from '../types'

const USER_KEY = 'duchevno.user'
const PURCHASES_PREFIX = 'duchevno.purchases.'

export function readUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function writeUser(user: User | null): void {
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  } catch {
    /* приватный режим браузера — работаем без сохранения */
  }
}

function purchasesKey(email: string): string {
  return PURCHASES_PREFIX + email.trim().toLowerCase()
}

export function readPurchases(email: string): Purchase[] {
  try {
    const raw = localStorage.getItem(purchasesKey(email))
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as Purchase[]) : []
  } catch {
    return []
  }
}

export function writePurchases(email: string, purchases: Purchase[]): void {
  try {
    localStorage.setItem(purchasesKey(email), JSON.stringify(purchases))
  } catch {
    /* переполнение хранилища игнорируем: данные останутся в памяти */
  }
}
