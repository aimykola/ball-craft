'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Product } from '@/lib/types'

const STORAGE_KEY = 'tct_favorites'

type FavoritesCtx = {
  items: Product[]
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: (product: Product) => void
  remove: (id: string) => void
  isFavorite: (id: string) => boolean
  count: number
}

const Ctx = createContext<FavoritesCtx | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  const isFavorite = (id: string) => items.some(p => p.id === id)

  const toggle = (product: Product) => {
    setItems(prev => prev.some(p => p.id === product.id) ? prev.filter(p => p.id !== product.id) : [...prev, product])
  }

  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id))

  const count = items.length

  return (
    <Ctx.Provider value={{ items, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), toggle, remove, isFavorite, count }}>
      {children}
    </Ctx.Provider>
  )
}

export function useFavorites() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useFavorites must be used within FavoritesProvider')
  return c
}
