import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface PortfolioData {
  // Profile
  name: string
  grade: string
  school: string
  region: string
  initials: string
  bio?: string
  // Academics
  gpa: number
  gpaMax: number
  ielts: { current: number; target: number }
  sat: { current: number; target: number }
  olympiads: Array<{ title: string; place: string; year: number }>
  // Clubs & Leadership
  clubs: Array<{ name: string; role: string; sessions: number }>
  // Achievements
  achievements: Array<{ name: string; desc: string }>
  // Teacher Feedback
  teacherFeedback: { quote: string; teacher: string; subject: string }
  // Majors / Career Goals
  major1?: string
  major2?: string
}

// Color palette
const COLORS = {
  primary: [30, 64, 175] as [number, number, number],       // blue-800
  primaryLight: [59, 130, 246] as [number, number, number],  // blue-500
  accent: [99, 102, 241] as [number, number, number],        // indigo-500
  dark: [15, 23, 42] as [number, number, number],            // slate-900
  medium: [71, 85, 105] as [number, number, number],         // slate-600
  light: [148, 163, 184] as [number, number, number],        // slate-400
  bg: [248, 250, 252] as [number, number, number],           // slate-50
  white: [255, 255, 255] as [number, number, number],
  success: [22, 163, 74] as [number, number, number],        // green-600
  gold: [217, 119, 6] as [number, number, number],           // amber-600
  border: [226, 232, 240] as [number, number, number],       // slate-200
}

const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MARGIN_LEFT = 20
const MARGIN_RIGHT = 20
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT

function generatePortfolioId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'KM-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function generateStudentId(name: string): string {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase()
  const num = Math.floor(1000 + Math.random() * 9000)
  return `STU-${initials}-${num}`
}

function drawSectionHeader(doc: jsPDF, title: string, y: number, icon?: string): number {
  // Accent bar
  doc.setFillColor(...COLORS.primary)
  doc.roundedRect(MARGIN_LEFT, y, 4, 14, 2, 2, 'F')

  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...COLORS.dark)
  doc.text(title, MARGIN_LEFT + 10, y + 10)

  // Underline
  doc.setDrawColor(...COLORS.border)
  doc.setLineWidth(0.5)
  doc.line(MARGIN_LEFT, y + 18, PAGE_WIDTH - MARGIN_RIGHT, y + 18)

  return y + 24
}

function checkPageBreak(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - 30) {
    doc.addPage()
    // Add subtle header line on new pages
    doc.setDrawColor(...COLORS.border)
    doc.setLineWidth(0.3)
    doc.line(MARGIN_LEFT, 15, PAGE_WIDTH - MARGIN_RIGHT, 15)
    return 25
  }
  return y
}

