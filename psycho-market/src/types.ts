export type ServiceFormat = 'online' | 'offline' | 'both'

export interface PriceOption {
  /** Название формата: «Онлайн», «Очно» */
  label: string
  /** Длительность сессии, напр. «50 минут» */
  duration: string
  /** Цена в рублях */
  price: number
}

export interface Service {
  id: string
  title: string
  /** Короткое описание для карточки */
  excerpt: string
  /** Развёрнутое описание: кому подходит и как проходит */
  description: string
  /** Что входит, список пунктов */
  includes: string[]
  icon: 'leaf' | 'bulb' | 'plane' | 'heart' | 'users' | 'child'
  format: ServiceFormat
  /** Основной ценник для витрины: «от N ₽» */
  startingPrice: number
  options: PriceOption[]
  /** Пометка «Выгодно» / «Популярное» */
  badge?: string
}

export interface User {
  name: string
  email: string
  phone: string
}

export type PurchaseStatus = 'awaiting_payment' | 'paid' | 'completed'

export interface Purchase {
  id: string
  serviceId: string
  serviceTitle: string
  format: string
  duration: string
  price: number
  /** ISO-дата визита, выбранная при записи */
  visitDate: string
  /** ISO-дата оформления заказа */
  createdAt: string
  status: PurchaseStatus
}

export type View = 'home' | 'services' | 'cabinet'
