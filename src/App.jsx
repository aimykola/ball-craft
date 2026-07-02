import { useState, useEffect, useMemo } from 'react'

/* ================= DEMO ДАНІ (тексти-заглушки) ================= */
const PRODUCTS = [
  { id: 'ace', name: 'Ace', category: 'Круглі', balls: 84, photos: 4, price: 7900, oldPrice: 8900, stock: 'В наявності', hue: '#c8e04f',
    desc: 'Кругла стільниця зі загартованого скла та основа з 84 м’ячів. ▫️ Діаметр: 60 см ▫️ Висота: 45 см' },
  { id: 'lob', name: 'Lob', category: 'Прямокутні', balls: 120, photos: 5, price: 10500, oldPrice: 0, stock: 'Під замовлення', hue: '#d7e86f',
    desc: 'Прямокутна модель для вітальні — більша площа та низький силует. ▫️ Розмір: 110×60 см' },
  { id: 'volley', name: 'Volley', category: 'Круглі', balls: 56, photos: 3, price: 5400, oldPrice: 6000, stock: 'В наявності', hue: '#bfd94a',
    desc: 'Компактний приліжковий столик для малих просторів та кави надворі. ▫️ Діаметр: 45 см' },
  { id: 'baseline', name: 'Baseline', category: 'Прямокутні', balls: 160, photos: 6, price: 13800, oldPrice: 0, stock: 'Під замовлення', hue: '#cfe25a',
    desc: 'Флагманська модель із глибокою текстурою та масивною скляною стільницею. ▫️ Розмір: 130×70 см' },
  { id: 'spin', name: 'Spin', category: 'Овальні', balls: 72, photos: 4, price: 8600, oldPrice: 9500, stock: 'В наявності', hue: '#c2dc4f',
    desc: 'Овальна форма зі змішаними відтінками м’ячів та латунними ніжками. ▫️ Розмір: 90×55 см' },
  { id: 'setpoint', name: 'Set Point', category: 'Овальні', balls: 200, photos: 5, price: 17200, oldPrice: 19000, stock: 'Під замовлення', hue: '#d4e866',
    desc: 'Великий акцентний стіл для лаунжів та галерей — 200 м’ячів у основі. ▫️ Розмір: 150×80 см' }
]

const FEATURES = [
  { t: '100% переробка', d: 'Кожен стіл — це десятки врятованих м’ячів' },
  { t: 'Ручна робота', d: 'Збираємо вручну у нашій майстерні' },
  { t: 'Доставка по Україні', d: 'Нова Пошта та інші служби' },
  { t: 'Виготовлення 7–14 днів', d: 'Зіберемо ваше замовлення швидко' }
]

const REVIEWS = [
  { t: 'Стіл — просто вогонь! Став акцентом усієї вітальні.', n: 'Олена' },
  { t: 'Якість неймовірна, скло міцне. Дякую за роботу!', n: 'Марія' },
  { t: 'Швидко зробили та відправили. Рекомендую!', n: 'Ірина' }
]

const fmt = (n) => n.toLocaleString('uk-UA')

/* ================= SVG-ПЛЕЙСХОЛДЕРИ ФОТО ================= */
function TableArt({ hue = '#c8e04f', variant = 0 }) {
  const cols = 5, rows = 4
  const balls = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 60 + c * 70 + (r % 2) * 12
      const y = 150 + r * 46
      const j = ((variant + r * 7 + c * 13) % 5) - 2
      balls.push(
        <g key={r + '-' + c}>
          <circle cx={x} cy={y + j} r={26} fill={hue} opacity={0.92} />
          <path d={'M' + (x-24) + ' ' + (y+j) + ' q 24 -22 48 0'} stroke="#fff" strokeWidth={2} fill="none" opacity={0.85} />
          <path d={'M' + (x-24) + ' ' + (y+j) + ' q 24 22 48 0'} stroke="#fff" strokeWidth={2} fill="none" opacity={0.85} />
        </g>
      )
    }
  }
  const bg = ['#fbfcfa', '#f7f8f2', '#f4f6ee', '#f9faf4', '#f6f8f0', '#fbfcf6'][variant % 6]
  return (
    <svg viewBox="0 0 460 460" role="img" aria-label="Фото столика">
      <rect width="460" height="460" fill={bg} />
      <ellipse cx="230" cy="120" rx="170" ry="40" fill="#ffffff" stroke="#e8e8e8" />
      <rect x="56" y="120" width="348" height="200" fill={bg} />
      {balls}
      <ellipse cx="230" cy="320" rx="170" ry="40" fill="#f2f3ef" stroke="#e8e8e8" />
      <rect x="96" y="320" width="8" height="70" fill="#d7d9d2" />
      <rect x="356" y="320" width="8" height="70" fill="#d7d9d2" />
    </svg>
  )
}