export async function generatePortfolioPDF(data: PortfolioData): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4')
  const portfolioId = generatePortfolioId()
  const studentId = generateStudentId(data.name)
  const generatedDate = new Date().toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 1: HEADER
  // ═══════════════════════════════════════════════════════════════════

  // Top gradient bar
  doc.setFillColor(...COLORS.primary)
  doc.rect(0, 0, PAGE_WIDTH, 58, 'F')

  // Secondary gradient overlay
  doc.setFillColor(...COLORS.accent)
  doc.rect(0, 52, PAGE_WIDTH, 6, 'F')

  // Logo text
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.text('KELAJAK MARKAZI', MARGIN_LEFT, 16)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(200, 210, 240)
  doc.text("O'quvchi Portfolio Hujjati", MARGIN_LEFT, 22)

  // Portfolio title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.setTextColor(255, 255, 255)
  doc.text("O'QUVCHI PORTFOLIOSI", MARGIN_LEFT, 40)

  // Date and ID on right
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(200, 210, 240)
  doc.text(`Portfolio ID: ${portfolioId}`, PAGE_WIDTH - MARGIN_RIGHT, 16, { align: 'right' })
  doc.text(`Yaratilgan: ${generatedDate}`, PAGE_WIDTH - MARGIN_RIGHT, 22, { align: 'right' })

  // ═══════════════════════════════════════════════════════════════════
  // STUDENT INFO CARD
  // ═══════════════════════════════════════════════════════════════════
  let y = 68

  // Card background
  doc.setFillColor(...COLORS.bg)
  doc.setDrawColor(...COLORS.border)
  doc.setLineWidth(0.5)
  doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, 42, 3, 3, 'FD')

  // Avatar circle
  const avatarX = MARGIN_LEFT + 22
  const avatarY = y + 21
  doc.setFillColor(...COLORS.primary)
  doc.circle(avatarX, avatarY, 14, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(255, 255, 255)
  doc.text(data.initials, avatarX, avatarY + 5, { align: 'center' })

  // Student details
  const detailsX = MARGIN_LEFT + 44
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...COLORS.dark)
  doc.text(data.name, detailsX, y + 14)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.medium)

  const infoLine1 = `${data.grade}  •  ${data.school}`
  const infoLine2 = `${data.region}  •  ID: ${studentId}`
  doc.text(infoLine1, detailsX, y + 23)
  doc.text(infoLine2, detailsX, y + 31)

  // Majors badge on right
  if (data.major1 || data.major2) {
    const majorsText = [data.major1, data.major2].filter(Boolean).join(' + ')
    const badgeX = PAGE_WIDTH - MARGIN_RIGHT - 5
    doc.setFillColor(...COLORS.primaryLight)
    const textW = doc.getTextWidth(majorsText) + 8
    doc.roundedRect(badgeX - textW, y + 8, textW + 2, 8, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(255, 255, 255)
    doc.text(majorsText, badgeX - textW + 5, y + 14)
  }

  y += 52

  // ═══════════════════════════════════════════════════════════════════
  // ACADEMIC SUMMARY
  // ═══════════════════════════════════════════════════════════════════
  y = drawSectionHeader(doc, "AKADEMIK KO'RSATKICHLAR", y)

  // Three stat boxes
  const boxWidth = (CONTENT_WIDTH - 10) / 3
  const stats = [
    { label: 'GPA', value: `${data.gpa} / ${data.gpaMax}`, color: COLORS.primary },
    { label: 'IELTS', value: `${data.ielts.current} → ${data.ielts.target}`, color: COLORS.accent },
    { label: 'SAT', value: `${data.sat.current} → ${data.sat.target}`, color: COLORS.success },
  ]

  stats.forEach((stat, i) => {
    const boxX = MARGIN_LEFT + i * (boxWidth + 5)
    doc.setFillColor(...COLORS.bg)
    doc.setDrawColor(...COLORS.border)
    doc.roundedRect(boxX, y, boxWidth, 28, 2, 2, 'FD')

    // Colored top accent
    doc.setFillColor(...stat.color)
    doc.roundedRect(boxX, y, boxWidth, 3, 2, 2, 'F')
    doc.rect(boxX, y + 1.5, boxWidth, 1.5, 'F') // clean bottom edge

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...stat.color)
    doc.text(stat.label, boxX + boxWidth / 2, y + 12, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...COLORS.dark)
    doc.text(stat.value, boxX + boxWidth / 2, y + 22, { align: 'center' })
  })

  y += 36

  // ═══════════════════════════════════════════════════════════════════
  // OLYMPIADS
  // ═══════════════════════════════════════════════════════════════════
  if (data.olympiads.length > 0) {
    y = checkPageBreak(doc, y, 20 + data.olympiads.length * 10)
    y = drawSectionHeader(doc, 'OLIMPIADALAR VA MUSOBAQALAR', y)

    autoTable(doc, {
      startY: y,
      head: [['Musobaqa nomi', 'Natija', 'Yil']],
      body: data.olympiads.map(o => [o.title, o.place, o.year.toString()]),
      margin: { left: MARGIN_LEFT, right: MARGIN_RIGHT },
      styles: {
        fontSize: 9,
        cellPadding: 4,
        textColor: COLORS.dark,
        lineColor: COLORS.border,
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: COLORS.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      theme: 'grid',
    })

    y = (doc as any).lastAutoTable.finalY + 8
  }

  // ═══════════════════════════════════════════════════════════════════
  // CLUBS & LEADERSHIP
  // ═══════════════════════════════════════════════════════════════════
  if (data.clubs.length > 0) {
    y = checkPageBreak(doc, y, 20 + data.clubs.length * 10)
    y = drawSectionHeader(doc, "TO'GARAKLAR VA YETAKCHILIK", y)

    autoTable(doc, {
      startY: y,
      head: [["To'garak nomi", 'Lavozimi', 'Sessiyalar']],
      body: data.clubs.map(c => [c.name, c.role, c.sessions.toString()]),
      margin: { left: MARGIN_LEFT, right: MARGIN_RIGHT },
      styles: {
        fontSize: 9,
        cellPadding: 4,
        textColor: COLORS.dark,
        lineColor: COLORS.border,
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: COLORS.accent,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      theme: 'grid',
    })

    y = (doc as any).lastAutoTable.finalY + 8
  }

  // ═══════════════════════════════════════════════════════════════════
  // ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════════════
  if (data.achievements.length > 0) {
    y = checkPageBreak(doc, y, 20 + data.achievements.length * 12)
    y = drawSectionHeader(doc, 'YUTUQLAR VA MUKOFOTLAR', y)

    data.achievements.forEach((ach) => {
      y = checkPageBreak(doc, y, 16)

      // Achievement pill
      doc.setFillColor(...COLORS.bg)
      doc.setDrawColor(...COLORS.border)
      doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, 14, 2, 2, 'FD')

      // Gold star indicator
      doc.setFillColor(...COLORS.gold)
      doc.circle(MARGIN_LEFT + 8, y + 7, 3, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(255, 255, 255)
      doc.text('★', MARGIN_LEFT + 8, y + 9.2, { align: 'center' })

      // Achievement text
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...COLORS.dark)
      doc.text(ach.name, MARGIN_LEFT + 16, y + 6)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.medium)
      doc.text(ach.desc, MARGIN_LEFT + 16, y + 12)

      y += 18
    })
  }

  // ═══════════════════════════════════════════════════════════════════
  // TEACHER FEEDBACK
  // ═══════════════════════════════════════════════════════════════════
  if (data.teacherFeedback.quote) {
    y = checkPageBreak(doc, y, 50)
    y = drawSectionHeader(doc, "O'QITUVCHI TAVSIFNOMASI", y)

    // Quote card
    doc.setFillColor(239, 246, 255) // blue-50
    doc.setDrawColor(...COLORS.primaryLight)
    doc.setLineWidth(0.5)
    doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, 36, 3, 3, 'FD')

    // Left accent bar
    doc.setFillColor(...COLORS.primaryLight)
    doc.roundedRect(MARGIN_LEFT, y, 3, 36, 1.5, 1.5, 'F')

    // Quote mark
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(24)
    doc.setTextColor(...COLORS.primaryLight)
    doc.text('"', MARGIN_LEFT + 10, y + 14)

    // Quote text
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.dark)
    const quoteLines = doc.splitTextToSize(data.teacherFeedback.quote, CONTENT_WIDTH - 22)
    doc.text(quoteLines, MARGIN_LEFT + 18, y + 12)

    // Teacher attribution
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.primary)
    doc.text(
      `— ${data.teacherFeedback.teacher}, ${data.teacherFeedback.subject}`,
      MARGIN_LEFT + 18,
      y + 30
    )

    y += 44
  }

  // ═══════════════════════════════════════════════════════════════════
  // BIOGRAPHY / PERSONAL STATEMENT
  // ═══════════════════════════════════════════════════════════════════
  if (data.bio && data.bio.trim().length > 0) {
    y = checkPageBreak(doc, y, 40)
    y = drawSectionHeader(doc, 'SHAXSIY BAYONOT', y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.dark)
    const bioLines = doc.splitTextToSize(data.bio, CONTENT_WIDTH - 4)
    doc.text(bioLines, MARGIN_LEFT + 2, y + 4)
    y += bioLines.length * 5 + 10
  }

  // ═══════════════════════════════════════════════════════════════════
  // SKILLS (derived from clubs and olympiads)
  // ═══════════════════════════════════════════════════════════════════
  const skills: string[] = []
  data.clubs.forEach(c => {
    if (!skills.includes(c.name)) skills.push(c.name)
  })
  if (data.olympiads.length > 0) skills.push("Olimpiada ishtirokchisi")
  if (data.ielts.current >= 6.5) skills.push("Ingliz tili (IELTS " + data.ielts.current + ")")
  if (data.major1) skills.push(data.major1)
  if (data.major2) skills.push(data.major2)
  skills.push("Jamoaviy ishlash")
  skills.push("Yetakchilik")

  if (skills.length > 0) {
    y = checkPageBreak(doc, y, 30)
    y = drawSectionHeader(doc, "KO'NIKMALAR", y)

    let skillX = MARGIN_LEFT
    let skillY = y
    const skillHeight = 8
    const skillPadding = 6

    skills.forEach((skill) => {
      const textWidth = doc.getTextWidth(skill) + skillPadding * 2
      if (skillX + textWidth > PAGE_WIDTH - MARGIN_RIGHT) {
        skillX = MARGIN_LEFT
        skillY += skillHeight + 4
      }
      skillY = checkPageBreak(doc, skillY, skillHeight + 4)

      doc.setFillColor(...COLORS.primary)
      doc.roundedRect(skillX, skillY, textWidth, skillHeight, 2, 2, 'F')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(255, 255, 255)
      doc.text(skill, skillX + skillPadding, skillY + 5.5)

      skillX += textWidth + 4
    })

    y = skillY + skillHeight + 10
  }

  // ═══════════════════════════════════════════════════════════════════
  // CAREER GOALS
  // ═══════════════════════════════════════════════════════════════════
  if (data.major1 || data.major2) {
    y = checkPageBreak(doc, y, 30)
    y = drawSectionHeader(doc, 'KELAJAK MAQSADLARI', y)

    doc.setFillColor(...COLORS.bg)
    doc.setDrawColor(...COLORS.border)
    doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, 20, 2, 2, 'FD')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.dark)

    const goalText = `${data.name} ${[data.major1, data.major2].filter(Boolean).join(' va ')} yo'nalishlarida oliy ta'lim olishni va kelajakda ushbu sohalarda professional mutaxassis bo'lishni maqsad qiladi.`
    const goalLines = doc.splitTextToSize(goalText, CONTENT_WIDTH - 10)
    doc.text(goalLines, MARGIN_LEFT + 5, y + 8)

    y += 28
  }

  // ═══════════════════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════════════════
  const addFooter = (pageDoc: jsPDF) => {
    const totalPages = pageDoc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pageDoc.setPage(i)

      // Footer bar
      pageDoc.setFillColor(...COLORS.dark)
      pageDoc.rect(0, PAGE_HEIGHT - 18, PAGE_WIDTH, 18, 'F')

      // Footer text left
      pageDoc.setFont('helvetica', 'normal')
      pageDoc.setFontSize(7)
      pageDoc.setTextColor(200, 200, 210)
      pageDoc.text(`Kelajak Markazi Platformasi  •  Portfolio ID: ${portfolioId}`, MARGIN_LEFT, PAGE_HEIGHT - 8)

      // Footer text right
      pageDoc.text(
        `Sahifa ${i} / ${totalPages}  •  ${generatedDate}`,
        PAGE_WIDTH - MARGIN_RIGHT,
        PAGE_HEIGHT - 8,
        { align: 'right' }
      )
    }
  }

  addFooter(doc)

  // Save the PDF
  const safeName = data.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
  doc.save(`Student_Portfolio_${safeName}.pdf`)
}
