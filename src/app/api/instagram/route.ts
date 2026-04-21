import { NextResponse } from 'next/server'

export const revalidate = 3600 // revalidate every hour

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    // Return placeholder data when token is not configured
    return NextResponse.json({
      data: Array.from({ length: 9 }, (_, i) => ({
        id: `placeholder-${i}`,
        media_url: null,
        thumbnail_url: null,
        permalink: 'https://www.instagram.com/drarefehlotfi',
        media_type: 'IMAGE',
        caption: 'Follow @drarefehlotfi on Instagram',
      })),
      placeholder: true,
    })
  }

  try {
    const fields = 'id,media_url,thumbnail_url,permalink,media_type,caption,timestamp'
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=9&access_token=${token}`
    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
      throw new Error(`Instagram API error: ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Instagram API fetch failed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts', data: [] },
      { status: 502 }
    )
  }
}
