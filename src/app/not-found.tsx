'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageContext'
import Header from '@/components/Header'
import { Footer } from '@/components/Sections'
import CartDrawer from '@/components/cart/CartDrawer'
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer'
import FloatingContact from '@/components/FloatingContact'

export default function NotFound() {
  const { t } = useLang()

  return (
    <>
      <Header />
      <main
        className="container"
        style={{
          minHeight: '62vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 0',
        }}
      >
        <div
          className="eyebrow"
          style={{ marginBottom: 18 }}
        >
          Error 404
        </div>
        <div
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(72px, 14vw, 140px)',
            lineHeight: 1,
            color: 'var(--ink)',
            marginBottom: 8,
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: 16 }}>
          {t('nf_title')}
        </h1>
        <p
          className="muted"
          style={{ fontSize: 16, maxWidth: 460, marginBottom: 36, lineHeight: 1.8 }}
        >
          {t('nf_text')}
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: 'var(--accent-deep)',
            color: '#fff',
            padding: '15px 42px',
            fontSize: 13,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
          }}
        >
          {t('nf_home')}
        </Link>
      </main>
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <FloatingContact />
    </>
  )
}
