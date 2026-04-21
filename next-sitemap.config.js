/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://drarefehlotfi.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  alternateRefs: [
    { href: 'https://drarefehlotfi.com/en', hreflang: 'en' },
    { href: 'https://drarefehlotfi.com/fa', hreflang: 'fa' },
    { href: 'https://drarefehlotfi.com/ar', hreflang: 'ar' },
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}