function EcoArt() {
  return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Переробка м’ячів">
      <rect width="520" height="420" fill="#ffffff" />
      <circle cx="260" cy="210" r="150" fill="#f5f7f0" />
      {[0,1,2,3,4,5,6].map(i => {
        const a = (i / 7) * Math.PI * 2
        const x = 260 + Math.cos(a) * 96
        const y = 210 + Math.sin(a) * 96
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={30} fill="#c8e04f" opacity={0.9} />
            <path d={'M' + (x-28) + ' ' + y + ' q 28 -26 56 0'} stroke="#fff" strokeWidth={2.5} fill="none" />
          </g>
        )
      })}
      <circle cx="260" cy="210" r="46" fill="#ffffff" stroke="#e5e5e5" />
      <path d="M244 210 l10 10 l20 -22" stroke="#b6d13a" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BrandMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#1c1e1a" />
      <circle cx="20" cy="20" r="11" fill="#c8e04f" />
      <path d="M9 20 q11 -10 22 0" stroke="#fff" strokeWidth="1.8" fill="none" />
      <path d="M9 20 q11 10 22 0" stroke="#fff" strokeWidth="1.8" fill="none" />
    </svg>
  )
}

/* ================= ОСНОВНИЙ КОМПОНЕНТ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', model: 'Ace', message: '' })
  const [gallery, setGallery] = useState({})

  /* фільтри каталогу */
  const [cat, setCat] = useState('Всі')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [stockF, setStockF] = useState('Будь-яка')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const categories = ['Всі', ...new Set(PRODUCTS.map((p) => p.category)), 'Зі знижкою']

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (cat === 'Зі знижкою') { if (!p.oldPrice) return false }
      else if (cat !== 'Всі' && p.category !== cat) return false
      if (stockF !== 'Будь-яка' && p.stock !== stockF) return false
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
      if (priceMin && p.price < Number(priceMin)) return false
      if (priceMax && p.price > Number(priceMax)) return false
      return true
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [cat, query, sort, stockF, priceMin, priceMax])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const addToCart = (p) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id)
      if (ex) return c.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...c, { id: p.id, name: p.name, price: p.price, qty: 1 }]
    })
    setCartOpen(true)
  }
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id))

  const orderModel = (name) => {
    setForm((f) => ({ ...f, model: name }))
    setSent(false)
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
  }

  const submit = (e) => { e.preventDefault(); setSent(true) }
  const nav = (id) => (e) => { e.preventDefault(); setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const setPhoto = (id, i) => setGallery((g) => ({ ...g, [id]: i }))

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className="site-header">
        <div className="container">
          <nav className={'nav' + (menuOpen ? ' open' : '')}>
            <a className="brand" href="#top" onClick={nav('top')}>
              <BrandMark />
              <span>Tennis Coffee Table<small>eco design studio</small></span>
            </a>
            <ul className="nav-links">
              <li><a href="#catalog" onClick={nav('catalog')}>Каталог</a></li>
              <li><a href="#about" onClick={nav('about')}>Про нас</a></li>
              <li><a href="#reviews" onClick={nav('reviews')}>Відгуки</a></li>
              <li><a href="#contacts" onClick={nav('contacts')}>Контакти</a></li>
            </ul>
            <div className="nav-actions">
              <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Кошик">
                Кошик{cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              <button className="nav-toggle" aria-label="Меню" onClick={() => setMenuOpen((v) => !v)}>
                <span /><span /><span />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="reveal in">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;екодизайн • ручна робота</span>
              <h1 className="hero-title">Кавові столики зі <em>старих м’ячів</em> та скла</h1>
              <p className="hero-sub">Ми перетворюємо відпрацьовані тенісні м’ячі на скульптурні кавові столики зі скляною стільницею. Мінімалізм та друге життя матеріалів.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#catalog" onClick={nav('catalog')}>Переглянути вироби &rarr;</a>
                <a className="btn btn-ghost" href="#contacts" onClick={nav('contacts')}>Зв’язатись</a>
              </div>
            </div>
            <div className="hero-visual reveal in">
              <div className="hero-card"><TableArt hue="#c8e04f" variant={3} /><div className="hero-badge"><span className="dot" />100% перероблені матеріали</div></div>
            </div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section className="features">
          <div className="container">
            <h2 className="features-title reveal">Чому обирають нас</h2>
            <div className="features-grid">
              {FEATURES.map((f, i) => (
                <div className="feature reveal" key={i} style={{ transitionDelay: i * 60 + 'ms' }}>
                  <div className="feature-ic"><span /></div>
                  <b>{f.t}</b><p>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Catalog ---------- */}
        <section id="catalog" className="catalog section-pad">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;каталог</span>
              <h2>Наші вироби</h2>
              <p>Дизайнерські кавові столики із перероблених тенісних м’ячів. Ціни та фото — демо.</p>
            </div>

            {/* filter bar */}
            <div className="filters reveal">
              <div className="filter-row">
                <span className="filter-label">Категорія:</span>
                {categories.map((c) => (
                  <button key={c} className={'chip' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>
              <div className="filter-row">
                <span className="filter-label">Наявність:</span>
                {['Будь-яка', 'В наявності', 'Під замовлення'].map((s) => (
                  <button key={s} className={'chip' + (stockF === s ? ' active' : '')} onClick={() => setStockF(s)}>{s}</button>
                ))}
              </div>
              <div className="filter-row wrap">
                <input className="filter-input grow" placeholder="Пошук за назвою..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <select className="filter-input" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="default">За замовчуванням</option>
                  <option value="price-asc">Дешевші спершу</option>
                  <option value="price-desc">Дорожчі спершу</option>
                </select>
                <input className="filter-input narrow" type="number" placeholder="від" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                <input className="filter-input narrow" type="number" placeholder="до" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
              </div>
              <div className="found">Знайдено: {filtered.length}</div>
            </div>

            <div className="grid">
              {filtered.map((p, i) => {
                const photo = gallery[p.id] || 0
                const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0
                return (
                  <article className="card reveal" key={p.id} style={{ transitionDelay: (i % 3) * 60 + 'ms' }}>
                    <div className="card-media">
                      {discount > 0 && <span className="badge-discount">−{discount}%</span>}
                      <span className={'badge-stock' + (p.stock === 'В наявності' ? ' in' : '')}>{p.stock}</span>
                      <TableArt hue={p.hue} variant={photo} />
                      <div className="gallery-dots">
                        {Array.from({ length: p.photos }).map((_, k) => (
                          <button key={k} className={'dot' + (photo === k ? ' on' : '')} aria-label={'Фото ' + (k+1)} onClick={() => setPhoto(p.id, k)} />
                        ))}
                      </div>
                    </div>
                    <div className="card-body">
                      <h3>{p.name}</h3>
                      <p className="desc">{p.desc}</p>
                      <div className="card-meta">
                        <div className="prices">
                          {p.oldPrice ? <span className="old">{fmt(p.oldPrice)} грн</span> : null}
                          <span className="price">{fmt(p.price)} грн</span>
                        </div>
                        <span className="balls-lbl">{p.balls} м’ячів</span>
                      </div>
                      <div className="card-actions">
                        <button className="card-btn buy" onClick={() => addToCart(p)}>В кошик</button>
                        <button className="card-btn ghost" onClick={() => orderModel(p.name)}>Замовити</button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
            {filtered.length === 0 && <div className="empty">Нічого не знайдено — змініть фільтри.</div>}
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="about section-pad">
          <div className="container about-grid">
            <div className="about-visual reveal"><EcoArt /></div>
            <div className="reveal">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;про нас</span>
              <h2>Друге життя тенісного м’яча</h2>
              <p>Щороку мільйони тенісних м’ячів опиняються на звалищах. Ми збираємо їх на кортах та в клубах, очищаємо та даємо їм нову роль — частину інтер’єру.</p>
              <p>Це текст-заглушка про бренд: мінімалізм, екологічність та повага до матеріалу.</p>
              <div className="about-points">
                <div className="about-point"><div className="ic"><span /></div><div><b>Екологічність</b><p>Менше відходів, довший цикл матеріалу.</p></div></div>
                <div className="about-point"><div className="ic"><span /></div><div><b>Ручна робота</b><p>Кожна модель — вручну.</p></div></div>
                <div className="about-point"><div className="ic"><span /></div><div><b>Міцне скло</b><p>Загартована стільниця.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Reviews ---------- */}
        <section id="reviews" className="reviews section-pad">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;відгуки</span>
              <h2>Що кажуть клієнти</h2>
            </div>
            <div className="reviews-grid">
              {REVIEWS.map((r, i) => (
                <figure className="review reveal" key={i} style={{ transitionDelay: i * 60 + 'ms' }}>
                  <div className="stars">★★★★★</div>
                  <blockquote>{r.t}</blockquote>
                  <figcaption>— {r.n}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Contacts / Order ---------- */}
        <section id="contacts" className="order section-pad">
          <div className="container order-grid">
            <div className="order-aside reveal">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;контакти</span>
              <h2>Зв’яжіться з нами</h2>
              <p>Залиште заявку — ми зв’яжемося протягом доби, уточнимо деталі та терміни.</p>
              <div className="contact-list">
                <div className="contact-item"><span className="k">Instagram</span><a href="https://instagram.com" target="_blank" rel="noreferrer">@tennis.coffee.table</a></div>
                <div className="contact-item"><span className="k">Телефон</span><a href="tel:+380000000000">+38 (000) 000 00 00</a></div>
                <div className="contact-item"><span className="k">Email</span><a href="mailto:hello@tenniscoffee.example">hello@tenniscoffee.example</a></div>
              </div>
            </div>
            <form className="form reveal" onSubmit={submit}>
              <div className="form-row two">
                <div className="form-field"><label htmlFor="f-name">Ім’я</label><input id="f-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше ім’я" /></div>
                <div className="form-field"><label htmlFor="f-email">Email</label><input id="f-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" /></div>
              </div>
              <div className="form-field"><label htmlFor="f-model">Модель</label><select id="f-model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })}>{PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name} — {fmt(p.price)} грн</option>)}</select></div>
              <div className="form-field"><label htmlFor="f-msg">Коментар</label><textarea id="f-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Побажання щодо кольору, розміру тощо" /></div>
              <button type="submit" className="btn btn-primary full">Надіслати заявку</button>
              {sent && <div className="form-success">Дякуємо! Заявку на «{form.model}» отримано (демо).</div>}
              <p className="form-note">Демо-форма: дані не надсилаються на сервер.</p>
            </form>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a className="brand" href="#top" onClick={nav('top')}><BrandMark /><span style={{ color: '#fff' }}>Tennis Coffee Table<small>eco design studio</small></span></a>
              <p>Дизайнерські кавові столики із перероблених тенісних м’ячів та скла.</p>
            </div>
            <div className="footer-col"><h4>Навігація</h4><a href="#catalog" onClick={nav('catalog')}>Каталог</a><a href="#about" onClick={nav('about')}>Про нас</a><a href="#reviews" onClick={nav('reviews')}>Відгуки</a><a href="#contacts" onClick={nav('contacts')}>Контакти</a></div>
            <div className="footer-col"><h4>Контакти</h4><a href="mailto:hello@tenniscoffee.example">hello@tenniscoffee.example</a><a href="tel:+380000000000">+38 (000) 000 00 00</a><div className="socials"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Facebook">FB</a><a href="#" aria-label="Pinterest">Pin</a></div></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Tennis Coffee Table · екодизайн з любов’ю</span><span>React + Vite • демо-проєкт</span></div>
        </div>
      </footer>

      {/* ---------- Floating contact button ---------- */}
      <a className="fab" href="#contacts" onClick={nav('contacts')} aria-label="Зв’язатися">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/></svg>
      </a>

      {/* ---------- Cart drawer ---------- */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-head"><h3>Кошик</h3><button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Закрити">×</button></div>
            {cart.length === 0 ? (
              <p className="cart-empty">Кошик порожній. Додайте столик із каталогу.</p>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.map((i) => (
                    <li key={i.id} className="cart-item">
                      <div><b>{i.name}</b><span>{fmt(i.price)} грн × {i.qty}</span></div>
                      <button className="cart-remove" onClick={() => removeFromCart(i.id)} aria-label="Видалити">×</button>
                    </li>
                  ))}
                </ul>
                <div className="cart-total"><span>Разом</span><b>{fmt(cartTotal)} грн</b></div>
                <button className="btn btn-primary full" onClick={() => { setCartOpen(false); document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' }) }}>Оформити замовлення</button>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  )
}

