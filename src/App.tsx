import { useEffect, useState } from 'react'
import type { ChangeEvent, Dispatch, FormEvent, ReactNode, SetStateAction } from 'react'
import {
  ArrowUpRight,
  Asterisk,
  BarChart3,
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

const imageBase = '/reference/finovate-root/images/'

const images = {
  hero: `${imageBase}21-GettyImages-2184924844-a8780068.webp`,
  metric: `${imageBase}24-GettyImages-2041846314-6fbefa66.webp`,
  cta: `${imageBase}35-GettyImages-1364057915-ed1c15eb.webp`,
  advisor: `${imageBase}36-GettyImages-1824276392-148538d4.webp`,
  newsletter: `${imageBase}41-GettyImages-2163451178-cd059ca6.webp`,
  blogOne: `${imageBase}37-GettyImages-2162109308-3f385f13.webp`,
  blogThree: `${imageBase}40-GettyImages-1502868925-0eb08f21.webp`,
  report: `${imageBase}39-Piled-Up-Books-Mockup-17e5a4cc.webp`,
  serviceOne: `${imageBase}26-GettyImages-1848411099-a8a8a589.webp`,
  serviceTwo: `${imageBase}29-GettyImages-2180893170-d6657911.webp`,
  serviceThree: `${imageBase}31-GettyImages-1218283950-7522b01e.webp`,
  serviceFour: `${imageBase}33-GettyImages-1294412622-1jpg-3fe9c57f.webp`,
  headOne: `${imageBase}02-pexels-mart-production-7222858-3f71ca60.webp`,
  headTwo: `${imageBase}04-pexels-mikhail-nilov-7677869-0887b01e.webp`,
  headThree: `${imageBase}06-pexels-karolina-grabowska-7681192-c55ab0ab.webp`,
  headFour: `${imageBase}10-pexels-thisisengineering-3861962-1-267e5455.webp`,
  logoHex: `${imageBase}15-hex-2f056940.svg`,
  logoMt: `${imageBase}16-MTgox-5aa9a44f.svg`,
  logoSavex: `${imageBase}17-savex-6da01b7d.svg`,
  logoCoinbase: `${imageBase}18-coinbase-b9d40600.svg`,
  logoKonstruktion: `${imageBase}19-konstruktion-3071516d.svg`,
  logoMeta: `${imageBase}20-meta-377aa782.svg`,
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
  featured?: boolean
}

type BlogDraft = {
  title: string
  tag: string
  description: string
  sectionsText: string
  image: string
}

const customInsightsStorageKey = 'closing-gap-custom-insights-v1'

const primaryNav: PageLink[] = [
  { key: 'home', label: 'Home' },
  { key: 'services', label: 'Services' },
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
  { key: 'admin', label: 'Admin CMS' },
]

const legalNav: PageLink[] = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms & Conditions' },
  { key: 'cookie-policy', label: 'Cookie Policy' },
]

const partnerLogos = [
  { name: 'Hex', src: images.logoHex },
  { name: 'MTgox', src: images.logoMt },
  { name: 'Savex', src: images.logoSavex },
  { name: 'Coinbase', src: images.logoCoinbase },
  { name: 'Konstruktion', src: images.logoKonstruktion },
  { name: 'Meta', src: images.logoMeta },
]

