import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, Dispatch, FormEvent, MouseEvent as ReactMouseEvent, ReactNode, SetStateAction } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import {
  ArrowUpRight,
  Asterisk,
  BarChart3,
  ChevronDown,
  CheckCircle2,
  CircleDot,
  Download,
  Globe2,
  Grip,
  ImagePlus,
  Layers,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
  Workflow,
  X,
} from 'lucide-react'
import './App.css'
import { importedServiceInsights } from './data/serviceInsights'

const imageBase = '/assets/closing-gap/'
const legacyImageBase = '/reference/finovate-root/images/'
const legacySecondaryImageBase = '/reference/finovate/images/'
const siteUrl = 'https://theclosinggap.net'
const siteName = 'Closing Gap'
const defaultSeoDescription =
  'Closing Gap provides 360 degree business solutions across hiring, outsourcing, technology, automation, digital marketing, consulting, and workforce growth.'
const defaultSeoKeywords =
  'Closing Gap, 360 degree business solutions, global outsourcing, hiring and staffing, business automation, digital marketing, technology solutions, business consulting, training and upskilling, startup SMB services'

const images = {
  brandLogo: `${imageBase}brand-logo.webp`,
  brandLogoLight: `${imageBase}brand-logo-light.webp`,
  brandMark: `${imageBase}brand-mark.webp`,
  hero: `${imageBase}hero-360-business-solutions.webp`,
  metric: `${imageBase}home-metrics-operations.webp`,
  cta: `${imageBase}home-consultation-cta.webp`,
  advisor: `${imageBase}advisor-meeting.webp`,
  newsletter: `${imageBase}newsletter-insights.webp`,
  blogOne: `${imageBase}service-digital-marketing.webp`,
  blogThree: `${imageBase}service-business-automation.webp`,
  report: `${imageBase}ebook-cover-mockup.webp`,
  serviceGlobal: `${imageBase}service-global-outsourcing.webp`,
  serviceDevelopment: `${imageBase}service-development-testing.webp`,
  serviceMarketing: `${imageBase}service-digital-marketing.webp`,
  serviceAutomation: `${imageBase}service-business-automation.webp`,
  serviceHiring: `${imageBase}service-hiring-staffing.webp`,
  serviceBranding: `${imageBase}service-personal-branding.webp`,
  serviceStartup: `${imageBase}service-startup-smb.webp`,
  serviceTechnology: `${imageBase}service-technology-solutions.webp`,
  serviceTraining: `${imageBase}service-training-upskilling.webp`,
  serviceConsulting: `${imageBase}service-business-consulting.webp`,
  teamDelivery: `${imageBase}team-delivery-strategy.webp`,
  teamTalent: `${imageBase}team-talent-desk.webp`,
  teamAutomation: `${imageBase}team-automation-lab.webp`,
  teamGrowth: `${imageBase}team-growth-studio.webp`,
  teamNaveen: `${imageBase}team-naveen-abraham.webp`,
  teamHannah: `${imageBase}team-hannah-justus.webp`,
  teamKingston: `${imageBase}team-kingston-robert.webp`,
  teamSruthi: `${imageBase}team-sruthi-s.webp`,
  teamAadithya: `${imageBase}team-aadithya-r.webp`,
  clientRukCabs: `${imageBase}client-ruk-cabs.webp`,
  clientSarensNass: `${imageBase}client-sarens-nass.webp`,
  clientGoalFoc: '/assets/partner-goalfoc.png',
  clientMyShopp: `${imageBase}client-my-shopp.webp`,
  clientPurpleHealth: `${imageBase}client-purple-health.webp`,
  clientHti: `${imageBase}client-hti.webp`,
  clientToska: `${imageBase}client-toska.webp`,
  certIaf: `${imageBase}cert-iaf.webp`,
  certKeralaStartupMission: `${imageBase}cert-kerala-startup-mission.webp`,
  certDpiit: `${imageBase}cert-dpiit.webp`,
}

type PageKey = string

type PageLink = {
  key: PageKey
  label: string
}

type BlogPost = {
  id: string
  tag: string
  title: string
  description: string
  image: string
  sections: string[]
  content?: ArticleContentSection[]
  featured?: boolean
}

type ArticleSubsection = {
  heading: string
  paragraphs: string[]
  bullets: string[]
}

type ArticleContentSection = ArticleSubsection & {
  subsections: ArticleSubsection[]
}

type BlogDraft = {
  title: string
  tag: string
  description: string
  sectionsText: string
  image: string
}

type ContactFormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  website: string
}

type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error'

const customInsightsStorageKey = 'closing-gap-custom-insights-v1'
const introLoaderStorageKey = 'closing-gap-intro-seen-v1'
const contactFormEndpoint = 'https://formsubmit.co/ajax/info@theclosinggap.net'
const contactFormFallbackEndpoint = 'https://formsubmit.co/info@theclosinggap.net'
const contactFormSubject = 'New Closing Gap 360 Consultation Request'
const contactSpamBlacklist = 'casino,betting,viagra,pharma,crypto,loan,forex,adult'
const allowedUploadTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const maxStoredImageSize = 1_600_000

const primaryNav: PageLink[] = [
  { key: 'home', label: 'Home' },
  { key: 'services', label: 'Solutions' },
  { key: 'about', label: 'About' },
  { key: 'team', label: 'Team' },
  { key: 'insights', label: 'Insights' },
  { key: 'contact', label: 'Contact' },
]

const companyNav: PageLink[] = [
  { key: 'about', label: 'About Us' },
  { key: 'team', label: 'Our Team' },
  { key: 'clients-partners', label: 'Clients & Partners' },
  { key: 'careers', label: 'Careers' },
  { key: 'csr', label: 'CSR' },
  { key: 'esg', label: 'ESG' },
]

const resourceNav: PageLink[] = [
  { key: 'insights', label: 'Blog & Insights' },
  { key: 'case-studies', label: 'Case Studies' },
  { key: 'our-works', label: 'Our Works' },
  { key: 'industries', label: 'Industries Served' },
  { key: 'ebooks', label: 'Ebooks' },
  { key: 'faqs', label: 'FAQs' },
]

const legalNav: PageLink[] = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms & Conditions' },
  { key: 'cookie-policy', label: 'Cookie Policy' },
]

const socialLinks = [
  { label: 'LinkedIn', shortLabel: 'In', href: 'https://www.linkedin.com/company/closing-gap/' },
  { label: 'Instagram', shortLabel: 'Ig', href: 'https://www.instagram.com/closinggap?igsh=MW5uNTJjbWpuNmVtZw==' },
  { label: 'Facebook', shortLabel: 'Fb', href: 'https://www.facebook.com/profile.php?id=61586004990745' },
  { label: 'Threads', shortLabel: 'Th', href: 'https://www.threads.com/@closinggap' },
  { label: 'X', shortLabel: 'X', href: 'https://x.com/theclosinggap?t=pwjIyKLryNqWuvWzBZdE7A&s=09' },
  { label: 'YouTube', shortLabel: 'Yt', href: 'https://www.youtube.com/' },
  { label: 'Substack', shortLabel: 'Su', href: 'https://closinggap.substack.com/?r=6upoj0&utm_campaign=pub-share-checklist' },
  {
    label: 'Reddit',
    shortLabel: 'Rd',
    href: 'https://www.reddit.com/user/closinggap/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
  },
]

const partnerLogos = [
  { name: 'RUK CABS', src: images.clientRukCabs },
  { name: 'Sarens Nass', src: images.clientSarensNass },
  { name: 'GoalFoc', src: images.clientGoalFoc },
  { name: 'My Shopp', src: images.clientMyShopp },
  { name: 'Purple Health', src: images.clientPurpleHealth },
  { name: 'HTI', src: images.clientHti },
  { name: 'TOSKA', src: images.clientToska },
]

const certificationLogos = [
  { name: 'International Accreditation Forum', src: images.certIaf },
  { name: 'Kerala Startup Mission', src: images.certKeralaStartupMission },
  { name: 'DPIIT', src: images.certDpiit },
]

const coreServices = [
  {
    title: 'Global Outsourcing',
    description: 'Global delivery capacity for operations, support, and project execution.',
    detail:
      'Build reliable offshore capacity with role planning, delivery governance, onboarding support, and a practical operating rhythm.',
    image: images.serviceGlobal,
    icon: Globe2,
    bullets: ['Role planning', 'Compliance coordination', 'Remote delivery support'],
    outcomes: ['Lower delivery overhead', 'Cleaner onboarding', 'More scalable execution'],
  },
  {
    title: 'Development & Testing',
    description: 'Web, cloud, app, QA, security, and performance support for reliable digital products.',
    detail:
      'Plan, build, test, and release digital products with engineering support that keeps quality visible throughout the project.',
    image: images.serviceDevelopment,
    icon: Layers,
    bullets: ['Web and app delivery', 'QA planning', 'Release support'],
    outcomes: ['Fewer release surprises', 'Clearer technical delivery', 'Better product reliability'],
  },
  {
    title: 'Digital Marketing',
    description: 'SEO, paid media, content, analytics, and performance campaigns connected to revenue.',
    detail:
      'Turn visibility into qualified demand with search, paid campaigns, content, social execution, and reporting that supports decisions.',
    image: images.serviceMarketing,
    icon: BarChart3,
    bullets: ['SEO and paid ads', 'Content planning', 'Performance tracking'],
    outcomes: ['Sharper visibility', 'Better lead quality', 'Clearer marketing ROI'],
  },
  {
    title: 'Business Automation',
    description: 'CRM, workflow, lead routing, and messaging automation that reduces manual drag.',
    detail:
      'Connect forms, messages, CRMs, follow-ups, reports, and internal workflows so repeated work moves without constant manual effort.',
    image: images.serviceAutomation,
    icon: Workflow,
    bullets: ['CRM workflows', 'Lead routing', 'WhatsApp replies'],
    outcomes: ['Faster response times', 'Fewer missed follow-ups', 'Cleaner operations'],
  },
  {
    title: 'Hiring & Staffing',
    description: 'Fast candidate shortlisting, screening, and staffing support for high-impact roles.',
    detail:
      'Find the right people faster with focused role definition, candidate screening, interview support, and staffing coordination.',
    image: images.serviceHiring,
    icon: Users,
    bullets: ['Talent sourcing', 'AI-assisted screening', 'Interview support'],
    outcomes: ['Better candidate fit', 'Less resume noise', 'Faster hiring cycles'],
  },
  {
    title: 'Personal Branding',
    description: 'Resume, LinkedIn, interview, and content support for leaders and professionals.',
    detail:
      'Clarify professional positioning through ATS-friendly resumes, LinkedIn profile work, interview coaching, and practical content direction.',
    image: images.serviceBranding,
    icon: ShieldCheck,
    bullets: ['ATS resumes', 'LinkedIn makeover', 'Interview coaching'],
    outcomes: ['Stronger profile clarity', 'Better recruiter visibility', 'More confident interviews'],
  },
  {
    title: 'Startup & SMB Services',
    description: 'Lean 360-degree support for founders who need execution capacity without heavy overhead.',
    detail:
      'Give startups and SMBs access to flexible growth support across marketing, operations, hiring, automation, and technical delivery.',
    image: images.serviceStartup,
    icon: CircleDot,
    bullets: ['Go-to-market plans', 'Operating systems', 'Founder support'],
    outcomes: ['Lean execution capacity', 'Practical launch support', 'Better founder focus'],
  },
  {
    title: 'Technology Solutions',
    description: 'Integrated business systems using Zoho, Power Platform, dashboards, and connected tools.',
    detail:
      'Design practical business systems with connected tools, dashboards, automations, and integrations that match daily workflows.',
    image: images.serviceTechnology,
    icon: Layers,
    bullets: ['Zoho systems', 'Power Platform', 'Dashboards'],
    outcomes: ['Connected tool stack', 'Cleaner reporting', 'Stronger operating visibility'],
  },
  {
    title: 'Training & Upskilling',
    description: 'Hire-train-deploy, team enablement, and practical skill programs for growth teams.',
    detail:
      'Support teams with role-based learning, hire-train-deploy models, and practical upskilling designed around business outcomes.',
    image: images.serviceTraining,
    icon: CheckCircle2,
    bullets: ['Role-based training', 'HTD programs', 'Team enablement'],
    outcomes: ['Sharper team capability', 'Faster ramp-up', 'Better role readiness'],
  },
  {
    title: 'Business Consulting',
    description: '360° strategy, process design, governance, and operating rhythm advisory.',
    detail:
      'Clarify priorities, build a workable plan, define ownership, and improve execution rhythm across teams and functions.',
    image: images.serviceConsulting,
    icon: Workflow,
    bullets: ['Process mapping', 'Growth planning', 'Governance'],
    outcomes: ['Clearer priorities', 'Better accountability', 'Stronger execution rhythm'],
  },
]

