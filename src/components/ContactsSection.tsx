'use client'
import { useState } from 'react'

export default function Contacts() {
  const [f, setF] = useState({ name: '', phone: '', msg: '' })
  const [sent, setSent] = useState(false)
  return (
    <section id="contacts" className="section">
      <div className="container grid cols-2" style={{ alignItems: 'start' }}>
        <div>
          <span className="eyebrow">Контакти</span>
          <h2 className="h2">Звʼяжіться з нами</h2>
          <p className="lead">Маєте питання про виріб, доставку чи індивідуальне замовлення? Напишіть — відповімо якнайшвидше.</p>
        </div>
        <div className="card" style={{ padding: 24 }}>
          {sent ? <p style={{ fontWeight: 700 }}>Дякуємо! Ми звʼяжемось з вами.</p> : (
            <div style={{ display: 'grid', gap: 10 }}>
              <div><label className="fld">Імʼя</label><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
              <div><label className="fld">Телефон</label><input className="input" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} /></div>
              <div><label className="fld">Повідомлення</label><textarea className="input" rows={3} value={f.msg} onChange={e => setF({ ...f, msg: e.target.value })} /></div>
              <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setSent(true)}>Надіслати</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
