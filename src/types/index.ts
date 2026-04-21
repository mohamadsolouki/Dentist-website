export type Locale = 'en' | 'fa' | 'ar'

export interface NavItem {
  label: string
  href: string
}

export interface ServiceItem {
  id: string
  icon: string
  titleKey: string
  descKey: string
}

export interface TestimonialItem {
  name: string
  location: string
  text: string
  service: string
  rating: number
}

export interface GalleryItem {
  id: string
  category: 'hollywoodSmile' | 'veneers' | 'whitening' | 'implants' | 'clinic'
  aspectRatio: '4/3' | '3/4' | '1/1'
  label: string
}

export interface InstagramPost {
  id: string
  media_url: string
  thumbnail_url?: string
  permalink: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  caption?: string
}
