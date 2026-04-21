import { CLINIC_PHONE_DISPLAY, CLINIC_ADDRESS, GOOGLE_MAPS_URL } from '@/lib/utils'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Dr. Arefeh Lotfi — Medicazone Dental Clinic',
    description:
      'Dr. Arefeh Lotfi is a cosmetic and digital dentist in Dubai, specializing in Hollywood Smile, Porcelain Veneers, Teeth Whitening, Digital Dentistry, Smile Design, and Dental Implants.',
    url: 'https://drarefehlotfi.com',
    telephone: CLINIC_PHONE_DISPLAY,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Villa 943, Al Wasl Road, Al Manar',
      addressLocality: 'Umm Suqeim',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1499471,
      longitude: 55.2125937,
    },
    hasMap: GOOGLE_MAPS_URL,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        closes: '19:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'AED',
    paymentAccepted: 'Cash, Credit Card, Insurance',
    sameAs: [
      'https://www.instagram.com/drarefehlotfi',
      'https://www.tiktok.com/@dr.arefehlotfi',
    ],
    image: 'https://drarefehlotfi.com/og-image.jpg',
    medicalSpecialty: 'Dentistry',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