const coreServices = [
  {
    title: 'Global Outsourcing',
    description: 'Managed overseas delivery capacity for operations, support, and project execution.',
    detail:
      'Build reliable offshore capacity with role planning, delivery governance, onboarding support, and a practical operating rhythm.',
    image: images.serviceTwo,
    icon: Globe2,
    bullets: ['Role planning', 'Compliance coordination', 'Remote delivery support'],
    outcomes: ['Lower delivery overhead', 'Cleaner onboarding', 'More scalable execution'],
  },
  {
    title: 'Development & Testing',
    description: 'Web, cloud, app, QA, security, and performance support for reliable digital builds.',
    detail:
      'Plan, build, test, and release digital products with engineering support that keeps quality visible throughout the project.',
    image: images.serviceThree,
    icon: Layers,
    bullets: ['Web and app delivery', 'QA planning', 'Release support'],
    outcomes: ['Fewer release surprises', 'Clearer technical delivery', 'Better product reliability'],
  },
  {
    title: 'Digital Marketing',
    description: 'SEO, paid media, content, analytics, and performance campaigns built around ROI.',
    detail:
      'Turn visibility into qualified demand with search, paid campaigns, content, social execution, and reporting that supports decisions.',
    image: images.serviceFour,
    icon: BarChart3,
    bullets: ['SEO and paid ads', 'Content planning', 'Performance tracking'],
    outcomes: ['Sharper visibility', 'Better lead quality', 'Clearer marketing ROI'],
  },
  {
    title: 'Business Automation',
    description: 'CRM, workflow, lead routing, and messaging automation that reduces manual work.',
    detail:
      'Connect forms, messages, CRMs, follow-ups, reports, and internal workflows so repeated work moves without constant manual effort.',
    image: images.serviceOne,
    icon: Workflow,
    bullets: ['CRM workflows', 'Lead routing', 'WhatsApp replies'],
    outcomes: ['Faster response times', 'Fewer missed follow-ups', 'Cleaner operations'],
  },
  {
    title: 'Hiring & Staffing',
    description: 'Fast candidate shortlisting, screening, and staffing support for high-impact roles.',
    detail:
      'Find the right people faster with focused role definition, candidate screening, interview support, and staffing coordination.',
    image: images.headTwo,
    icon: Users,
    bullets: ['Talent sourcing', 'AI-assisted screening', 'Interview support'],
    outcomes: ['Better candidate fit', 'Less resume noise', 'Faster hiring cycles'],
  },
  {
    title: 'Personal Branding',
    description: 'Resume, LinkedIn, interview, and content support for leaders and professionals.',
    detail:
      'Clarify professional positioning through ATS-friendly resumes, LinkedIn profile work, interview coaching, and practical content direction.',
    image: images.headThree,
    icon: ShieldCheck,
    bullets: ['ATS resumes', 'LinkedIn makeover', 'Interview coaching'],
    outcomes: ['Stronger profile clarity', 'Better recruiter visibility', 'More confident interviews'],
  },
  {
    title: 'Startup & SMB Services',
    description: 'Lean growth support for founders who need execution capacity without heavy overhead.',
    detail:
      'Give startups and SMBs access to flexible growth support across marketing, operations, hiring, automation, and technical delivery.',
    image: images.blogOne,
    icon: CircleDot,
    bullets: ['Go-to-market plans', 'Operating systems', 'Founder support'],
    outcomes: ['Lean execution capacity', 'Practical launch support', 'Better founder focus'],
  },
  {
    title: 'Technology Solutions',
    description: 'Integrated systems using Zoho, Power Platform, dashboards, and connected tools.',
    detail:
      'Design practical business systems with connected tools, dashboards, automations, and integrations that match daily workflows.',
    image: images.metric,
    icon: Layers,
    bullets: ['Zoho systems', 'Power Platform', 'Dashboards'],
    outcomes: ['Connected tool stack', 'Cleaner reporting', 'Stronger operating visibility'],
  },
  {
    title: 'Training & Upskilling',
    description: 'Hire-train-deploy, team enablement, and practical skill programs for growth teams.',
    detail:
      'Support teams with role-based learning, hire-train-deploy models, and practical upskilling designed around business outcomes.',
    image: images.headFour,
    icon: CheckCircle2,
    bullets: ['Role-based training', 'HTD programs', 'Team enablement'],
    outcomes: ['Sharper team capability', 'Faster ramp-up', 'Better role readiness'],
  },
  {
    title: 'Business Consulting',
    description: 'Execution strategy, process design, governance, and operating rhythm advisory.',
    detail:
      'Clarify priorities, build a workable plan, define ownership, and improve execution rhythm across teams and functions.',
    image: images.advisor,
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
    text: 'Your goals shape the team, systems, timelines, and growth strategy we build.',
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
    text: 'We shape the right mix of talent, outsourcing, automation, marketing, and delivery.',
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
  { name: 'Delivery Strategy', role: 'Consulting & Operations', image: images.headOne },
  { name: 'Talent Desk', role: 'Hiring & Staffing', image: images.headTwo },
  { name: 'Automation Lab', role: 'Systems & Workflow', image: images.headThree },
  { name: 'Growth Studio', role: 'Marketing & Branding', image: images.headFour },
]

const emptyBlogDraft: BlogDraft = {
  title: '',
  tag: '',
  description: '',
  sectionsText: '',
  image: '',
}

const defaultInsights: BlogPost[] = [
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
    image: images.serviceTwo,
    challenge: 'The client needed delivery capacity without adding heavy local overhead or slowing active projects.',
    solution: 'We mapped roles, defined communication rhythm, supported onboarding, and created a quality review loop.',
    result: 'Delivery overhead dropped while project control and team visibility improved.',
  },
  {
    title: 'Automation Stack for Faster Lead Response',
    metric: '35% lift in conversion',
    description:
      'Lead capture, WhatsApp replies, and CRM updates were connected into a cleaner response workflow.',
    image: images.newsletter,
    challenge: 'Manual follow-up meant leads were being missed during peak campaign periods.',
    solution: 'We connected inquiry forms, messaging, CRM updates, and assignment rules into one response workflow.',
    result: 'Response time improved and sales conversion increased across the next campaign cycle.',
  },
  {
    title: 'Digital Growth Sprint for a Services Brand',
    metric: '3x traffic in 90 days',
    description:
      'SEO, content, paid campaigns, and reporting cadence helped turn web visibility into qualified inquiries.',
    image: images.blogOne,
    challenge: 'The brand had low search visibility and inconsistent lead quality.',
    solution: 'We tightened campaign targeting, improved content structure, and introduced weekly performance reporting.',
    result: 'Website traffic tripled and inquiries became easier to qualify.',
  },
]

