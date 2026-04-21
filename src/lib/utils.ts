import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const WHATSAPP_NUMBER = '971564220620'
export const CLINIC_PHONE = '+971557725086'
export const CLINIC_PHONE_DISPLAY = '+971 55 772 5086'
export const WHATSAPP_DISPLAY = '+971 56 422 0620'
export const CLINIC_ADDRESS = 'Villa 943, Al Wasl Road, Al Manar, Umm Suqeim, Dubai'
export const CLINIC_NAME = 'Hoor Al Aliaa Dental Clinic'
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/11UrtwcRo5EMfYN58'
export const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5!2d55.2100188!3d25.1499471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b38ae2c5e95%3A0x762705da2a9a00fa!2sDr.%20Arefeh%20Lottfi!5e0!3m2!1sen!2sae!4v1714000000000!5m2!1sen!2sae'

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/drarefehlotfi',
  tiktok: 'https://tiktok.com/@dr.arefehlotfi',
  youtube: 'https://youtube.com/@dr.arefehlotfi',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
}

export function getWhatsAppLink(message?: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}`
  if (message) return `${url}?text=${encodeURIComponent(message)}`
  return url
}