const values = [
  {
    title: 'Integrity',
    text: 'We keep decisions transparent, practical, and aligned with measurable outcomes.',
  },
  {
    title: 'Client Focus',
    text: 'Your goals shape the team, systems, timelines, and 360° growth strategy we build.',
  },
  {
    title: 'Risk Resilience',
    text: 'We design delivery models that protect quality while helping teams move faster.',
  },
  {
    title: 'Expertise',
    text: 'Specialists across talent, technology, marketing, automation, and operations.',
  },
]

const teamStats = [
  { value: '45+', label: 'Successful placements' },
  { value: '4+', label: 'Countries served' },
  { value: '30+', label: 'Projects delivered' },
  { value: '720+', label: 'Hours saved' },
]

const process = [
  {
    step: '01',
    title: 'Understand',
    text: 'We map your goals, blockers, team capacity, and timelines before proposing a route.',
  },
  {
    step: '02',
    title: 'Design',
    text: 'We shape the right mix of talent, outsourcing, automation, marketing, technology, and delivery.',
  },
  {
    step: '03',
    title: 'Scale',
    text: 'We track results, tighten execution, and expand what works across the business.',
  },
]

const faqs = [
  {
    question: 'How quickly can you fill a position or deliver a project?',
    answer:
      'We usually move from discovery to a curated shortlist within days. Delivery timelines depend on the scope, but speed and quality stay central to the plan.',
  },
  {
    question: 'How do you ensure the quality of candidates?',
    answer:
      'We combine AI-assisted screening, expert vetting, structured interviews, and practical role-fit evaluation.',
  },
  {
    question: 'What does personal branding include?',
    answer:
      'ATS resumes, LinkedIn makeovers, interview preparation, profile positioning, and content guidance.',
  },
  {
    question: 'What automation solutions do you provide?',
    answer:
      'CRM integrations, workflow automation, lead routing, WhatsApp and Instagram replies, reporting, and optimization systems.',
  },
  {
    question: 'Can you support startups and small businesses?',
    answer:
      'Yes. We design lean support models for startups and SMBs that need capability without heavy internal overhead.',
  },
  {
    question: 'How do you ensure quality in development projects?',
    answer:
      'We combine delivery planning, code review, QA checks, security thinking, and post-launch support.',
  },
]

const teamMembers = [
  { name: 'Naveen Abraham', role: 'Director', image: images.teamNaveen },
  { name: 'Hannah Justus', role: 'Operations Manager', image: images.teamHannah },
  { name: 'Kingston Robert', role: 'Technology Lead', image: images.teamKingston },
  { name: 'Sruthi S', role: 'People Operations Executive', image: images.teamSruthi },
  { name: 'Aadithya R', role: 'People Operations Executive', image: images.teamAadithya },
]

const emptyBlogDraft: BlogDraft = {
  title: '',
  tag: '',
  description: '',
  sectionsText: '',
  image: '',
}

const emptyContactForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: '',
}

const defaultInsights: BlogPost[] = [
  ...importedServiceInsights,
  {
    id: 'default-talent-pipeline',
    tag: 'Hiring',
    title: 'Building a stronger talent pipeline without slowing delivery',
    description: 'A practical look at role planning, candidate screening, and lean hiring velocity.',
    image: images.blogOne,
    sections: [
      'Strong hiring starts before sourcing. The clearest teams define outcomes, reporting lines, and ramp expectations before they open the role.',
      'A better pipeline filters for evidence, communication, and fit. That means fewer generic resumes and more useful conversations.',
      'When hiring and onboarding are connected, the first 30 days become part of the growth system instead of a handoff gap.',
    ],
  },
  {
    id: 'default-growth-operations-readiness',
    tag: 'Report',
    title: 'Growth operations readiness: a practical guide for scaling teams',
    description: 'How to identify execution gaps before they become expensive operational drag.',
    image: images.report,
    featured: true,
    sections: [
      'Growth operations readiness is the ability to keep moving as volume rises. It depends on ownership, systems, reporting, and response speed.',
      'The common warning signs are duplicated manual work, unclear dashboards, slow hiring, and leadership decisions made without clean inputs.',
      'A readiness review gives leaders a practical map of what to automate, outsource, hire, or simplify next.',
    ],
  },
  {
    id: 'default-workflow-automation',
    tag: 'Automation',
    title: 'How workflow automation reduces manual follow-up and missed leads',
    description: 'CRM workflows, lead routing, and messaging systems that make sales operations calmer.',
    image: images.blogThree,
    sections: [
      'Automation works best when it protects attention. The goal is not more tools, but fewer repeated manual decisions.',
      'Lead routing, instant replies, CRM updates, and reporting can remove delays without making the customer experience feel robotic.',
      'The strongest systems keep humans in the right moments and let software handle the predictable steps.',
    ],
  },
]

const caseStudies = [
  {
    title: 'Offshore Delivery Team for a Growing IT Firm',
    metric: '32% lower delivery overhead',
    description:
      'Closing Gap helped structure a lean overseas delivery team with role clarity, onboarding rhythm, and QA support.',
    image: images.serviceGlobal,
    challenge: 'The client needed delivery capacity without adding heavy local overhead or slowing active projects.',
    solution: 'We mapped roles, defined communication rhythm, supported onboarding, and created a quality review loop.',
    result: 'Delivery overhead dropped while project control and team visibility improved.',
  },
  {
    title: 'Automation Stack for Faster Lead Response',
    metric: '35% lift in conversion',
    description:
      'Lead capture, WhatsApp replies, and CRM updates were connected into a cleaner response workflow.',
    image: images.serviceAutomation,
    challenge: 'Manual follow-up meant leads were being missed during peak campaign periods.',
    solution: 'We connected inquiry forms, messaging, CRM updates, and assignment rules into one response workflow.',
    result: 'Response time improved and sales conversion increased across the next campaign cycle.',
  },
  {
    title: 'Digital Growth Sprint for a Services Brand',
    metric: '3x traffic in 90 days',
    description:
      'SEO, content, paid campaigns, and reporting cadence helped turn web visibility into qualified inquiries.',
    image: images.serviceMarketing,
    challenge: 'The brand had low search visibility and inconsistent lead quality.',
    solution: 'We tightened campaign targeting, improved content structure, and introduced weekly performance reporting.',
    result: 'Website traffic tripled and inquiries became easier to qualify.',
  },
]

const works = [
  {
    title: 'CRM Automation Blueprint',
    tag: 'Automation',
    image: images.serviceAutomation,
    description: 'Lead capture, CRM fields, handoff rules, and reporting designed as one connected workflow.',
  },
  {
    title: 'Hiring Funnel Redesign',
    tag: 'Talent',
    image: images.serviceHiring,
    description: 'A cleaner screening and interview rhythm for faster shortlist quality.',
  },
  {
    title: 'Growth Website Refresh',
    tag: 'Marketing',
    image: images.serviceMarketing,
    description: 'Messaging, landing flow, conversion sections, and analytics structure for a service brand.',
  },
  {
    title: 'Delivery Governance System',
    tag: 'Operations',
    image: images.serviceConsulting,
    description: 'Weekly reporting, ownership maps, escalation paths, and quality checkpoints.',
  },
]

const industries = [
  'Technology & SaaS',
  'Professional Services',
  'Healthcare & Wellness',
  'Ecommerce & Retail',
  'Education & Training',
  'Logistics & Mobility',
  'Finance & Advisory',
  'Startups & SMBs',
]

const ebooks = [
  {
    title: 'Growth Operations Readiness Guide',
    description: 'A practical checklist for diagnosing talent, automation, marketing, and delivery gaps.',
    image: images.report,
  },
  {
    title: 'Outsourcing Setup Checklist',
    description: 'Questions, role maps, and governance points before building an offshore delivery model.',
    image: images.serviceGlobal,
  },
  {
    title: 'Automation Planning Workbook',
    description: 'A guided workbook for prioritizing workflows that save time and protect lead quality.',
    image: images.serviceAutomation,
  },
]

const careerOpenings = [
  'Business Development Associate',
  'Digital Marketing Specialist',
  'Automation Consultant',
  'Technical Project Coordinator',
]

const csrCards = [
  {
    title: 'Skill Access',
    text: 'Supporting practical upskilling pathways for students, early-career professionals, and underrepresented talent.',
  },
  {
    title: 'Community Support',
    text: 'Contributing time and knowledge to local business, education, and employment development initiatives.',
  },
  {
    title: 'Responsible Growth',
    text: 'Encouraging business models that create opportunity while remaining transparent and sustainable.',
  },
]

const esgCards = [
  {
    title: 'Environmental Care',
    text: 'Reducing avoidable waste, supporting remote collaboration, and choosing digital-first delivery when practical.',
  },
  {
    title: 'Social Impact',
    text: 'Expanding access to opportunity through hiring support, training, and fair working practices.',
  },
  {
    title: 'Governance',
    text: 'Building accountable processes, transparent communication, and practical risk controls into our work.',
  },
]

const baseRoutes = new Set([
  'home',
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
  'admin',
  'not-found',
])

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function servicePath(service: (typeof coreServices)[number]) {
  return `services/${slugify(service.title)}`
}

function insightPath(item: BlogPost) {
  return `insights/${slugify(item.title)}`
}

function caseStudyPath(item: (typeof caseStudies)[number]) {
  return `case-studies/${slugify(item.title)}`
}

function pageHref(page: PageKey) {
  return page === 'home' ? '/' : `/${page}`
}

function isBlogPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== 'object') {
    return false
  }

  const post = value as Partial<BlogPost>
  return (
    typeof post.id === 'string' &&
    typeof post.tag === 'string' &&
    typeof post.title === 'string' &&
    typeof post.description === 'string' &&
    typeof post.image === 'string' &&
    Array.isArray(post.sections) &&
      post.sections.every((section) => typeof section === 'string')
  )
}

