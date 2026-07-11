'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function TableArt() {
  const balls = Array.from({ length: 15 })
  return (
    <div style={{ position: 'relative', background: 'var(--bg-soft)', borderRadius: 4, padding: 34, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line)' }}>
      <div style={{ position: 'relative', width: 220, height: 200 }}>
        <div style={{ position: 'absolute', top: 0, left: -10, right: -10, height: 20, borderRadius: 3, background: 'rgba(255,255,255,.95)', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }} />
        <div style={{ position: 'absolute', top: 26, left: 10, right: 10, bottom: 26, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, alignContent: 'center' }}>
          {balls.map((_, i) => (
            <span key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', boxShadow: 'inset 0 0 0 2px var(--accent-deep)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 30, width: 8, height: 26, background: '#c9c9c2', borderRadius: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 30, width: 8, height: 26, background: '#c9c9c2', borderRadius: 3 }} />
      </div>
      <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>♻ 100% перероблені матеріали</span>
    </div>
  )
}

export function Hero() {
  const [s, setS] = useState<any>({ hero_title: 'Кавові столики зі старих тенісних мʼячів та скла', hero_subtitle: 'Ручна робота, мʼяка обʼємна текстура та скляна стільниця — виразна деталь для вітальні, спальні чи офісу.' })
  useEffect(() => {
    supabase.from('tct_site_settings').select('*').then(({ data }) => {
      if (data) { const o: any = {}; data.forEach((r: any) => { o[r.key] = r.value }); setS((p: any) => ({ ...p, ...o })) }
    })
  }, [])
  return (
    <section id="top" className="section" style={{ paddingTop: 72 }}>
      <div className="container grid cols-2" style={{ alignItems: 'center' }}>
        <div>
          <span className="eyebrow">Екодизайн · Ручна робота</span>
          <h1 style={{ fontSize: 'clamp(34px,5vw,58px)', fontWeight: 400, letterSpacing: '-.005em', lineHeight: 1.1, margin: '16px 0 18px' }}>{s.hero_title}</h1>
          <p className="lead" style={{ marginBottom: 28 }}>{s.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#catalog" className="btn btn-primary">Переглянути вироби</a>
            <a href="#contacts" className="btn btn-ghost">Звʼязатись</a>
          </div>
        </div>
        <TableArt />
      </div>
    </section>
  )
}

export function About() {
  const items = [
    ['Друге життя мʼячів', 'Кожен столик — це десятки відпрацьованих тенісних мʼячів, що знайшли нове застосування.'],
    ['Скляна стільниця', 'Загартоване скло робить поверхню міцною, легкою в догляді та візуально повітряною.'],
    ['Ручна робота', 'Ми збираємо кожен виріб вручну — з увагою до деталей і геометрії.'],
  ]
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <span className="eyebrow">Чому обирають нас</span>
        <h2 className="h2">Мінімалізм і турбота про планету</h2>
        <div className="grid cols-3" style={{ marginTop: 40 }}>
          {items.map(([t, d]) => (
            <div key={t} className="card" style={{ padding: 30 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', marginBottom: 18 }} />
              <h3 style={{ fontSize: 20, fontWeight: 500, marginBottom: 8 }}>{t}</h3>
              <p className="muted" style={{ fontSize: 15 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Reviews() {
  const list = [
    ['Оксана', 'Столик став акцентом вітальні. Виглядає навіть краще, ніж на фото!'],
    ['Андрій', 'Якісна збірка, скло приємне на дотик. І сама ідея переробки — супер.'],
    ['Марія', 'Замовляла в подарунок — усі в захваті. Доставили швидко.'],
  ]
  return (
    <section id="reviews" className="section">
      <div className="container">
        <span className="eyebrow">Відгуки</span>
        <h2 className="h2">Що кажуть покупці</h2>
        <div className="grid cols-3" style={{ marginTop: 40 }}>
          {list.map(([n, t]) => (
            <div key={n} className="card" style={{ padding: 30 }}>
              <p style={{ fontSize: 18, marginBottom: 18, fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', lineHeight: 1.5 }}>“{t}”</p>
              <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent-deep)' }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '44px 0', background: 'var(--bg-soft)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13 }}>
        <span className="muted" style={{ letterSpacing: '.04em' }}>© {new Date().getFullYear()} · <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.18em', color: 'var(--accent-deep)' }}>Ballcraft</span></span>
      </div>
    </footer>
  )
}
