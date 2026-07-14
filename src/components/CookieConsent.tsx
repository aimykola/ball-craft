'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/components/LanguageContext'

const STORAGE_KEY = 'bc_cookie_consent'

export default function CookieConsent() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const persist = (value: { necessary: boolean; analytics: boolean }) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...value, ts: Date.now() })
      )
    } catch {}
    setVisible(false)
    setShowSettings(false)
  }

  const acceptAll = () => persist({ necessary: true, analytics: true })
  const rejectAll = () => persist({ necessary: true, analytics: false })
  const saveChoice = () => persist({ necessary: true, analytics })

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t('cc_settings_title')}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        background: '#fff',
        borderTop: '1px solid var(--line)',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.08)',
      }}
    >
      <div
        className="container"
        style={{ padding: '22px 28px' }}
      >
        {!showSettings ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <p
              className="muted"
              style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 720, margin: 0 }}
            >
              {t('cc_text')}{' '}
              <Link href="/privacy" style={{ textDecoration: 'underline', color: 'var(--ink)' }}>
                {t('cc_more')}
              </Link>
            </p>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  padding: '12px 26px',
                  fontSize: 12,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                }}
              >
                {t('cc_settings')}
              </button>
              <button
                onClick={acceptAll}
                style={{
                  background: 'var(--accent-deep)',
                  border: '1px solid var(--accent-deep)',
                  color: '#fff',
                  padding: '12px 34px',
                  fontSize: 12,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                }}
              >
                {t('cc_accept')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: 20, marginBottom: 18 }}>{t('cc_settings_title')}</h3>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 20,
                padding: '14px 0',
                borderTop: '1px solid var(--line)',
              }}
            >
              <div style={{ maxWidth: 640 }}>
                <div style={{ fontSize: 15, marginBottom: 4 }}>{t('cc_nec_title')}</div>
                <div className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>{t('cc_nec_desc')}</div>
              </div>
              <span
                className="muted"
                style={{ fontSize: 12, whiteSpace: 'nowrap', paddingTop: 2 }}
              >
                {t('cc_always')}
              </span>
            </div>
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 20,
                padding: '14px 0',
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
                cursor: 'pointer',
              }}
            >
              <div style={{ maxWidth: 640 }}>
                <div style={{ fontSize: 15, marginBottom: 4 }}>{t('cc_ana_title')}</div>
                <div className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>{t('cc_ana_desc')}</div>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, cursor: 'pointer' }}
              />
            </label>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                marginTop: 20,
              }}
            >
              <button
                onClick={rejectAll}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  padding: '12px 26px',
                  fontSize: 12,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                }}
              >
                {t('cc_reject')}
              </button>
              <button
                onClick={saveChoice}
                style={{
                  background: 'var(--accent-deep)',
                  border: '1px solid var(--accent-deep)',
                  color: '#fff',
                  padding: '12px 34px',
                  fontSize: 12,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                }}
              >
                {t('cc_save')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