function cleanText(value: string, limit = 240) {
  return Array.from(value)
    .filter((character) => {
      const code = character.charCodeAt(0)
      return code >= 32 && code !== 127
    })
    .join('')
    .trim()
    .slice(0, limit)
}

function isSafeBlogImage(image: string) {
  return (
    image.startsWith(imageBase) ||
    image.startsWith(legacyImageBase) ||
    image.startsWith(legacySecondaryImageBase) ||
    image.startsWith('/assets/') ||
    allowedUploadTypes.some((type) => image.startsWith(`data:${type};base64,`))
  )
}

function normalizeBlogPost(post: BlogPost): BlogPost | null {
  const title = cleanText(post.title, 110)
  const description = cleanText(post.description, 220)
  const tag = cleanText(post.tag || 'Insight', 32)
  const sections = post.sections
    .map((section) => cleanText(section, 1200))
    .filter(Boolean)
    .slice(0, 8)

  if (!title || !description || sections.length === 0) {
    return null
  }

  return {
    id: cleanText(post.id, 72) || `custom-${Date.now().toString(36)}`,
    tag,
    title,
    description,
    image: isSafeBlogImage(post.image) ? post.image : images.blogOne,
    sections,
    featured: Boolean(post.featured),
  }
}

function readCustomInsights(): BlogPost[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(customInsightsStorageKey)
    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed)
      ? parsed.filter(isBlogPost).map(normalizeBlogPost).filter((post): post is BlogPost => Boolean(post))
      : []
  } catch {
    return []
  }
}

function saveCustomInsights(posts: BlogPost[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(customInsightsStorageKey, JSON.stringify(posts))
}

function getInsights(customInsights: BlogPost[]) {
  return [...customInsights, ...defaultInsights]
}

function isKnownRoute(route: string, insights: BlogPost[] = defaultInsights) {
  return (
    baseRoutes.has(route) ||
    coreServices.some((service) => servicePath(service) === route) ||
    insights.some((item) => insightPath(item) === route) ||
    caseStudies.some((item) => caseStudyPath(item) === route)
  )
}

function getLegacyHashRoute() {
  if (typeof window === 'undefined' || !window.location.hash.startsWith('#/')) {
    return ''
  }

  return window.location.hash.replace(/^#\/?/, '').split('?')[0]
}

function upgradeLegacyHashRoute() {
  const legacyRoute = getLegacyHashRoute()
  if (!legacyRoute) {
    return
  }

  window.history.replaceState({}, '', pageHref(legacyRoute))
}

function getRouteFromLocation(insights: BlogPost[] = defaultInsights): PageKey {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const route =
    getLegacyHashRoute() ||
    window.location.pathname.replace(/^\/+|\/+$/g, '') ||
    'home'

  return isKnownRoute(route, insights) ? route : 'not-found'
}

function navIsActive(activePage: PageKey, navKey: PageKey) {
  if (navKey === 'home') {
    return activePage === 'home'
  }
  if (navKey === 'services') {
    return activePage === 'services' || activePage.startsWith('services/')
  }
  if (navKey === 'insights') {
    return activePage === 'insights' || activePage.startsWith('insights/')
  }
  if (navKey === 'case-studies') {
    return activePage === 'case-studies' || activePage.startsWith('case-studies/')
  }
  return activePage === navKey
}

function shouldShowIntroLoader() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.sessionStorage.getItem(introLoaderStorageKey) !== 'seen'
}

function getContactNextUrl() {
  if (typeof window === 'undefined') {
    return `${siteUrl}/contact`
  }

  return `${window.location.origin}/contact`
}

function handleInternalNavigation(event: ReactMouseEvent<HTMLDivElement>) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  const anchor = (event.target as HTMLElement).closest('a')
  if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
    return
  }

  const url = new URL(anchor.href)
  if (url.origin !== window.location.origin || url.protocol !== window.location.protocol) {
    return
  }

  if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
    return
  }

  event.preventDefault()
  window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function toAbsoluteUrl(value: string) {
  return value.startsWith('http') ? value : `${siteUrl}${value}`
}

function summarizeForSearch(value: string, limit = 160) {
  if (value.length <= limit) {
    return value
  }

  return `${value.slice(0, limit - 3).replace(/\s+\S*$/, '')}...`
}

type SeoDetails = {
  title: string
  description: string
  keywords: string
  image: string
  type: 'website' | 'article'
}

function getStaticPageSeo(activePage: PageKey) {
  const pages: Record<string, { title: string; description: string; keywords: string }> = {
    home: {
      title: '360 Degree Business Solutions | Closing Gap',
      description: defaultSeoDescription,
      keywords: defaultSeoKeywords,
    },
    services: {
      title: '360 Degree Business Solutions & Services | Closing Gap',
      description:
        'Explore connected solutions across outsourcing, hiring, development, testing, digital marketing, automation, technology, consulting, and training.',
      keywords:
        '360 degree business services, outsourcing services, hiring and staffing services, business automation services, digital marketing services, development testing services, Closing Gap services',
    },
    about: {
      title: 'About Closing Gap | 360 Degree Business Solutions',
      description:
        'Learn how Closing Gap helps ambitious businesses close execution gaps across talent, technology, operations, marketing, and growth.',
      keywords:
        'about Closing Gap, 360 business solutions company, execution gap solutions, business growth partner, global talent technology operations marketing',
    },
    team: {
      title: 'Closing Gap Team | Business Growth Specialists',
      description:
        'Meet Naveen Abraham, Hannah Justus, Kingston Robert, Sruthi S, Aadithya R, and the Closing Gap team supporting operations, technology, and people growth.',
      keywords:
        'Closing Gap team, Naveen Abraham Director, Hannah Justus Operations Manager, Kingston Robert Technology Lead, Sruthi S People Operations Executive, Aadithya R People Operations Executive',
    },
    insights: {
      title: 'Business Growth Insights | Closing Gap',
      description:
        'Read practical guides on hiring, global outsourcing, development, testing, marketing, automation, technology, training, and business consulting.',
      keywords:
        'business growth insights, hiring insights, outsourcing insights, automation insights, digital marketing articles, technology solutions blog, Closing Gap blog',
    },
    'case-studies': {
      title: 'Business Case Studies | Closing Gap',
      description:
        'Explore Closing Gap case studies across outsourcing, automation, digital marketing, hiring, operations, and 360 degree business execution.',
      keywords:
        'Closing Gap case studies, business automation case study, outsourcing case study, digital growth case study, hiring case study',
    },
    'our-works': {
      title: 'Our Works | Closing Gap 360 Degree Business Solutions',
      description:
        'See selected work across CRM automation, hiring funnels, growth websites, delivery governance, marketing, operations, and technology systems.',
      keywords:
        'Closing Gap work, CRM automation, hiring funnel redesign, growth website refresh, delivery governance, business systems portfolio',
    },
    industries: {
      title: 'Industries Served | Closing Gap',
      description:
        'Closing Gap supports industries including technology, startups, professional services, healthcare, retail, education, logistics, finance, and real estate.',
      keywords:
        'industries served, technology business support, startup business support, healthcare marketing automation, retail business solutions, finance outsourcing support',
    },
    ebooks: {
      title: 'Business Growth Ebooks | Closing Gap',
      description:
        'Access practical planning guides for outsourcing setup, automation planning, hiring, marketing, operations, and connected 360 degree growth systems.',
      keywords:
        'business growth ebooks, outsourcing checklist, automation planning workbook, Closing Gap guides, 360 growth resources',
    },
    faqs: {
      title: 'Frequently Asked Questions | Closing Gap',
      description:
        'Get clear answers about Closing Gap services, hiring timelines, automation, personal branding, development quality, and startup support.',
      keywords:
        'Closing Gap FAQs, hiring staffing questions, business automation questions, outsourcing FAQ, digital marketing FAQ, development testing FAQ',
    },
    contact: {
      title: 'Contact Closing Gap | Book a Free Consultation',
      description:
        'Talk to Closing Gap about hiring, outsourcing, digital growth, automation, technology, consulting, training, or connected 360 degree business support.',
      keywords:
        'contact Closing Gap, book free consultation, business growth consultation, hiring support contact, automation consultation, outsourcing consultation',
    },
    'clients-partners': {
      title: 'Clients & Partners | Closing Gap',
      description:
        'View Closing Gap clients, partner relationships, certifications, and trusted delivery credentials across business growth and execution support.',
      keywords:
        'Closing Gap clients, Closing Gap partners, business partner network, IAF certification, Kerala Startup Mission, DPIIT recognition',
    },
    careers: {
      title: 'Careers at Closing Gap | Join Our 360 Degree Team',
      description:
        'Explore career opportunities with Closing Gap across operations, technology, marketing, talent, automation, and client delivery roles.',
      keywords:
        'Closing Gap careers, operations jobs Closing Gap, technology jobs Closing Gap, marketing jobs Closing Gap, talent operations careers',
    },
    csr: {
      title: 'Corporate Social Responsibility | Closing Gap',
      description:
        'Learn how Closing Gap approaches CSR through skill access, community support, responsible operations, and opportunity creation.',
      keywords:
        'Closing Gap CSR, corporate social responsibility, skill access, community support, responsible business growth',
    },
    esg: {
      title: 'ESG | Closing Gap Responsible Business Operations',
      description:
        'Read about Closing Gap ESG priorities across environmental responsibility, social impact, governance, accountability, and long-term trust.',
      keywords:
        'Closing Gap ESG, environmental social governance, responsible business operations, governance, sustainable growth',
    },
    privacy: {
      title: 'Privacy Policy | Closing Gap',
      description:
        'Review how Closing Gap handles website inquiries, contact information, analytics data, communication preferences, and privacy requests.',
      keywords:
        'Closing Gap privacy policy, data protection, website privacy, contact form privacy, business website privacy policy',
    },
    terms: {
      title: 'Terms & Conditions | Closing Gap',
      description:
        'Review the website terms, service information, intellectual property notes, and usage conditions for Closing Gap.',
      keywords:
        'Closing Gap terms and conditions, website terms, service terms, intellectual property, business website terms',
    },
    'cookie-policy': {
      title: 'Cookie Policy | Closing Gap',
      description:
        'Understand how Closing Gap may use essential, analytics, and marketing cookies to support website functionality and performance.',
      keywords:
        'Closing Gap cookie policy, website cookies, analytics cookies, marketing cookies, cookie preferences',
    },
    admin: {
      title: 'Admin CMS | Closing Gap',
      description: 'Private Closing Gap admin area for managing site content and insights.',
      keywords: 'Closing Gap admin',
    },
    'not-found': {
      title: 'Page Not Found | Closing Gap',
      description: 'The requested Closing Gap page could not be found. Return to the home page or explore our 360 degree business solutions.',
      keywords: 'Closing Gap page not found',
    },
  }

  return (
    pages[activePage] ?? {
      title: `${activePage
        .split('/')
        .pop()
        ?.split('-')
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(' ')} | Closing Gap`,
      description: defaultSeoDescription,
      keywords: defaultSeoKeywords,
    }
  )
}

