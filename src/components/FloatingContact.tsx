'use client'
import { useCart } from '@/components/cart/CartContext'

export default function FloatingContact() {
  const { count, open } = useCart()
  return (
    <button onClick={open} aria-label="Кошик" style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 50, width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', border: 'none', boxShadow: 'var(--shadow)', fontSize: 22 }}>
      🛒{count > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: '#1c1e18', color: '#fff', borderRadius: '50%', width: 22, height: 22, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>}
    </button>
  )
}
