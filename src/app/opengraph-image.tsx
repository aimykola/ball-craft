import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ballcraft — вироби ручної роботи зі старих тенісних мʼячів'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f7f5',
          color: '#1a1a1a',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 132,
            height: 132,
            borderRadius: 24,
            background: '#1a1a1a',
            color: '#c8a24a',
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: -2,
            marginBottom: 40,
          }}
        >
          BC
        </div>
        <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: 8 }}>BALLCRAFT</div>
        <div style={{ fontSize: 30, color: '#8c8c86', marginTop: 24, letterSpacing: 2 }}>
          CRAFTED WITH PURPOSE
        </div>
        <div style={{ fontSize: 28, color: '#5a5a54', marginTop: 40, maxWidth: 820, textAlign: 'center' }}>
          Дизайнерські вироби зі старих тенісних мʼячів та скла
        </div>
      </div>
    ),
    { ...size }
  )
}
