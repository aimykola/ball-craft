import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customer_name, customer_phone, customer_email, delivery, payment_method, comment, total, items } = body
    if (!customer_name || !customer_phone) {
      return NextResponse.json({ error: 'Вкажіть імʼя та телефон' }, { status: 400 })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string
    if (!url || !service) {
      return NextResponse.json({ error: 'Сервер не налаштований' }, { status: 500 })
    }
    const admin = createClient(url, service, { auth: { persistSession: false } })

    const { data, error } = await admin.from('tct_orders').insert({
      customer_name, customer_phone, customer_email: customer_email || '',
      delivery: delivery || '', payment_method: payment_method || '', comment: comment || '',
      total: Number(total) || 0, items: items || [],
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Optional: email notification via Resend (only if configured)
    const resendKey = process.env.RESEND_API_KEY
    const to = process.env.ORDER_EMAIL_TO
    const from = process.env.ORDER_EMAIL_FROM
    const orderNo = String(data.id || '').slice(0, 8).toUpperCase()
    const lines = (items || []).map((i: any) => `• ${i.name} ×${i.qty} — ${i.price} ₴`).join('<br>')

    // Admin notification
    if (resendKey && to && from) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from, to,
            subject: `Нове замовлення #${orderNo} — ${customer_name}`,
            html: `<h2>Нове замовлення #${orderNo}</h2><p>${customer_name}, ${customer_phone}</p><p>${customer_email || ''}</p><p>${delivery || ''}</p>${lines}<p><b>Разом: ${total} ₴</b></p><p>${comment || ''}</p>`,
          }),
        })
      } catch {}
    }

    // Customer confirmation
    if (resendKey && from && customer_email) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from,
            to: customer_email,
            subject: `Ballcraft — замовлення #${orderNo} прийнято`,
            html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1c1e18"><h2 style="color:#1c1e18">Дякуємо за замовлення!</h2><p>${customer_name}, ми отримали ваше замовлення <b>#${orderNo}</b> і звʼяжемося з вами найближчим часом для підтвердження.</p><h3>Ваше замовлення</h3><p>${lines}</p><p style="font-size:16px"><b>Разом: ${total} ₴</b></p>${delivery ? `<p>Доставка: ${delivery}</p>` : ''}<hr style="border:none;border-top:1px solid #e5e5e0;margin:20px 0"><p style="color:#8a8d84;font-size:13px">Ballcraft — дизайнерські вироби ручної роботи.</p></div>`,
          }),
        })
      } catch {}
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Помилка' }, { status: 500 })
  }
}
