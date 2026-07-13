import type { Metadata } from 'next'
import { Forum, Cormorant } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart/CartContext'
import { FavoritesProvider } from '@/components/favorites/FavoritesContext'
import { LanguageProvider } from '@/components/LanguageContext'

const forum = Forum({ subsets: ['latin', 'cyrillic'], weight: '400', variable: '--font-sans' })
const cormorant = Cormorant({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'], variable: '--font-serif' })

export const metadata: Metadata = {
  metadataBase: new URL('https://ball-craft.vercel.app'),
  title: {
    default: 'Ballcraft — вироби ручної роботи зі старих тенісних мʼячів',
    template: '%s · Ballcraft',
  },
  description: 'Ballcraft — дизайнерські кавові столики зі старих тенісних мʼячів та скла. Мінімалізм, екологічність, ручна робота.',
  keywords: ['Ballcraft', 'кавовий столик', 'тенісні мʼячі', 'ручна робота', 'екодизайн', 'меблі', 'recycled furniture'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://ball-craft.vercel.app',
    siteName: 'Ballcraft',
    title: 'Ballcraft — вироби ручної роботи зі старих тенісних мʼячів',
    description: 'Дизайнерські кавові столики зі старих тенісних мʼячів та скла. Мінімалізм, екологічність, ручна робота.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ballcraft — вироби ручної роботи зі старих тенісних мʼячів',
    description: 'Дизайнерські кавові столики зі старих тенісних мʼячів та скла.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${forum.variable} ${cormorant.variable}`}>
      <body>
        <LanguageProvider>
        <CartProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