const works = [
  {
    title: 'CRM Automation Blueprint',
    tag: 'Automation',
    image: images.newsletter,
    description: 'Lead capture, CRM fields, handoff rules, and reporting designed as one connected workflow.',
  },
  {
    title: 'Hiring Funnel Redesign',
    tag: 'Talent',
    image: images.headTwo,
    description: 'A cleaner screening and interview rhythm for faster shortlist quality.',
  },
  {
    title: 'Growth Website Refresh',
    tag: 'Marketing',
    image: images.blogOne,
    description: 'Messaging, landing flow, conversion sections, and analytics structure for a service brand.',
  },
  {
    title: 'Delivery Governance System',
    tag: 'Operations',
    image: images.advisor,
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
    image: images.serviceTwo,
  },
  {
    title: 'Automation Planning Workbook',
    description: 'A guided workbook for prioritizing workflows that save time and protect lead quality.',
    image: images.serviceOne,
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
  return page === 'home' ? '#/' : `#/${page}`
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
    return Array.isArray(parsed) ? parsed.filter(isBlogPost) : []
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

function getRouteFromHash(insights: BlogPost[] = defaultInsights): PageKey {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const route = window.location.hash.replace(/^#\/?/, '').split('?')[0] || 'home'
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [customInsights, setCustomInsights] = useState<BlogPost[]>(() => readCustomInsights())
  const insights = getInsights(customInsights)
  const [activePage, setActivePage] = useState<PageKey>(() => getRouteFromHash(insights))

  useEffect(() => {
    const syncRoute = () => {
      setActivePage(getRouteFromHash(getInsights(customInsights)))
      setMenuOpen(false)
    }

    syncRoute()
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [customInsights])

  useEffect(() => {
    saveCustomInsights(customInsights)
  }, [customInsights])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [activePage])

  return (
    <div className="site-shell">
      <Header activePage={activePage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        {renderPage(activePage, activeFaq, setActiveFaq, insights, customInsights, setCustomInsights)}
        <SiteFooter />
      </main>
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

function Header({
  activePage,
  menuOpen,
  setMenuOpen,
}: {
  activePage: PageKey
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
}) {
  const mobileLinks = [...primaryNav, ...companyNav, ...resourceNav, ...legalNav]

  return (
    <header className="site-header">
      <a className="brand" href={pageHref('home')} aria-label="Closing Gap home">
        <span className="brand-mark">
          <Asterisk aria-hidden="true" />
        </span>
        <span>Closing Gap</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryNav.map((item) => (
          <a
            className={navIsActive(activePage, item.key) ? 'is-active' : ''}
            href={pageHref(item.key)}
            key={item.key}
          >
            {item.label}
          </a>
        ))}
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
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Grip aria-hidden="true" />}
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        {mobileLinks.map((item) => (
          <a
            className={navIsActive(activePage, item.key) ? 'is-active' : ''}
            href={pageHref(item.key)}
            key={`${item.key}-${item.label}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
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
    <section className="hero">
      <div className="hero-top section-shell">
        <h1>
          Your All in One <span>Growth Partner</span>
        </h1>
        <div className="hero-actions">
          <a className="button button-dark" href={pageHref('contact')}>
            Let's get started
          </a>
          <a className="icon-button" href={pageHref('contact')} aria-label="Book a growth call">
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="button button-light" href={pageHref('services')}>
            Explore Services
          </a>
        </div>
      </div>
      <img className="hero-photo" src={images.hero} alt="Consultants reviewing a growth plan" />
      <div className="asset-strip section-shell" aria-label="Closing Gap performance highlights">
        <article className="asset-card asset-title">
          <h2>Growth</h2>
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
    </section>
  )
}

function WhoWeAre() {
  return (
    <section className="intro-section section-shell">
      <div>
        <p className="pill-label">Who we are</p>
        <h2>
          Founded to Close the Gaps that Continue to <span>Slow Growth.</span>
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
          We are a team of specialists helping businesses access talent, build smarter
          systems, launch stronger marketing, and operate with less friction.
        </p>
      </div>
    </section>
  )
}

function ServicesPanel() {
  return (
    <section className="services-panel section-shell">
      <div className="panel-head">
        <p className="pill-label">Services</p>
        <h2>
          Covering the Full Spectrum of <span>Business Growth</span> Services
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
    </section>
  )
}

function Values() {
  return (
    <section className="values-section section-shell">
      <p className="pill-label">Our values</p>
      <h2>
        We Listen, <span>Think Independently,</span> Advise & Take Action
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
    </section>
  )
}

function PhotoCta() {
  return (
    <section className="photo-cta">
      <img src={images.cta} alt="Consultants planning business growth" />
      <div className="floating-card">
        <p className="pill-label">Why us?</p>
        <Asterisk aria-hidden="true" />
        <h2>
          You'll Know What <span>Builds Growth</span>
        </h2>
        <p>Transparent teams. Practical systems. No gimmicks.</p>
        <a className="button button-dark" href={pageHref('contact')}>
          Schedule a Call
        </a>
      </div>
    </section>
  )
}

function TeamPreview() {
  return (
    <section className="team-section section-shell">
      <div className="section-row">
        <div>
          <p className="pill-label">Our team</p>
          <h2>
            Choosing <span>The Right</span> Growth Planning Team
          </h2>
        </div>
        <a className="button button-dark" href={pageHref('team')}>
          View All
        </a>
      </div>
      <TeamCards />
      <StatsRow />
    </section>
  )
}

function TeamCards() {
  return (
    <div className="team-grid">
      {teamMembers.map((member) => (
        <article className="team-card" key={member.name}>
          <img src={member.image} alt="" />
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
    <section className="trust-section section-shell">
      <div className="trust-image">
        <img src={images.advisor} alt="Advisory meeting" />
        <div className="cert-card">
          <ShieldCheck aria-hidden="true" />
          <span>Verified Delivery</span>
        </div>
      </div>
      <article className="trust-card">
        <p className="pill-label">Trusted partner</p>
        <h2>Execution Support Across Talent, Tech, and Growth</h2>
        <p>
          We help you build confidence across the full growth journey, from finding the
          right people to automating the systems that keep work moving.
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
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonial-section section-shell">
      <div className="testimonial-copy">
        <p className="pill-label">Testimonials</p>
        <h2>
          Client <span>Experiences</span> That Speak for Themselves
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
          <img src={images.headTwo} alt="" />
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
    </section>
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

function InsightsPreview({ insights }: { insights: BlogPost[] }) {
  return (
    <section className="insights-section">
      <div className="section-shell">
        <div className="section-row">
          <div>
            <p className="pill-label">Insights</p>
            <h2>
              Hear <span>Directly</span> From Growth Experts
            </h2>
          </div>
          <a className="button button-dark" href={pageHref('insights')}>
            More Insights
          </a>
        </div>
        <InsightCards insights={insights} />
      </div>
    </section>
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
    <section className={`faq-section section-shell ${compact ? 'compact-section' : ''}`}>
      <div className="faq-intro">
        <p className="pill-label">FAQ</p>
        <h2>Growth Support FAQs</h2>
        <p>Common questions on hiring, outsourcing, automation, marketing, and delivery.</p>
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
    </section>
  )
}

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-copy">
        <Asterisk aria-hidden="true" />
        <h2>Latest News & Resources</h2>
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
    </section>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        image={images.serviceThree}
        title={
          <>
            Growth Services That Close <span>Execution Gaps</span>
          </>
        }
        copy="Talent, outsourcing, technology, marketing, automation, and consulting support arranged as one practical growth system."
      />
      <section className="directory-section section-shell">
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
      </section>
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
        kicker="Service"
        image={service.image}
        title={
          <>
            {service.title} <span>Designed for Growth</span>
          </>
        }
        copy={service.detail}
      />
      <section className="detail-section section-shell">
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
      </section>
      <section className="outcome-section section-shell">
        <p className="pill-label">Expected outcomes</p>
        <div className="outcome-grid">
          {service.outcomes.map((outcome) => (
            <span key={outcome}>{outcome}</span>
          ))}
        </div>
      </section>
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
            A Practical Partner for <span>Sustainable Growth</span>
          </>
        }
        copy="Closing Gap brings talent, technology, operations, marketing, and automation support together so growing businesses can execute with more confidence."
      />
      <section className="story-section section-shell">
        <div className="story-copy">
          <p className="pill-label">Mission and goals</p>
          <h2>
            Clear goals, measurable execution, and <span>less operational drag.</span>
          </h2>
        </div>
        <div className="story-cards">
          <article>
            <span>01</span>
            <h3>Mission</h3>
            <p>
              To close critical execution gaps across talent, operations, marketing, and
              technology with scalable and affordable solutions.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Vision</h3>
            <p>
              A world where ambitious businesses can access strong talent, smart systems,
              and proven growth strategy without unnecessary complexity.
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
      </section>
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
            Specialists Built Around <span>Your Growth Plan</span>
          </>
        }
        copy="A blended team model for strategy, staffing, delivery, automation, marketing, and operations."
      />
      <section className="team-section section-shell page-spaced">
        <TeamCards />
        <StatsRow />
      </section>
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
            Practical Thinking for <span>Growing Teams</span>
          </>
        }
        copy="Notes on hiring, automation, outsourcing, digital marketing, product delivery, and operating with less friction."
      />
      <section className="insights-section page-insights">
        <div className="section-shell">
          <InsightCards insights={insights} />
        </div>
      </section>
      <Newsletter />
    </>
  )
}

function ArticleDetailPage({ article }: { article: BlogPost }) {
  return (
    <>
      <PageHero
        kicker={article.tag}
        image={article.image}
        title={<>{article.title}</>}
        copy={article.description}
      />
      <section className="article-section section-shell">
        {article.sections.map((section, index) => (
          <article key={section}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{section}</p>
          </article>
        ))}
      </section>
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
            Real Growth Problems, <span>Cleaner Execution</span>
          </>
        }
        copy="Representative examples of how Closing Gap can help businesses improve capability, speed, and operational clarity."
      />
      <section className="case-section section-shell">
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
      </section>
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
      <section className="story-section section-shell">
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
      </section>
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
            Selected Work Across <span>Growth Systems</span>
          </>
        }
        copy="A portfolio-style view of practical work across automation, hiring, marketing, operations, and delivery."
      />
      <section className="listing-section section-shell">
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
      </section>
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
            Support for Teams Across <span>Multiple Industries</span>
          </>
        }
        copy="Closing Gap adapts talent, technology, automation, and marketing support to the operating realities of each sector."
      />
      <section className="industry-section section-shell">
        {industries.map((industry, index) => (
          <article key={industry}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{industry}</h2>
            <p>Flexible execution support for teams that need better capacity, clearer workflows, and measurable growth.</p>
          </article>
        ))}
      </section>
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
            Practical Guides for <span>Growth Operators</span>
          </>
        }
        copy="Downloadable planning resources for leaders improving hiring, automation, outsourcing, and execution."
      />
      <section className="listing-section section-shell">
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
      </section>
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
        image={images.serviceOne}
        title={
          <>
            Answers Before We <span>Start the Work</span>
          </>
        }
        copy="A clearer view of how we approach hiring, outsourcing, automation, consulting, and delivery."
      />
      <FaqSection activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        image={images.hero}
        title={
          <>
            Ready to Close the Gap in <span>Your Business?</span>
          </>
        }
        copy="Share the outcome you want, and we will help shape the right first step."
      />
      <section className="contact-page section-shell">
        <div className="contact-panel">
          <h2>Book Your Free Consultation</h2>
          <p>Tell us what you need. We will route the conversation to the right team.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <input aria-label="Name" placeholder="Name" />
            <input aria-label="Email" placeholder="Email" type="email" />
            <input aria-label="Service" placeholder="Service needed" />
            <button className="button button-dark" type="submit">
              Submit
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
      </section>
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

    if (!file.type.startsWith('image/')) {
      setStatus('Choose an image file')
      return
    }

    if (file.size > 1_600_000) {
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

    const title = draft.title.trim()
    const tag = draft.tag.trim() || 'Insight'
    const description = draft.description.trim()
    const sections = draft.sectionsText
      .split(/\n\s*\n/)
      .map((section) => section.trim())
      .filter(Boolean)

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
      image: draft.image || images.blogOne,
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
        const incoming = Array.isArray(parsed) ? parsed.filter(isBlogPost) : []
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
            Publish Blog Posts With <span>Images</span>
          </>
        }
        copy="Create, edit, export, and publish Closing Gap insights directly into the site preview."
      />
      <section className="admin-page section-shell">
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
              <input accept="image/*" onChange={handleImageUpload} type="file" />
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
      </section>
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
            Together Toward <span>Greater Growth</span>
          </>
        }
        copy="A relationship-led approach to client delivery, partner collaboration, and long-term execution support."
      />
      <section className="partner-page section-shell">
        <div className="partner-panel">
          <h2>Trusted delivery relationships</h2>
          <p>
            We support organizations that need flexible talent, stronger systems, and
            measurable growth execution across markets.
          </p>
          <StatsRow />
        </div>
        <PartnerLogoRow />
      </section>
      <Testimonials />
    </>
  )
}

function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers"
        image={images.headFour}
        title={
          <>
            Build Meaningful Work With <span>Closing Gap</span>
          </>
        }
        copy="Join a team focused on practical growth, measurable execution, and better opportunities for businesses and professionals."
      />
      <section className="listing-section section-shell">
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
      </section>
    </>
  )
}

function CsrPage() {
  return (
    <>
      <PageHero
        kicker="CSR"
        image={images.serviceOne}
        title={
          <>
            Growth Should Create <span>Opportunity</span>
          </>
        }
        copy="Our social responsibility approach focuses on skill access, community support, and responsible business development."
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
        copy="Environmental, social, and governance thinking helps us build a more accountable growth partner."
      />
      <CardBand cards={esgCards} />
    </>
  )
}

function CardBand({ cards }: { cards: { title: string; text: string }[] }) {
  return (
    <section className="card-band section-shell">
      {cards.map((card, index) => (
        <article key={card.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h2>{card.title}</h2>
          <p>{card.text}</p>
        </article>
      ))}
    </section>
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
    <section className="not-found section-shell">
      <p className="pill-label">404</p>
      <h1>
        This page is not in the <span>growth plan.</span>
      </h1>
      <p>The link may be old, moved, or still waiting to be built.</p>
      <a className="button button-dark" href={pageHref('home')}>
        Back to Home
      </a>
    </section>
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
    <section className="page-hero section-shell">
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
    </section>
  )
}

function ProcessBand() {
  return (
    <section className="process-band section-shell">
      <div>
        <p className="pill-label">How it works</p>
        <h2>Simple stages, serious follow-through.</h2>
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
    </section>
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
    <section className="legal-page section-shell">
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
    </section>
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
        <span className="brand-mark">
          <Asterisk aria-hidden="true" />
        </span>
        <span>Closing Gap</span>
      </div>
      <div className="footer-grid">
        <div>
          <h2>
            Ready to <span>Close the Gap</span> in your Business?
          </h2>
          <p>We look forward to learning about your goals.</p>
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
