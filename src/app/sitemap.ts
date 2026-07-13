import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabaseClient'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://ball-craft.vercel.app'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base + '/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: base + '/#catalog', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: base + '/#about', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: base + '/#reviews', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: base + '/#contacts', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: base + '/delivery', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: base + '/returns', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: base + '/faq', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: base + '/privacy', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const { data } = await supabase.from('tct_products').select('id, created_at').eq('archived', false)
    if (data) {
      productRoutes = data.map((p: any) => ({
        url: base + '/product/' + p.id,
        lastModified: p.created_at ? new Date(p.created_at) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch {}

  return [...staticRoutes, ...productRoutes]
}
