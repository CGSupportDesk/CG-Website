import { readFile, writeFile } from 'node:fs/promises'

const sourcePath = process.argv[2]
const outputPath = process.argv[3] ?? 'src/data/serviceInsights.ts'

if (!sourcePath) {
  throw new Error('Usage: node scripts/import-service-insights.mjs <source-markdown> [output-file]')
}

const imageBase = '/assets/closing-gap/'
const articleSpecs = [
  {
    start: 3,
    tag: 'Hiring & Staffing',
    title: 'Hiring & Staffing Solutions for Growing Businesses',
    image: `${imageBase}service-hiring-staffing.webp`,
  },
  {
    start: 209,
    tag: 'Global Outsourcing',
    title: 'Global Outsourcing Solutions for Modern Business Growth',
    image: `${imageBase}service-global-outsourcing.webp`,
  },
  {
    start: 415,
    tag: 'Development & Testing',
    title: 'Development & Testing Solutions for Modern Digital Growth',
    image: `${imageBase}service-development-testing.webp`,
  },
  {
    start: 614,
    tag: 'Digital Marketing',
    title: 'Digital Marketing Solutions for Modern Business Growth',
    image: `${imageBase}service-digital-marketing.webp`,
  },
  {
    start: 837,
    tag: 'Business Automation',
    title: 'Business Automation Solutions for Smarter Operations',
    image: `${imageBase}service-business-automation.webp`,
  },
  {
    start: 1045,
    tag: 'Personal Branding',
    title: 'Personal Branding Solutions for Modern Professionals & Businesses',
    image: `${imageBase}service-personal-branding.webp`,
  },
  {
    start: 1251,
    tag: 'Startup & SMB',
    title: 'Startup & SMB Solutions for Sustainable Business Growth',
    image: `${imageBase}service-startup-smb.webp`,
  },
  {
    start: 1460,
    tag: 'Technology Solutions',
    title: 'Technology Solutions for Modern Business Transformation',
    image: `${imageBase}service-technology-solutions.webp`,
  },
  {
    start: 1685,
    tag: 'Training & Upskilling',
    title: 'Training & Upskilling Solutions for Workforce Growth',
    image: `${imageBase}service-training-upskilling.webp`,
  },
  {
    start: 1891,
    tag: 'Business Consulting',
    title: 'Business Consulting Solutions for Strategic Growth',
    image: `${imageBase}service-business-consulting.webp`,
  },
]

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function clean(value) {
  return value
    .replace(/!\[\]\[image\d+\]/gi, '')
    .replace(/\*\*/g, '')
    .replace(/_{2,}/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function summarize(value, limit = 210) {
  if (value.length <= limit) {
    return value
  }

  return `${value.slice(0, limit - 3).replace(/\s+\S*$/, '')}...`
}

function isSeparator(value) {
  return !value || /^[-—–\s]+$/.test(value)
}

function createSection(heading) {
  return { heading, paragraphs: [], bullets: [], subsections: [] }
}

function createSubsection(heading) {
  return { heading, paragraphs: [], bullets: [] }
}

function getLeadParagraphs(sections) {
  const paragraphs = []

  for (const section of sections) {
    paragraphs.push(...section.paragraphs)
    for (const subsection of section.subsections) {
      paragraphs.push(...subsection.paragraphs)
    }
    if (paragraphs.length >= 3) {
      break
    }
  }

  return paragraphs
}

function parseArticle(lines, spec, nextStart) {
  const sections = [createSection('Overview')]
  let currentSection = sections[0]
  let currentSubsection = null

  for (let index = spec.start - 1; index < nextStart - 1; index += 1) {
    const rawLine = lines[index]?.trim() ?? ''

    if (/^\[image\d+\]:/i.test(rawLine) || isSeparator(rawLine)) {
      continue
    }

    const headingMatch = rawLine.match(/^(#{1,2})\s+(.+)$/)
    if (headingMatch) {
      const heading = clean(headingMatch[2])
      if (!heading || heading === spec.title) {
        continue
      }

      if (headingMatch[1] === '#') {
        currentSection = createSection(heading)
        sections.push(currentSection)
        currentSubsection = null
      } else {
        currentSubsection = createSubsection(heading)
        currentSection.subsections.push(currentSubsection)
      }
      continue
    }

    const line = clean(rawLine)
    if (!line || line === spec.title) {
      continue
    }

    const target = currentSubsection ?? currentSection
    if (/^\*\s+/.test(rawLine)) {
      target.bullets.push(clean(rawLine.replace(/^\*\s+/, '')))
    } else {
      target.paragraphs.push(line)
    }
  }

  const compactSections = sections.filter(
    (section) =>
      section.paragraphs.length > 0 ||
      section.bullets.length > 0 ||
      section.subsections.length > 0,
  )
  const leadParagraphs = getLeadParagraphs(compactSections)

  return {
    id: `service-${slugify(spec.title)}`,
    tag: spec.tag,
    title: spec.title,
    description: summarize(leadParagraphs[0]),
    image: spec.image,
    featured: spec.tag === 'Business Consulting',
    sections: leadParagraphs.slice(0, 6),
    content: compactSections,
  }
}

const markdown = await readFile(sourcePath, 'utf8')
const lines = markdown.split(/\r?\n/)
const articles = articleSpecs.map((spec, index) =>
  parseArticle(lines, spec, articleSpecs[index + 1]?.start ?? lines.length + 1),
)
const output = `// Generated from the supplied Closing Gap service articles.\n// Run: node scripts/import-service-insights.mjs \"C:/path/to/source.md\"\nexport const importedServiceInsights = ${JSON.stringify(articles, null, 2)}\n`

await writeFile(outputPath, output, 'utf8')
console.log(`Imported ${articles.length} long-form insights into ${outputPath}.`)
