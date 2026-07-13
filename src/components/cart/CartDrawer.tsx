'use client'
import { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'
import { priceWithDiscount } from '@/lib/types'
import { useLang } from '@/components/LanguageContext'

export default function CartDrawer() {
  const { t, td } = useLang()
  const { items, isOpen, close, remove, setQty, total, clear } = useCart()
  const [checkout, setCheckout] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', delivery: '', payment: 'Наложений платіж', comment: '' })
  const [msg, setMsg] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) { setMsg(t('err_name_phone')); return }
    setSending(true); setMsg('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name, customer_phone: form.phone, customer_email: form.email,
          delivery: form.delivery, payment_method: form.payment, comment: form.comment,
          total, items: items.map(i => ({ id: i.product.id, name: i.product.name, qty: i.qty, size: i.size, color: i.color, price: priceWithDiscount(i.product) })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('err'))
      setMsg(t('order_thanks')); clear(); setCheckout(false)
    } catch (e: any) { setMsg(e.message) } finally { setSending(false) }
  }

  return (
    <>
      <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(20,22,16,.35)', opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none', transition: '.2s', zIndex: 60 }} />
      <aside style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px,100%)', background: '#fff', boxShadow: '-10px 0 40px rgba(0,0,0,.1)', transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: '.25s', zIndex: 61, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 18, borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontSize: 18 }}>{t('cart_title')}</strong>
          <button onClick={close} className="btn btn-ghost" style={{ padding: '6px 12px' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 18 }} className="hidden-scroll">
          {items.length === 0 ? <p className="muted">{t('cart_empty')}</p> : items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
              <div style={{ width: 60, height: 60, borderRadius: 10, background: 'var(--bg-soft)', flexShrink: 0, overflow: 'hidden' }}>{it.product.image && <img src={it.product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{td(it.product.name)}</div>
                <div className="muted" style={{ fontSize: 12 }}>{[it.size, it.color].filter(Boolean).join(' · ')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <button onClick={() => setQty(it.product.id, it.qty - 1, it.size, it.color)} className="chip">−</button>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{it.qty}</span>
                  <button onClick={() => setQty(it.product.id, it.qty + 1, it.size, it.color)} className="chip">+</button>
                  <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{priceWithDiscount(it.product) * it.qty} ₴</span>
                </div>
                <button onClick={() => remove(it.product.id, it.size, it.color)} className="muted" style={{ fontSize: 12, background: 'none', border: 'none', marginTop: 4 }}>{t('remove')}</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 18, borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18, marginBottom: 12 }}><span>{t('total')}</span><span>{total} ₴</span></div>
          {!checkout ? (
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={items.length === 0} onClick={() => setCheckout(true)}>{t('checkout')}</button>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              <input className="input" placeholder={t('ph_name_req')} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className="input" placeholder={t('ph_phone_req')} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input className="input" placeholder={t('ph_city')} value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })} />
              <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}><option value="Наложений платіж">{t('pay_cod')}</option><option value="Передоплата на картку">{t('pay_card')}</option></select>
              <textarea className="input" rows={2} placeholder={t('ph_comment')} value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} />
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={sending} onClick={submit}>{sending ? t('sending') : t('confirm_order')}</button>
            </div>
          )}
          {msg && <p style={{ fontSize: 13, marginTop: 8, color: 'var(--accent-deep)', fontWeight: 600 }}>{msg}</p>}
        </div>
      </aside>
    </>
  )
}