function getSeoDetails(activePage: PageKey, insights: BlogPost[]): SeoDetails {
  const article = insights.find((item) => insightPath(item) === activePage)
  const service = coreServices.find((item) => servicePath(item) === activePage)
  const caseStudy = caseStudies.find((item) => caseStudyPath(item) === activePage)
  const fallback = getStaticPageSeo(activePage)

  if (article) {
    return {
      title: `${article.title} | Closing Gap`,
      description: summarizeForSearch(article.description),
      keywords: `${article.tag}, ${article.title}, Closing Gap insights, ${defaultSeoKeywords}`,
      image: article.image,
      type: 'article',
    }
  }

  if (service) {
    return {
      title: `${service.title} Solutions | Closing Gap`,
      description: summarizeForSearch(service.detail),
      keywords: `${service.title} solutions, ${service.bullets.join(', ')}, ${service.outcomes.join(', ')}, Closing Gap services`,
      image: service.image,
      type: 'website',
    }
  }

  if (caseStudy) {
    return {
      title: `${caseStudy.title} | Closing Gap Case Study`,
      description: summarizeForSearch(caseStudy.description),
      keywords: `${caseStudy.title}, Closing Gap case study, ${caseStudy.metric}, business growth results`,
      image: caseStudy.image,
      type: 'article',
    }
  }

  return {
    ...fallback,
    image: images.hero,
    type: 'website',
  }
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, key)
    document.head.appendChild(meta)
  }
  meta.content = content
}

function buildStructuredData(activePage: PageKey, insights: BlogPost[]) {
  const article = insights.find((item) => insightPath(item) === activePage)
  const service = coreServices.find((item) => servicePath(item) === activePage)
  const seo = getSeoDetails(activePage, insights)
  const canonicalUrl = `${siteUrl}${pageHref(activePage)}`
  const schemas: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      legalName: 'Beyond Closinggap Private Limited',
      url: siteUrl,
      logo: `${siteUrl}${images.brandLogo}`,
      description: defaultSeoDescription,
      email: 'info@theclosinggap.net',
      telephone: ['+91 90742 94791', '+44 20 4615 3030'],
      sameAs: socialLinks.map((link) => link.href),
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '128 City Road',
          addressLocality: 'London',
          postalCode: 'EC1V 2NX',
          addressCountry: 'GB',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '3rd Floor, Sharon Bliss, Plamoodu-Charachira Road, Pattom',
          addressLocality: 'Trivandrum',
          postalCode: '695003',
          addressCountry: 'IN',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: defaultSeoDescription,
      inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': activePage === 'contact' ? 'ContactPage' : 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: 'en',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(seo.image),
      },
    },
  ]

  if (activePage === 'services') {
    schemas.push({
      '@type': 'OfferCatalog',
      name: 'Closing Gap 360 Degree Business Solutions',
      url: canonicalUrl,
      itemListElement: coreServices.map((item) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${item.title} Solutions`,
          description: item.detail,
          url: `${siteUrl}${pageHref(servicePath(item))}`,
          provider: { '@id': `${siteUrl}/#organization` },
        },
      })),
    })
  }

  if (activePage === 'team') {
    schemas.push({
      '@type': 'ItemList',
      name: 'Closing Gap Team',
      itemListElement: teamMembers.map((member, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
          image: toAbsoluteUrl(member.image),
          worksFor: { '@id': `${siteUrl}/#organization` },
        },
      })),
    })
  }

  if (activePage !== 'home' && activePage !== 'admin' && activePage !== 'not-found') {
    schemas.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: getSeoDetails(activePage, insights).title, item: canonicalUrl },
      ],
    })
  }

  if (service) {
    schemas.push({
      '@type': 'Service',
      name: `${service.title} Solutions`,
      description: service.detail,
      url: canonicalUrl,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: ['India', 'United Kingdom', 'Worldwide'],
    })
  }

  if (article) {
    schemas.push({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      image: [toAbsoluteUrl(article.image)],
      mainEntityOfPage: canonicalUrl,
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
    })
  }

  if (activePage === 'faqs') {
    schemas.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': schemas }
}

function SeoHead({ activePage, insights }: { activePage: PageKey; insights: BlogPost[] }) {
  useEffect(() => {
    const seo = getSeoDetails(activePage, insights)
    const canonicalUrl = `${siteUrl}${pageHref(activePage)}`
    const shouldIndex = activePage !== 'admin' && activePage !== 'not-found'

    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', seo.keywords)
    upsertMeta('name', 'author', siteName)
    upsertMeta('name', 'robots', shouldIndex ? 'index, follow, max-image-preview:large' : 'noindex, nofollow')
    upsertMeta(
      'name',
      'googlebot',
      shouldIndex ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' : 'noindex, nofollow',
    )
    upsertMeta('name', 'application-name', siteName)
    upsertMeta('property', 'og:site_name', siteName)
    upsertMeta('property', 'og:locale', 'en_GB')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:type', seo.type)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', toAbsoluteUrl(seo.image))
    upsertMeta('property', 'og:image:alt', `${seo.title} visual`)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:site', '@theclosinggap')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', toAbsoluteUrl(seo.image))
    upsertMeta('name', 'twitter:image:alt', `${seo.title} visual`)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    let script = document.head.querySelector<HTMLScriptElement>('#closing-gap-structured-data')
    if (!script) {
      script = document.createElement('script')
      script.id = 'closing-gap-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(buildStructuredData(activePage, insights))
  }, [activePage, insights])

  return null
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [customInsights, setCustomInsights] = useState<BlogPost[]>(() => readCustomInsights())
  const insights = useMemo(() => getInsights(customInsights), [customInsights])
  const [activePage, setActivePage] = useState<PageKey>(() => getRouteFromLocation(insights))
  const [showIntro, setShowIntro] = useState(() => shouldShowIntroLoader())
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const syncRoute = () => {
      setActivePage(getRouteFromLocation(getInsights(customInsights)))
      setMenuOpen(false)
    }

    upgradeLegacyHashRoute()
    syncRoute()
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [customInsights])

  useEffect(() => {
    saveCustomInsights(customInsights)
  }, [customInsights])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [activePage])

  useEffect(() => {
    if (!showIntro || typeof window === 'undefined') {
      return
    }

    const timer = window.setTimeout(
      () => {
        window.sessionStorage.setItem(introLoaderStorageKey, 'seen')
        setShowIntro(false)
      },
      prefersReducedMotion ? 700 : 2350,
    )

    return () => window.clearTimeout(timer)
  }, [prefersReducedMotion, showIntro])

  return (
    <div className="site-shell" onClick={handleInternalNavigation}>
      <SeoHead activePage={activePage} insights={insights} />
      <AnimatePresence>{showIntro ? <IntroLoader /> : null}</AnimatePresence>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: prefersReducedMotion ? 0 : scrollYProgress }}
        aria-hidden="true"
      />
      <Header activePage={activePage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <motion.main
        key={activePage}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        {renderPage(activePage, activeFaq, setActiveFaq, insights, customInsights, setCustomInsights)}
        <SiteFooter />
      </motion.main>
    </div>
  )
}

function renderPage(
  activePage: PageKey,
  activeFaq: number,
  setActiveFaq: (value: number) => void,
  insights: BlogPost[],
  customInsights: BlogPost[],
  setCustomInsights: Dispatch<SetStateAction<BlogPost[]>>,
) {
  const service = coreServices.find((item) => servicePath(item) === activePage)
  const article = insights.find((item) => insightPath(item) === activePage)
  const caseStudy = caseStudies.find((item) => caseStudyPath(item) === activePage)

  if (service) {
    return <ServiceDetailPage service={service} />
  }
  if (article) {
    return <ArticleDetailPage article={article} />
  }
  if (caseStudy) {
    return <CaseStudyDetailPage study={caseStudy} />
  }

  switch (activePage) {
    case 'services':
      return <ServicesPage />
    case 'about':
      return <AboutPage />
    case 'team':
      return <TeamPage />
    case 'insights':
      return <InsightsPage insights={insights} />
    case 'case-studies':
      return <CaseStudiesPage />
    case 'our-works':
      return <OurWorksPage />
    case 'industries':
      return <IndustriesPage />
    case 'ebooks':
      return <EbooksPage />
    case 'faqs':
      return <FaqPage activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
    case 'contact':
      return <ContactPage />
    case 'clients-partners':
      return <ClientsPartnersPage />
    case 'careers':
      return <CareersPage />
    case 'csr':
      return <CsrPage />
    case 'esg':
      return <EsgPage />
    case 'privacy':
      return <PrivacyPage />
    case 'terms':
      return <TermsPage />
    case 'cookie-policy':
      return <CookiePolicyPage />
    case 'admin':
      return <AdminPage customInsights={customInsights} setCustomInsights={setCustomInsights} />
    case 'not-found':
      return <NotFoundPage />
    case 'home':
    default:
      return <HomePage activeFaq={activeFaq} setActiveFaq={setActiveFaq} insights={insights} />
  }
}

