'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageContext'
import Header from '@/components/Header'
import { Footer } from '@/components/Sections'
import CartDrawer from '@/components/cart/CartDrawer'
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer'
import FloatingContact from '@/components/FloatingContact'

export default function PrivacyPage() {
  const { t, lang } = useLang()

  const uk = [
    { h: 'Загальні положення', p: 'Ця Політика конфіденційності описує, як ми збираємо, використовуємо та захищаємо ваші персональні дані під час користування нашим сайтом і оформлення замовлень.' },
    { h: 'Які дані ми збираємо', p: 'Ми збираємо лише дані, необхідні для обробки замовлення: імʼя, номер телефону, електронну пошту та адресу доставки. Ми не збираємо платіжних реквізитів через сайт.' },
    { h: 'Як ми використовуємо дані', p: 'Ваші дані використовуються виключно для обробки та доставки замовлень, звʼязку з вами щодо замовлення та, за вашою згодою, для інформування про новинки.' },
    { h: 'Передача третім особам', p: 'Ми передаємо дані лише службі доставки для відправлення замовлення. Ми не продаємо і не передаємо ваші дані для маркетингу сторонніх компаній.' },
    { h: 'Зберігання та захист', p: 'Дані зберігаються на захищених серверах і використовуються лише уповноваженими особами. Ми вживаємо організаційних і технічних заходів для їх захисту.' },
    { h: 'Ваші права', p: 'Ви маєте право запитати, змінити або видалити свої персональні дані. Для цього звʼяжіться з нами через контакти, зазначені на сайті.' },
    { h: 'Cookies', p: 'Сайт може використовувати файли cookie для коректної роботи та покращення досвіду користування. Ви можете керувати ними в налаштуваннях свого браузера.' },
  ]
  const en = [
    { h: 'General', p: 'This Privacy Policy describes how we collect, use and protect your personal data when you use our website and place orders.' },
    { h: 'What data we collect', p: 'We collect only the data needed to process your order: name, phone number, email and delivery address. We do not collect payment details through the site.' },
    { h: 'How we use data', p: 'Your data is used solely to process and deliver orders, to contact you about your order and, with your consent, to inform you about news.' },
    { h: 'Sharing with third parties', p: 'We share data only with the delivery service to ship your order. We do not sell or share your data for third-party marketing.' },
    { h: 'Storage and protection', p: 'Data is stored on secure servers and used only by authorized personnel. We apply organizational and technical measures to protect it.' },
    { h: 'Your rights', p: 'You have the right to request, amend or delete your personal data. To do so, contact us via the details provided on the site.' },
    { h: 'Cookies', p: 'The site may use cookies for proper operation and to improve your experience. You can manage them in your browser settings.' },
  ]
  const blocks = lang === 'uk' ? uk : en

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '48px 0 72px', minHeight: '60vh', maxWidth: 820 }}>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 28 }}>{t('back_to_catalog')}</Link>
        <h1 style={{ fontSize: 34, marginBottom: 32, lineHeight: 1.2 }}>{t('page_privacy_title')}</h1>
        {blocks.map((b, i) => (
          <section key={i} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>{b.h}</h2>
            <p className="muted" style={{ fontSize: 15, lineHeight: 1.8 }}>{b.p}</p>
          </section>
        ))}
      </main>
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <FloatingContact />
    </>
  )
}
