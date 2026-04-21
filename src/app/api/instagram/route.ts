import { NextResponse } from 'next/server'

// No API token required - shortcodes are extracted from the public post URLs.
// Instagram's /embed/ iframe URL works in all browsers without any API access.
const POST_URLS: string[] = (process.env.INSTAGRAM_POST_URLS ?? '')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean)

export type InstagramPost = {
  shortcode: string
  permalink: string
  embedUrl: string
}

/** Extract the shortcode from any instagram.com/p/ or /reel/ URL */
function extractShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/)
  return match?.[1] ?? null
}

export async function GET() {
  const data: InstagramPost[] = POST_URLS
    .map((url) => {
      const shortcode = extractShortcode(url)
      if (!shortcode) return null
      return {
        shortcode,
        permalink: url,
        embedUrl: `https://www.instagram.com/reel/${shortcode}/embed/`,
      } satisfies InstagramPost
    })
    .filter((p): p is InstagramPost => p !== null)

  return NextResponse.json({ data })
}