function IntroLoader() {
  const prefersReducedMotion = useReducedMotion()
  const loaderLines = [
    { width: '74%', start: -42 },
    { width: '54%', start: 34 },
    { width: '82%', start: -26 },
    { width: '62%', start: 48 },
  ]

  return (
    <motion.div
      className="intro-loader"
      role="status"
      aria-label="Closing Gap 360 degree business solutions is loading"
      initial={prefersReducedMotion ? false : { opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: prefersReducedMotion ? 0.18 : 0.46, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro-loader-stage">
        <motion.div
          className="intro-loader-mark"
          initial={prefersReducedMotion ? false : { scale: 0.94, opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.span
            className="intro-loader-ring"
            initial={prefersReducedMotion ? false : { rotate: -16, scale: 0.86, opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="intro-loader-lines">
            {loaderLines.map((line, index) => (
              <motion.span
                key={`${line.width}-${line.start}`}
                style={{ width: line.width }}
                initial={prefersReducedMotion ? false : { x: line.start, opacity: 0, scaleX: 0.28 }}
                animate={prefersReducedMotion ? undefined : { x: 0, opacity: 1, scaleX: 1 }}
                transition={{
                  delay: 0.26 + index * 0.12,
                  duration: 0.56,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </span>
          <motion.span
            className="intro-loader-sweep"
            initial={prefersReducedMotion ? false : { x: '-140%', opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { x: '140%', opacity: [0, 1, 0] }}
            transition={{ delay: 0.92, duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        <motion.div
          className="intro-loader-copy"
          initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
          transition={{ delay: 1.08, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          <strong>Closing Gap</strong>
          <span>360° Business Solutions</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

function RevealSection({ className, children }: { className: string; children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

function Header({
  activePage,
  menuOpen,
  setMenuOpen,
}: {
  activePage: PageKey
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
}) {
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const activeMobileGroup = navIsActive(activePage, 'services')
    ? 'solutions'
    : companyNav.some((item) => item.key === activePage)
      ? 'company'
      : resourceNav.some((item) => item.key === activePage)
        ? 'resources'
        : legalNav.some((item) => item.key === activePage)
          ? 'legal'
          : null
  const visibleMobileGroup = openMobileGroup ?? activeMobileGroup
  const solutionLinks = coreServices.map((service) => ({
    key: servicePath(service),
    label: service.title,
  }))
  const mobileGroups = [
    { key: 'solutions', label: 'Solutions', links: solutionLinks },
    { key: 'company', label: 'Company', links: companyNav },
    { key: 'resources', label: 'Resources', links: resourceNav },
    { key: 'legal', label: 'Legal', links: legalNav },
  ]

  return (
    <header className="site-header">
      <a className="brand" href={pageHref('home')} aria-label="Closing Gap home">
        <img className="brand-symbol" src={images.brandMark} alt="" />
        <span>Closing Gap</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryNav.map((item) => {
          const activeClass = navIsActive(activePage, item.key) ? 'is-active' : ''

          if (item.key === 'services') {
            return (
              <div className="nav-item has-dropdown" key={item.key}>
                <a className={`nav-trigger ${activeClass}`} href={pageHref(item.key)}>
                  {item.label}
                  <ChevronDown className="nav-caret" aria-hidden="true" />
                </a>
                <div className="dropdown-panel solutions-dropdown">
                  <div className="dropdown-intro">
                    <span>360° solutions</span>
                    <strong>One connected plan for growth</strong>
                    <p>Talent, outsourcing, marketing, technology, automation, consulting, and training in one operating model.</p>
                    <a href={pageHref('services')}>
                      View all solutions <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                  <div className="dropdown-grid">
                    {coreServices.map((service) => {
                      const Icon = service.icon
                      return (
                        <a
                          className={`dropdown-card ${activePage === servicePath(service) ? 'is-active' : ''}`}
                          href={pageHref(servicePath(service))}
                          key={service.title}
                        >
                          <Icon aria-hidden="true" />
                          <span>{service.title}</span>
                          <small>{service.description}</small>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }

          if (item.key === 'about') {
            return (
              <div className="nav-item has-dropdown" key={item.key}>
                <a className={`nav-trigger ${activeClass}`} href={pageHref(item.key)}>
                  {item.label}
                  <ChevronDown className="nav-caret" aria-hidden="true" />
                </a>
                <div className="dropdown-panel compact-dropdown">
                  {companyNav.map((link) => (
                    <a className={navIsActive(activePage, link.key) ? 'is-active' : ''} href={pageHref(link.key)} key={link.key}>
                      {link.label}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )
          }

          if (item.key === 'insights') {
            return (
              <div className="nav-item has-dropdown" key={item.key}>
                <a className={`nav-trigger ${activeClass}`} href={pageHref(item.key)}>
                  {item.label}
                  <ChevronDown className="nav-caret" aria-hidden="true" />
                </a>
                <div className="dropdown-panel compact-dropdown">
                  {resourceNav.map((link) => (
                    <a className={navIsActive(activePage, link.key) ? 'is-active' : ''} href={pageHref(link.key)} key={link.key}>
                      {link.label}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <a className={activeClass} href={pageHref(item.key)} key={item.key}>
              {item.label}
            </a>
          )
        })}
      </nav>
      <div className="header-actions">
        <a className="round-control" href={pageHref('insights')} aria-label="Search insights">
          <Search aria-hidden="true" />
        </a>
        <a className="round-control menu-grid" href={pageHref('contact')} aria-label="Contact options">
          <Grip aria-hidden="true" />
        </a>
        <button
          className="mobile-toggle"
          type="button"
          onClick={() => {
            const nextMenuState = !menuOpen
            setMenuOpen(nextMenuState)
            if (nextMenuState) {
              setOpenMobileGroup(null)
            }
          }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Grip aria-hidden="true" />}
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <a
          className={`mobile-primary-link ${navIsActive(activePage, 'home') ? 'is-active' : ''}`}
          href={pageHref('home')}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>
        {mobileGroups.map((group) => {
          const isOpen = visibleMobileGroup === group.key
          const groupActive =
            (group.key === 'solutions' && navIsActive(activePage, 'services')) ||
            group.links.some((link) => navIsActive(activePage, link.key))

          return (
            <div className={`mobile-submenu ${isOpen ? 'is-open' : ''}`} key={group.key}>
              <button
                className={`mobile-submenu-toggle ${groupActive ? 'is-active' : ''}`}
                type="button"
                onClick={() => setOpenMobileGroup(isOpen ? '' : group.key)}
                aria-expanded={isOpen}
              >
                {group.label}
                <ChevronDown aria-hidden="true" />
              </button>
              <div className="mobile-submenu-panel">
                {group.links.map((link) => (
                  <a
                    className={navIsActive(activePage, link.key) ? 'is-active' : ''}
                    href={pageHref(link.key)}
                    key={`${group.key}-${link.key}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )
        })}
        <a
          className={`mobile-primary-link ${navIsActive(activePage, 'team') ? 'is-active' : ''}`}
          href={pageHref('team')}
          onClick={() => setMenuOpen(false)}
        >
          Team
        </a>
        <a
          className={`mobile-primary-link ${navIsActive(activePage, 'contact') ? 'is-active' : ''}`}
          href={pageHref('contact')}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
      </div>
    </header>
  )
}

function HomePage({
  activeFaq,
  setActiveFaq,
  insights,
}: {
  activeFaq: number
  setActiveFaq: (value: number) => void
  insights: BlogPost[]
}) {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <ServicesPanel />
      <Values />
      <PhotoCta />
      <TeamPreview />
      <TrustBlock />
      <Testimonials />
      <InsightsPreview insights={insights} />
      <FaqSection activeFaq={activeFaq} setActiveFaq={setActiveFaq} compact />
      <Newsletter />
    </>
  )
}

function Hero() {
  return (
    <RevealSection className="hero">
      <div className="hero-top section-shell">
        <h1>
          360° Business Solutions <span>for Growing Companies</span>
        </h1>
        <div className="hero-actions">
          <a className="button button-dark" href={pageHref('contact')}>
            Start Your 360° Plan
          </a>
          <a className="icon-button" href={pageHref('contact')} aria-label="Book a 360 degree growth call">
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="button button-light" href={pageHref('services')}>
            Explore Solutions
          </a>
        </div>
      </div>
      <img className="hero-photo" src={images.hero} alt="Consultants reviewing a growth plan" />
      <div className="asset-strip section-shell" aria-label="Closing Gap performance highlights">
        <article className="asset-card asset-title">
          <h2>360° Support</h2>
          <a href={pageHref('services')}>
            Learn more <ArrowUpRight aria-hidden="true" />
          </a>
        </article>
        <article className="asset-card stat-card">
          <Layers aria-hidden="true" />
          <span>Successful placements</span>
          <strong>45+</strong>
        </article>
        <article className="asset-card image-card">
          <img src={images.metric} alt="" />
        </article>
        <article className="asset-card stat-card">
          <CircleDot aria-hidden="true" />
          <span>Countries served</span>
          <strong>4+</strong>
        </article>
        <article className="asset-card stat-card image-backed">
          <BarChart3 aria-hidden="true" />
          <span>Projects delivered</span>
          <strong>30+</strong>
        </article>
      </div>
    </RevealSection>
  )
}

function WhoWeAre() {
  return (
    <RevealSection className="intro-section section-shell">
      <div>
        <p className="pill-label">Who we are</p>
        <h2>
          One partner to close the gaps across your <span>entire business.</span>
        </h2>
        <div className="intro-buttons">
          <a className="button button-dark" href={pageHref('about')}>
            Learn More
          </a>
          <a className="button button-light" href={pageHref('services')}>
            Our Philosophy
          </a>
        </div>
      </div>
      <div className="intro-copy">
        <div className="mini-tabs" aria-hidden="true">
          {process.map((item, index) => (
            <span className={index === 0 ? 'is-active' : ''} key={item.step}>
              {item.step}
            </span>
          ))}
        </div>
        <p>
          Closing Gap is a 360° business solutions company helping teams access talent,
          improve operations, build digital systems, market smarter, and scale with less friction.
        </p>
      </div>
    </RevealSection>
  )
}

function ServicesPanel() {
  return (
    <RevealSection className="services-panel section-shell">
      <div className="panel-head">
        <p className="pill-label">360° solutions</p>
        <h2>
          A connected system for <span>business growth</span>, delivery, and scale
        </h2>
        <a className="button button-light" href={pageHref('services')}>
          View all
        </a>
      </div>
      <div className="service-grid">
        {coreServices.slice(0, 4).map((service, index) => {
          const Icon = service.icon
          return (
            <article className={`service-card shape-${index + 1}`} key={service.title}>
              <div className="service-media">
                <img src={service.image} alt="" />
              </div>
              <Icon aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a className="small-round" href={pageHref(servicePath(service))} aria-label={`Open ${service.title}`}>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          )
        })}
      </div>
    </RevealSection>
  )
}

function Values() {
  return (
    <RevealSection className="values-section section-shell">
      <p className="pill-label">Our values</p>
      <h2>
        We Listen, <span>Think End-to-End,</span> Advise & Take Action
      </h2>
      <div className="value-grid">
        {values.map((value, index) => (
          <article className="value-card" key={value.title}>
            <div className={`orb-icon orb-${index + 1}`} />
            <div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          </article>
        ))}
      </div>
    </RevealSection>
  )
}

function PhotoCta() {
  return (
    <RevealSection className="photo-cta">
      <img src={images.cta} alt="Consultants planning business growth" />
      <div className="floating-card">
        <p className="pill-label">Why us?</p>
        <Asterisk aria-hidden="true" />
        <h2>
          You Get One System for <span>Every Growth Gap</span>
        </h2>
        <p>Talent, technology, marketing, automation, and operations working as one plan.</p>
        <a className="button button-dark" href={pageHref('contact')}>
          Schedule a Call
        </a>
      </div>
    </RevealSection>
  )
}

function TeamPreview() {
  return (
    <RevealSection className="team-section section-shell">
      <div className="section-row">
        <div>
          <p className="pill-label">Our team</p>
          <h2>
            Choosing <span>The Right</span> 360° Delivery Team
          </h2>
        </div>
        <a className="button button-dark" href={pageHref('team')}>
          View All
        </a>
      </div>
      <TeamCards />
      <StatsRow />
    </RevealSection>
  )
}

function TeamCards() {
  return (
    <div className="team-grid">
      {teamMembers.map((member) => (
        <article className="team-card" key={member.name}>
          <img src={member.image} alt={`${member.name}, ${member.role} at Closing Gap`} />
          <div>
            <strong>{member.name}</strong>
            <span>{member.role}</span>
          </div>
          <a className="small-round" href={pageHref('contact')} aria-label={`Contact ${member.name}`}>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </article>
      ))}
    </div>
  )
}

function StatsRow() {
  return (
    <div className="team-stats" aria-label="Closing Gap results">
      {teamStats.map((stat) => (
        <div key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

function TrustBlock() {
  return (
    <RevealSection className="trust-section section-shell">
      <div className="trust-image">
        <img src={images.advisor} alt="Advisory meeting" />
        <div className="cert-card">
          <ShieldCheck aria-hidden="true" />
          <span>Verified Delivery</span>
        </div>
      </div>
      <article className="trust-card">
        <p className="pill-label">Trusted partner</p>
        <h2>A 360° partner across talent, tech, marketing, and operations</h2>
        <p>
          We help you build confidence across the full business journey, from finding
          the right people to automating the systems that keep work moving.
        </p>
        <div className="paired-buttons">
          <a className="button button-dark" href={pageHref('contact')}>
            Free Consultation
          </a>
          <a className="icon-button" href={pageHref('contact')} aria-label="Open consultation form">
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </article>
    </RevealSection>
  )
}

function Testimonials() {
  return (
    <RevealSection className="testimonial-section section-shell">
      <div className="testimonial-copy">
        <p className="pill-label">Testimonials</p>
        <h2>
          Client <span>Outcomes</span> Across the Business
        </h2>
        <div className="review-row">
          <a className="button button-dark" href={pageHref('case-studies')}>
            Read Case Studies
          </a>
          <span className="google-chip">4.9 growth reviews</span>
        </div>
      </div>
      <article className="quote-card">
        <span className="quote-mark">"</span>
        <p>
          Closing Gap helped us simplify hiring, delivery, and automation. Their team
          made the plan clear and helped us move faster without losing control.
        </p>
        <div className="quote-footer">
          <img src={images.serviceHiring} alt="" />
          <div>
            <strong>Amit Bansal</strong>
            <span>Co-Founder</span>
          </div>
          <div className="quote-controls">
            <button type="button" aria-label="Previous testimonial">
              <ArrowUpRight aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next testimonial">
              <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
      <PartnerLogoRow />
    </RevealSection>
  )
}

function PartnerLogoRow() {
  return (
    <div className="logo-row" aria-label="Partner categories">
      {partnerLogos.map((logo) => (
        <img src={logo.src} alt={`${logo.name} logo`} key={logo.name} />
      ))}
    </div>
  )
}

function CertificationLogoRow() {
  return (
    <div className="certification-row" aria-label="Certifications and recognitions">
      {certificationLogos.map((logo) => (
        <img src={logo.src} alt={`${logo.name} logo`} key={logo.name} />
      ))}
    </div>
  )
}

function InsightsPreview({ insights }: { insights: BlogPost[] }) {
  return (
    <RevealSection className="insights-section">
      <div className="section-shell">
        <div className="section-row">
          <div>
            <p className="pill-label">Insights</p>
            <h2>
              Practical <span>360° Growth</span> Thinking
            </h2>
          </div>
          <a className="button button-dark" href={pageHref('insights')}>
            More Insights
          </a>
        </div>
        <InsightCards insights={insights} />
      </div>
    </RevealSection>
  )
}

function InsightCards({ insights }: { insights: BlogPost[] }) {
  return (
    <div className="insight-grid">
      {insights.map((item) => (
        <article className={`insight-card ${item.featured ? 'featured' : ''}`} key={item.id}>
          <img src={item.image} alt="" />
          <span>{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a className="small-round" href={pageHref(insightPath(item))} aria-label={`Read ${item.title}`}>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </article>
      ))}
    </div>
  )
}

function FaqSection({
  activeFaq,
  setActiveFaq,
  compact = false,
}: {
  activeFaq: number
  setActiveFaq: (value: number) => void
  compact?: boolean
}) {
  return (
    <RevealSection className={`faq-section section-shell ${compact ? 'compact-section' : ''}`}>
      <div className="faq-intro">
        <p className="pill-label">FAQ</p>
        <h2>360° Business Support FAQs</h2>
        <p>Common questions on hiring, outsourcing, automation, marketing, technology, and delivery.</p>
        <a className="button button-dark" href={pageHref('faqs')}>
          View All FAQs
        </a>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <button
            className={`faq-item ${activeFaq === index ? 'is-open' : ''}`}
            key={faq.question}
            type="button"
            onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
          >
            <span>
              {faq.question}
              <Plus aria-hidden="true" />
            </span>
            <p>{faq.answer}</p>
          </button>
        ))}
      </div>
    </RevealSection>
  )
}

function Newsletter() {
  return (
    <RevealSection className="newsletter">
      <div className="newsletter-copy">
        <Asterisk aria-hidden="true" />
        <h2>Latest 360° Growth Resources</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <input type="email" placeholder="Email" aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <img src={images.newsletter} alt="Business advisory meeting" />
    </RevealSection>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="360° solutions"
        image={images.serviceDevelopment}
        title={
          <>
            Business Solutions That Close <span>Execution Gaps</span>
          </>
        }
        copy="Talent, outsourcing, technology, marketing, automation, consulting, and training support arranged as one practical 360° growth system."
      />
      <RevealSection className="directory-section section-shell">
        <div className="directory-grid">
          {coreServices.map((service) => {
            const Icon = service.icon
            return (
              <article className="directory-card" key={service.title}>
                <div className="directory-image">
                  <img src={service.image} alt="" />
                </div>
                <div className="directory-content">
                  <Icon aria-hidden="true" />
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>
                        <CheckCircle2 aria-hidden="true" /> {bullet}
                      </li>
                    ))}
                  </ul>
                  <a href={pageHref(servicePath(service))}>
                    Learn more <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </RevealSection>
      <ProcessBand />
      <Newsletter />
    </>
  )
}

function ServiceDetailPage({ service }: { service: (typeof coreServices)[number] }) {
  const Icon = service.icon

  return (
    <>
      <PageHero
        kicker="360° solution"
        image={service.image}
        title={
          <>
            {service.title} <span>Built Into a 360° Plan</span>
          </>
        }
        copy={service.detail}
      />
      <RevealSection className="detail-section section-shell">
        <article className="detail-lead">
          <Icon aria-hidden="true" />
          <h2>What this service helps you improve</h2>
          <p>{service.description}</p>
        </article>
        <div className="detail-grid">
          {service.bullets.map((bullet) => (
            <article key={bullet}>
              <CheckCircle2 aria-hidden="true" />
              <h3>{bullet}</h3>
              <p>Structured support, clear ownership, and a practical route from planning to execution.</p>
            </article>
          ))}
        </div>
      </RevealSection>
      <RevealSection className="outcome-section section-shell">
        <p className="pill-label">Expected outcomes</p>
        <div className="outcome-grid">
          {service.outcomes.map((outcome) => (
            <span key={outcome}>{outcome}</span>
          ))}
        </div>
      </RevealSection>
      <ProcessBand />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Closing Gap"
        image={images.advisor}
        title={
          <>
            A 360° Partner for <span>Sustainable Growth</span>
          </>
        }
        copy="Closing Gap brings talent, technology, operations, marketing, automation, and advisory support together so growing businesses can execute with more confidence."
      />
      <RevealSection className="story-section section-shell">
        <div className="story-copy">
          <p className="pill-label">Mission and goals</p>
          <h2>
            Clear goals, connected execution, and <span>less operational drag.</span>
          </h2>
        </div>
        <div className="story-cards">
          <article>
            <span>01</span>
            <h3>Mission</h3>
            <p>
              To close critical execution gaps across talent, operations, marketing, and
              technology with scalable, affordable, and connected 360° solutions.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Vision</h3>
            <p>
              A world where ambitious businesses can access strong talent, smart systems,
              proven growth strategy, and operating support without unnecessary complexity.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Values</h3>
            <p>
              Excellence, collaboration, agility, innovation, and integrity guide every
              plan we build and every result we pursue.
            </p>
          </article>
        </div>
      </RevealSection>
      <Values />
      <TrustBlock />
    </>
  )
}

function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Our team"
        image={images.cta}
        title={
          <>
            Specialists Built Around <span>Your 360° Plan</span>
          </>
        }
        copy="A blended team model for strategy, staffing, delivery, automation, marketing, technology, and operations."
      />
      <RevealSection className="team-section section-shell page-spaced">
        <TeamCards />
        <StatsRow />
      </RevealSection>
      <TrustBlock />
    </>
  )
}

function InsightsPage({ insights }: { insights: BlogPost[] }) {
  return (
    <>
      <PageHero
        kicker="Insights"
        image={images.blogOne}
        title={
          <>
            Practical Thinking for <span>360° Growth Teams</span>
          </>
        }
        copy="Notes on hiring, automation, outsourcing, digital marketing, product delivery, operations, and scaling with less friction."
      />
      <RevealSection className="insights-section page-insights">
        <div className="section-shell">
          <InsightCards insights={insights} />
        </div>
      </RevealSection>
      <Newsletter />
    </>
  )
}

function ArticleDetailPage({ article }: { article: BlogPost }) {
  const hasLongFormContent = Boolean(article.content?.length)

  return (
    <>
      <PageHero
        kicker={article.tag}
        image={article.image}
        title={<>{article.title}</>}
        copy={article.description}
      />
      <RevealSection className={`article-section section-shell ${hasLongFormContent ? 'article-longform' : ''}`}>
        {hasLongFormContent
          ? article.content?.map((section, index) => (
              <article key={section.heading}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div className="article-copy">
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets.length > 0 ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.subsections.map((subsection) => (
                    <section className="article-subsection" key={subsection.heading}>
                      <h3>{subsection.heading}</h3>
                      {subsection.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {subsection.bullets.length > 0 ? (
                        <ul>
                          {subsection.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              </article>
            ))
          : article.sections.map((section, index) => (
              <article key={section}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{section}</p>
              </article>
            ))}
        <article className="article-next-step">
          <span>
            <ArrowUpRight aria-hidden="true" />
          </span>
          <div className="article-copy">
            <h2>Need a practical next step?</h2>
            <p>Talk to Closing Gap about a connected 360 degree plan shaped around your business goals.</p>
            <div className="paired-buttons">
              <a className="button button-dark" href={pageHref('contact')}>
                Book a Free Consultation
              </a>
              <a className="button button-light" href={pageHref('services')}>
                Explore Solutions
              </a>
            </div>
          </div>
        </article>
      </RevealSection>
      <Newsletter />
    </>
  )
}

function CaseStudiesPage() {
  return (
    <>
      <PageHero
        kicker="Case studies"
        image={images.newsletter}
        title={
          <>
            Real Business Problems, <span>Cleaner Execution</span>
          </>
        }
        copy="Representative examples of how Closing Gap can help businesses improve capability, speed, marketing performance, operations, and delivery clarity."
      />
      <RevealSection className="case-section section-shell">
        {caseStudies.map((study) => (
          <article className="case-card" key={study.title}>
            <img src={study.image} alt="" />
            <div>
              <span>{study.metric}</span>
              <h2>{study.title}</h2>
              <p>{study.description}</p>
              <a className="button button-dark" href={pageHref(caseStudyPath(study))}>
                Read Case Study
              </a>
            </div>
          </article>
        ))}
      </RevealSection>
    </>
  )
}

function CaseStudyDetailPage({ study }: { study: (typeof caseStudies)[number] }) {
  return (
    <>
      <PageHero
        kicker="Case study"
        image={study.image}
        title={<>{study.title}</>}
        copy={study.description}
      />
      <RevealSection className="story-section section-shell">
        <div className="story-copy">
          <p className="pill-label">Result</p>
          <h2>{study.metric}</h2>
        </div>
        <div className="story-cards">
          <article>
            <span>01</span>
            <h3>Challenge</h3>
            <p>{study.challenge}</p>
          </article>
          <article>
            <span>02</span>
            <h3>Solution</h3>
            <p>{study.solution}</p>
          </article>
          <article>
            <span>03</span>
            <h3>Outcome</h3>
            <p>{study.result}</p>
          </article>
        </div>
      </RevealSection>
    </>
  )
}

function OurWorksPage() {
  return (
    <>
      <PageHero
        kicker="Our works"
        image={images.blogThree}
        title={
          <>
            Selected Work Across <span>360° Growth Systems</span>
          </>
        }
        copy="A portfolio-style view of practical work across automation, hiring, marketing, technology, operations, and delivery."
      />
      <RevealSection className="listing-section section-shell">
        <div className="listing-grid">
          {works.map((work) => (
            <article className="listing-card" key={work.title}>
              <img src={work.image} alt="" />
              <span>{work.tag}</span>
              <h2>{work.title}</h2>
              <p>{work.description}</p>
            </article>
          ))}
        </div>
      </RevealSection>
    </>
  )
}

function IndustriesPage() {
  return (
    <>
      <PageHero
        kicker="Industries"
        image={images.cta}
        title={
          <>
            360° Support Across <span>Multiple Industries</span>
          </>
        }
        copy="Closing Gap adapts talent, technology, automation, marketing, consulting, and operations support to the realities of each sector."
      />
      <RevealSection className="industry-section section-shell">
        {industries.map((industry, index) => (
          <article key={industry}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{industry}</h2>
            <p>Flexible execution support for teams that need better capacity, clearer workflows, and measurable growth.</p>
          </article>
        ))}
      </RevealSection>
    </>
  )
}

function EbooksPage() {
  return (
    <>
      <PageHero
        kicker="Ebooks"
        image={images.report}
        title={
          <>
            Practical Guides for <span>360° Growth Operators</span>
          </>
        }
        copy="Downloadable planning resources for leaders improving hiring, automation, outsourcing, marketing, operations, and execution."
      />
      <RevealSection className="listing-section section-shell">
        <div className="listing-grid">
          {ebooks.map((ebook) => (
            <article className="listing-card ebook-card" key={ebook.title}>
              <img src={ebook.image} alt="" />
              <span>Guide</span>
              <h2>{ebook.title}</h2>
              <p>{ebook.description}</p>
              <a className="button button-dark" href={pageHref('contact')}>
                Request Copy
              </a>
            </article>
          ))}
        </div>
      </RevealSection>
    </>
  )
}

function FaqPage({
  activeFaq,
  setActiveFaq,
}: {
  activeFaq: number
  setActiveFaq: (value: number) => void
}) {
  return (
    <>
      <PageHero
        kicker="FAQs"
        image={images.serviceAutomation}
        title={
          <>
            Answers Before We <span>Start the Work</span>
          </>
        }
        copy="A clearer view of how we approach hiring, outsourcing, automation, consulting, marketing, technology, and delivery."
      />
      <FaqSection activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
    </>
  )
}

function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(emptyContactForm)
  const [formStatus, setFormStatus] = useState<ContactFormStatus>('idle')
  const [formMessage, setFormMessage] = useState('')
  const formIsSending = formStatus === 'sending'

  const updateContactField = (field: keyof ContactFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (formStatus !== 'idle') {
      setFormStatus('idle')
      setFormMessage('')
    }
  }

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formElement = event.currentTarget
    const payload = {
      name: cleanText(formData.name, 90),
      email: cleanText(formData.email, 120).toLowerCase(),
      phone: cleanText(formData.phone, 32),
      service: cleanText(formData.service, 80),
      message: cleanText(formData.message, 1500),
    }

    if (formData.website.trim()) {
      setFormStatus('success')
      setFormMessage('Thanks. Your request has been received.')
      setFormData(emptyContactForm)
      return
    }

    if (!payload.name || !payload.email || !payload.phone || !payload.service || !payload.message) {
      setFormStatus('error')
      setFormMessage('Please add your name, email, phone number, service, and message.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setFormStatus('error')
      setFormMessage('Please enter a valid email address.')
      return
    }

    const phoneDigits = payload.phone.replace(/\D/g, '')
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setFormStatus('error')
      setFormMessage('Please enter a valid phone number with country code if possible.')
      return
    }

    const submission = new FormData()
    submission.append('Name', payload.name)
    submission.append('Email', payload.email)
    submission.append('Phone', payload.phone)
    submission.append('Service', payload.service)
    submission.append('Message', payload.message)
    submission.append('_subject', contactFormSubject)
    submission.append('_replyto', payload.email)
    submission.append('_template', 'table')
    submission.append('_captcha', 'false')
    submission.append('_honey', '')
    submission.append('_blacklist', contactSpamBlacklist)

    setFormStatus('sending')
    setFormMessage('Sending your request...')

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: submission,
      })

      if (!response.ok) {
        throw new Error('Contact request failed')
      }

      setFormStatus('success')
      setFormMessage('Thanks. Your request has been sent to info@theclosinggap.net.')
      setFormData(emptyContactForm)
    } catch {
      setFormMessage('Opening secure fallback submission...')
      window.setTimeout(() => formElement.submit(), 0)
    }
  }

  return (
    <>
      <PageHero
        kicker="Contact"
        image={images.hero}
        title={
          <>
            Ready to Build Your <span>360° Growth System?</span>
          </>
        }
        copy="Share the outcome you want, and we will help shape the right first step across talent, technology, marketing, automation, and operations."
      />
      <RevealSection className="contact-page section-shell">
        <div className="contact-panel">
          <h2>Book Your Free Consultation</h2>
          <p>Tell us what you need. We will route the conversation to the right team.</p>
          <form
            action={contactFormFallbackEndpoint}
            method="POST"
            noValidate
            onSubmit={submitContactForm}
          >
            <input type="hidden" name="_subject" value={contactFormSubject} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_blacklist" value={contactSpamBlacklist} />
            <input type="hidden" name="_next" value={getContactNextUrl()} />
            <input type="hidden" name="_replyto" value={formData.email} />
            <input
              className="form-honeypot"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) => updateContactField('website', event.target.value)}
              aria-hidden="true"
            />
            <div className="contact-form-grid">
              <input
                aria-label="Name"
                name="Name"
                placeholder="Name"
                value={formData.name}
                onChange={(event) => updateContactField('name', event.target.value)}
                autoComplete="name"
                maxLength={90}
                required
              />
              <input
                aria-label="Email"
                name="Email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(event) => updateContactField('email', event.target.value)}
                autoComplete="email"
                maxLength={120}
                required
              />
              <input
                aria-label="Phone number"
                name="Phone"
                placeholder="Phone number"
                type="tel"
                value={formData.phone}
                onChange={(event) => updateContactField('phone', event.target.value)}
                autoComplete="tel"
                inputMode="tel"
                maxLength={32}
                required
              />
              <select
                aria-label="Service needed"
                name="Service"
                value={formData.service}
                onChange={(event) => updateContactField('service', event.target.value)}
                required
              >
                <option value="" disabled>
                  Choose service
                </option>
                {coreServices.map((service) => (
                  <option value={service.title} key={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
              <textarea
                className="full-field"
                aria-label="Message"
                name="Message"
                placeholder="Tell us what you want to solve"
                value={formData.message}
                onChange={(event) => updateContactField('message', event.target.value)}
                rows={5}
                maxLength={1500}
                required
              />
            </div>
            <p className={`form-status ${formStatus}`} role="status" aria-live="polite">
              {formMessage || 'Your request will be sent to info@theclosinggap.net.'}
            </p>
            <button className="button button-dark" type="submit" disabled={formIsSending}>
              {formIsSending ? 'Sending...' : 'Submit Request'}
            </button>
          </form>
        </div>
        <div className="contact-stack">
          <ContactTile icon={<Phone aria-hidden="true" />} title="Talk to us">
            <a href="tel:+919074294791">+91 90742 94791</a>
            <a href="tel:+442046153030">+44 20 4615 3030</a>
          </ContactTile>
          <ContactTile icon={<Mail aria-hidden="true" />} title="Email us">
            <a href="mailto:info@theclosinggap.net">info@theclosinggap.net</a>
          </ContactTile>
          <ContactTile icon={<MapPin aria-hidden="true" />} title="Locations">
            <span>128 City Road, London, EC1V 2NX, United Kingdom</span>
            <span>Pattom, Trivandrum - 695003</span>
          </ContactTile>
        </div>
      </RevealSection>
    </>
  )
}

function AdminPage({
  customInsights,
  setCustomInsights,
}: {
  customInsights: BlogPost[]
  setCustomInsights: Dispatch<SetStateAction<BlogPost[]>>
}) {
  const [draft, setDraft] = useState<BlogDraft>(emptyBlogDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState('Ready to publish')
  const savedPosts = customInsights

  const updateDraft = (field: keyof BlogDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const resetDraft = () => {
    setDraft(emptyBlogDraft)
    setEditingId(null)
    setStatus('Ready to publish')
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    if (!allowedUploadTypes.includes(file.type)) {
      setStatus('Choose a JPG, PNG, WebP, or GIF image')
      return
    }

    if (file.size > maxStoredImageSize) {
      setStatus('Use an image under 1.6 MB for browser storage')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateDraft('image', String(reader.result || ''))
      setStatus('Image added')
    }
    reader.onerror = () => setStatus('Image upload failed')
    reader.readAsDataURL(file)
  }

  const publishPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = cleanText(draft.title, 110)
    const tag = cleanText(draft.tag, 32) || 'Insight'
    const description = cleanText(draft.description, 220)
    const sections = draft.sectionsText
      .split(/\n\s*\n/)
      .map((section) => cleanText(section, 1200))
      .filter(Boolean)
      .slice(0, 8)

    if (!title || !description || sections.length === 0) {
      setStatus('Add title, summary, and body copy')
      return
    }

    const duplicateSlug = getInsights(customInsights).some(
      (post) => slugify(post.title) === slugify(title) && post.id !== editingId,
    )
    if (duplicateSlug) {
      setStatus('Use a unique title for the blog URL')
      return
    }

    const post: BlogPost = {
      id: editingId || `custom-${Date.now().toString(36)}`,
      tag,
      title,
      description,
      image: isSafeBlogImage(draft.image) ? draft.image : images.blogOne,
      sections,
    }

    setCustomInsights((current) =>
      editingId ? current.map((item) => (item.id === editingId ? post : item)) : [post, ...current],
    )
    setDraft(emptyBlogDraft)
    setEditingId(null)
    setStatus('Published')
  }

  const editPost = (post: BlogPost) => {
    setDraft({
      title: post.title,
      tag: post.tag,
      description: post.description,
      sectionsText: post.sections.join('\n\n'),
      image: post.image,
    })
    setEditingId(post.id)
    setStatus('Editing draft')
  }

  const deletePost = (postId: string) => {
    setCustomInsights((current) => current.filter((post) => post.id !== postId))
    if (editingId === postId) {
      resetDraft()
    }
    setStatus('Deleted')
  }

  const exportPosts = () => {
    const blob = new Blob([JSON.stringify(customInsights, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'closing-gap-blogs.json'
    link.click()
    URL.revokeObjectURL(url)
    setStatus('Export ready')
  }

  const importPosts = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '[]'))
        const incoming = Array.isArray(parsed)
          ? parsed.filter(isBlogPost).map(normalizeBlogPost).filter((post): post is BlogPost => Boolean(post))
          : []
        const usedSlugs = new Set(getInsights(customInsights).map((post) => slugify(post.title)))
        const freshPosts = incoming.filter((post) => !usedSlugs.has(slugify(post.title)))

        if (freshPosts.length === 0) {
          setStatus('No new posts found')
          return
        }

        setCustomInsights((current) => [...freshPosts, ...current])
        setStatus(`Imported ${freshPosts.length} post${freshPosts.length === 1 ? '' : 's'}`)
      } catch {
        setStatus('Import failed')
      }
    }
    reader.readAsText(file)
  }

  return (
    <>
      <PageHero
        kicker="Admin CMS"
        image={draft.image || images.report}
        title={
          <>
            Publish 360° Growth Insights With <span>Images</span>
          </>
        }
        copy="Create, edit, export, and publish Closing Gap insights directly into this browser-based site preview."
      />
      <RevealSection className="admin-page section-shell">
        <form className="admin-form" onSubmit={publishPost}>
          <div className="admin-form-head">
            <p className="pill-label">{editingId ? 'Editing post' : 'New post'}</p>
            <p role="status">{status}</p>
          </div>
          <label>
            Blog title
            <input
              value={draft.title}
              onChange={(event) => updateDraft('title', event.target.value)}
              placeholder="Example: How Automation Improves Lead Response"
            />
          </label>
          <label>
            Category
            <input
              value={draft.tag}
              onChange={(event) => updateDraft('tag', event.target.value)}
              placeholder="Automation"
            />
          </label>
          <label>
            Summary
            <textarea
              value={draft.description}
              onChange={(event) => updateDraft('description', event.target.value)}
              placeholder="Short description shown on the Insights page."
              rows={3}
            />
          </label>
          <label>
            Blog body
            <textarea
              value={draft.sectionsText}
              onChange={(event) => updateDraft('sectionsText', event.target.value)}
              placeholder="Write paragraphs here. Leave a blank line between sections."
              rows={9}
            />
          </label>
          <div className="admin-upload">
            <label>
              <ImagePlus aria-hidden="true" />
              Upload image
              <input accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleImageUpload} type="file" />
            </label>
            {draft.image ? <img src={draft.image} alt="" /> : <span>Image preview</span>}
          </div>
          <div className="admin-actions">
            <button className="button button-dark" type="submit">
              {editingId ? 'Update Blog' : 'Publish Blog'}
            </button>
            <button className="button button-light" type="button" onClick={resetDraft}>
              Clear
            </button>
          </div>
        </form>
        <aside className="admin-library">
          <div className="admin-library-head">
            <div>
              <p className="pill-label">Library</p>
              <h2>Saved blogs</h2>
            </div>
            <div className="admin-tools">
              <button type="button" onClick={exportPosts} aria-label="Export blogs">
                <Download aria-hidden="true" />
              </button>
              <label aria-label="Import blogs">
                <Upload aria-hidden="true" />
                <input accept="application/json" onChange={importPosts} type="file" />
              </label>
            </div>
          </div>
          <div className="admin-post-list">
            {savedPosts.length === 0 ? (
              <article>
                <h3>No custom blogs yet</h3>
                <p>Your published blogs will appear here.</p>
              </article>
            ) : (
              savedPosts.map((post) => (
                <article key={post.id}>
                  <img src={post.image} alt="" />
                  <div>
                    <span>{post.tag}</span>
                    <h3>{post.title}</h3>
                    <a href={pageHref(insightPath(post))}>View post</a>
                  </div>
                  <div className="admin-row-actions">
                    <button type="button" onClick={() => editPost(post)} aria-label={`Edit ${post.title}`}>
                      <PencilLine aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => deletePost(post.id)} aria-label={`Delete ${post.title}`}>
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </aside>
      </RevealSection>
    </>
  )
}

function ClientsPartnersPage() {
  return (
    <>
      <PageHero
        kicker="Clients and partners"
        image={images.hero}
        title={
          <>
            Together Toward <span>360° Growth</span>
          </>
        }
        copy="A relationship-led approach to client delivery, partner collaboration, and long-term business execution support."
      />
      <RevealSection className="partner-page section-shell">
        <div className="partner-panel">
          <h2>Trusted delivery relationships</h2>
          <p>
            We support organizations that need flexible talent, stronger systems, and
            measurable growth execution across markets.
          </p>
          <StatsRow />
        </div>
        <PartnerLogoRow />
        <CertificationLogoRow />
      </RevealSection>
      <Testimonials />
    </>
  )
}

function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers"
        image={images.teamGrowth}
        title={
          <>
            Build Meaningful Work With <span>Closing Gap</span>
          </>
        }
        copy="Join a team focused on practical 360° business solutions, measurable execution, and better opportunities for businesses and professionals."
      />
      <RevealSection className="listing-section section-shell">
        <div className="career-intro">
          <p className="pill-label">Open roles</p>
          <h2>Roles we are preparing to hire for</h2>
        </div>
        <div className="job-grid">
          {careerOpenings.map((role) => (
            <article key={role}>
              <h3>{role}</h3>
              <p>Hybrid collaboration, client-facing problem solving, and practical execution ownership.</p>
              <a href={pageHref('contact')}>
                Register interest <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </RevealSection>
    </>
  )
}

function CsrPage() {
  return (
    <>
      <PageHero
        kicker="CSR"
        image={images.serviceAutomation}
        title={
          <>
            Growth Should Create <span>Opportunity</span>
          </>
        }
        copy="Our social responsibility approach focuses on skill access, community support, and responsible 360° business development."
      />
      <CardBand cards={csrCards} />
    </>
  )
}

function EsgPage() {
  return (
    <>
      <PageHero
        kicker="ESG"
        image={images.advisor}
        title={
          <>
            Responsible Operations for <span>Long-Term Trust</span>
          </>
        }
        copy="Environmental, social, and governance thinking helps us build a more accountable 360° business solutions partner."
      />
      <CardBand cards={esgCards} />
    </>
  )
}

function CardBand({ cards }: { cards: { title: string; text: string }[] }) {
  return (
    <RevealSection className="card-band section-shell">
      {cards.map((card, index) => (
        <article key={card.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h2>{card.title}</h2>
          <p>{card.text}</p>
        </article>
      ))}
    </RevealSection>
  )
}

function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy"
      title="Privacy Policy"
      intro="This page is a clean placeholder for Closing Gap privacy content. Replace with final legal copy before launch."
      sections={[
        ['Information we collect', 'We may collect contact details, service inquiries, analytics events, and communication preferences submitted through the website.'],
        ['How we use information', 'Information is used to respond to inquiries, improve website performance, manage consultation requests, and deliver relevant updates.'],
        ['Cookies and analytics', 'The final site can include essential cookies and optional analytics cookies with consent controls where required.'],
        ['Your choices', 'Visitors can request updates, corrections, or deletion of personal data by contacting the Closing Gap team.'],
      ]}
    />
  )
}

function TermsPage() {
  return (
    <LegalPage
      kicker="Terms"
      title="Terms & Conditions"
      intro="This page is a structured placeholder for final business terms, service disclaimers, and website usage rules."
      sections={[
        ['Website use', 'Visitors agree to use the website responsibly and not interfere with the performance, security, or availability of the site.'],
        ['Service information', 'Website content explains general services and does not create a binding engagement until a written agreement is confirmed.'],
        ['Intellectual property', 'Brand, design, text, and assets are protected and should not be copied or reused without permission.'],
        ['Limitation of liability', 'Final legal language should be reviewed by counsel before publishing the production website.'],
      ]}
    />
  )
}

function CookiePolicyPage() {
  return (
    <LegalPage
      kicker="Cookies"
      title="Cookie Policy"
      intro="This placeholder explains how cookies can be handled on the final Closing Gap site."
      sections={[
        ['Essential cookies', 'Essential cookies support navigation, forms, security, and basic website functionality.'],
        ['Analytics cookies', 'Analytics cookies can help us understand traffic sources, page views, and website performance.'],
        ['Marketing cookies', 'Marketing cookies may support relevant campaigns, remarketing, and content personalization when enabled.'],
        ['Managing preferences', 'Visitors should be able to accept, reject, or customize optional cookies where required by law.'],
      ]}
    />
  )
}

function NotFoundPage() {
  return (
    <RevealSection className="not-found section-shell">
      <p className="pill-label">404</p>
      <h1>
        This page is not in the <span>growth plan.</span>
      </h1>
      <p>The link may be old, moved, or still waiting to be built.</p>
      <a className="button button-dark" href={pageHref('home')}>
        Back to Home
      </a>
    </RevealSection>
  )
}

function PageHero({
  kicker,
  title,
  copy,
  image,
}: {
  kicker: string
  title: ReactNode
  copy: string
  image: string
}) {
  return (
    <RevealSection className="page-hero section-shell">
      <div className="page-hero-copy">
        <p className="pill-label">{kicker}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="paired-buttons">
          <a className="button button-dark" href={pageHref('contact')}>
            Start a Conversation
          </a>
          <a className="icon-button" href={pageHref('contact')} aria-label="Start a conversation">
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <img src={image} alt="" />
    </RevealSection>
  )
}

function ProcessBand() {
  return (
    <RevealSection className="process-band section-shell">
      <div>
        <p className="pill-label">How it works</p>
        <h2>Simple stages, serious 360° follow-through.</h2>
      </div>
      <div className="process-grid">
        {process.map((item) => (
          <article key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  )
}

function ContactTile({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <article className="contact-tile">
      <div>{icon}</div>
      <h3>{title}</h3>
      <div className="contact-tile-body">{children}</div>
    </article>
  )
}

function LegalPage({
  kicker,
  title,
  intro,
  sections,
}: {
  kicker: string
  title: string
  intro: string
  sections: [string, string][]
}) {
  return (
    <RevealSection className="legal-page section-shell">
      <p className="pill-label">{kicker}</p>
      <h1>{title}</h1>
      <p className="legal-intro">{intro}</p>
      <div className="legal-list">
        {sections.map(([heading, text]) => (
          <article key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  )
}

function SiteFooter() {
  const footerGroups = [
    { title: 'Company', links: companyNav },
    { title: 'Resources', links: resourceNav },
    { title: 'Legal', links: legalNav },
  ]

  return (
    <footer className="contact-footer">
      <div className="footer-brand">
        <img className="brand-symbol" src={images.brandMark} alt="" />
        <span>Closing Gap</span>
      </div>
      <div className="footer-grid">
        <div>
          <h2>
            Ready to Build a <span>360° Growth System</span>?
          </h2>
          <p>We look forward to learning what your business needs next.</p>
          <div className="paired-buttons">
            <a className="button button-dark" href="tel:+919074294791">
              Free Consultation
            </a>
            <a className="icon-button" href="tel:+919074294791" aria-label="Call Closing Gap">
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        {footerGroups.map((group) => (
          <div className="contact-list" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((item) => (
              <a href={pageHref(item.key)} key={`${group.title}-${item.key}`}>
                {item.label}
              </a>
            ))}
          </div>
        ))}
        <div className="contact-list">
          <h3>Contact us</h3>
          <a href="tel:+919074294791">
            <Phone aria-hidden="true" /> +91 90742 94791
          </a>
          <a href="tel:+442046153030">
            <Phone aria-hidden="true" /> +44 20 4615 3030
          </a>
          <a href="mailto:info@theclosinggap.net">
            <Mail aria-hidden="true" /> info@theclosinggap.net
          </a>
          <div className="footer-socials" aria-label="Closing Gap social media links">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Follow Closing Gap on ${link.label}`}
                title={link.label}
              >
                {link.shortLabel}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>(c) 2026 Closing Gap. All rights reserved.</span>
        <span>Privacy Policy / Terms & Conditions / ESG</span>
      </div>
    </footer>
  )
}

export default App
