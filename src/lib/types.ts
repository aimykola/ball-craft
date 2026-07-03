export type Category = {
  id: string
  slug: string
  name: string
  position: number
}

export type SizeOption = { label: string; price: number }
export type ColorOption = { label: string; image: string }

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category_slug: string | null
  image: string
  images: string[]
  in_stock: boolean
  discount: number
  size_options: SizeOption[]
  color_options: ColorOption[]
  archived: boolean
  created_at?: string
}

export type CartItem = {
  product: Product
  qty: number
  size?: string
  color?: string
}

export type Order = {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  total: number
  items: any[]
  delivery: string
  payment_method: string
  comment: string
  status: string
  archived: boolean
  created_at: string
}

export function priceWithDiscount(p: Product): number {
  const d = Number(p.discount) || 0
  return Math.round(Number(p.price) * (1 - d / 100))
}
