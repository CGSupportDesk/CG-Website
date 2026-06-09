import { writeFile } from 'node:fs/promises'

const siteUrl = 'https://theclosinggap.net'
const publicPages = [
  '',
  'services',
  'about',
  'team',
  'insights',
  'case-studies',
  'our-works',
  'industries',
  'ebooks',
  'faqs',
  'contact',
  'clients-partners',
  'careers',
  'csr',
  'esg',
  'privacy',
  'terms',
  'cookie-policy',
]
const services = [
  'Global Outsourcing',
  'Development & Testing',
  'Digital Marketing',
  'Business Automation',
  'Hiring & Staffing',
  'Personal Branding',
  'Startup & SMB Services',
  'Technology Solutions',
  'Training & Upskilling',
  'Business Consulting',
]
const insights = [
  'Hiring & Staffing Solutions for Growing Businesses',
  'Global Outsourcing Solutions for Modern Business Growth',
  'Development & Testing Solutions for Modern Digital Growth',
  'Digital Marketing Solutions for Modern Business Growth',
  'Business Automation Solutions for Smarter Operations',
  'Personal Branding Solutions for Modern Professionals & Businesses',
  'Startup & SMB Solutions for Sustainable Business Growth',
  'Technology Solutions for Modern Business Transformation',
  'Training & Upskilling Solutions for Workforce Growth',
  'Business Consulting Solutions for Strategic Growth',
  'Building a stronger talent pipeline without slowing delivery',
  'Growth operations readiness: a practical guide for scaling teams',
  'How workflow automation reduces manual follow-up and missed leads',
]
const caseStudies = [
  'Offshore Delivery Team for a Growing IT Firm',
  'Automation Stack for Faster Lead Response',
  'Digital Growth Sprint for a Services Brand',
]

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const paths = [
  ...publicPages,
  ...services.map((service) => `services/${slugify(service)}`),
  ...insights.map((article) => `insights/${slugify(article)}`),
  ...caseStudies.map((caseStudy) => `case-studies/${slugify(caseStudy)}`),
]

function urlForPath(path) {
  return path ? `${siteUrl}/${path}` : `${siteUrl}/`
}

function priorityForPath(path) {
  if (!path) {
    return '1.0'
  }
  if (path === 'services' || path === 'contact') {
    return '0.9'
  }
  if (path.startsWith('services/') || path === 'insights' || path === 'about') {
    return '0.8'
  }
  if (path.startsWith('insights/') || path.startsWith('case-studies/')) {
    return '0.7'
  }
  return '0.6'
}

function changefreqForPath(path) {
  if (!path || path === 'insights' || path.startsWith('insights/')) {
    return 'weekly'
  }
  if (path === 'privacy' || path === 'terms' || path === 'cookie-policy') {
    return 'yearly'
  }
  return 'monthly'
}

function indiaDate(value = new Date()) {
  return new Date(value.getTime() + 330 * 60 * 1000).toISOString().slice(0, 10)
}

const lastmod = indiaDate()
const urls = paths
  .map(
    (path) => `  <url>
    <loc>${urlForPath(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreqForPath(path)}</changefreq>
    <priority>${priorityForPath(path)}</priority>
  </url>`,
  )
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await writeFile('public/sitemap.xml', sitemap, 'utf8')
console.log(`Generated public/sitemap.xml with ${paths.length} URLs.`)
