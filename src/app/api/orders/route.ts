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
    if (resendKey && to && from) {
      try {
        const lines = (items || []).map((i: any) => `• ${i.name} ×${i.qty} — ${i.price} ₴`).join('<br>')
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from, to,
            subject: `Нове замовлення — ${customer_name}`,
            html: `<h2>Нове замовлення</h2><p>${customer_name}, ${customer_phone}</p><p>${delivery || ''}</p>${lines}<p><b>Разом: ${total} ₴</b></p><p>${comment || ''}</p>`,
          }),
        })
      } catch {}
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Помилка' }, { status: 500 })
  }
}
