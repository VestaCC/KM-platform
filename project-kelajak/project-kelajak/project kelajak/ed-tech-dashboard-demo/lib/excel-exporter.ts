import * as XLSX from 'xlsx'

export interface ExportStudentData {
  name: string
  grade: string
  school: string
  region: string
  gpa: number
  sat: number
  ielts: number
  major1?: string
  major1Score?: number | string
  major2?: string
  major2Score?: number | string
  clubs?: number
  olympiads?: number
  attendance?: number
  counselor?: string
  familyStatus?: string
  healthStatus?: string
  financialStanding?: string
  isAtRisk?: boolean
}

export interface ExportOverviewStats {
  totalStudents: number
  totalCounselors: number
  totalSchools: number
  totalDistricts: number
  avgGpa: number
  avgSat: number
  avgIelts: number
}

export interface ExcelExportData {
  students: ExportStudentData[]
  overview: ExportOverviewStats
}

function createOverviewSheet(overview: ExportOverviewStats): XLSX.WorkSheet {
  const data = [
    ['KELAJAK MARKAZI - UMUMIY STATISTIKA'],
    [],
    ["Ko'rsatkich", 'Qiymat'],
    ["Jami o'quvchilar", overview.totalStudents],
    ['Jami maslahatchilar', overview.totalCounselors],
    ['Maktablar soni', overview.totalSchools],
    ['Tumanlar soni', overview.totalDistricts],
    ["O'rtacha GPA", overview.avgGpa.toFixed(2)],
    ["O'rtacha SAT", Math.round(overview.avgSat)],
    ["O'rtacha IELTS", overview.avgIelts.toFixed(1)],
    [],
    ["Hisobot sanasi", new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })],
  ]

  const ws = XLSX.utils.aoa_to_sheet(data)

  // Column widths
  ws['!cols'] = [{ wch: 25 }, { wch: 18 }]

  // Merge title row
  ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }]

  return ws
}

function createStudentDirectorySheet(students: ExportStudentData[]): XLSX.WorkSheet {
  const headers = [
    'Ism',
    'Sinf',
    'Maktab',
    'Viloyat',
    'GPA',
    'SAT',
    'IELTS',
    "1-yo'nalish",
    "1-yo'nalish bali",
    "2-yo'nalish",
    "2-yo'nalish bali",
  ]

  if (students.length === 0) {
    const ws = XLSX.utils.aoa_to_sheet([headers, ["Ma'lumot mavjud emas"]])
    ws['!cols'] = headers.map(() => ({ wch: 18 }))
    return ws
  }

  const rows = students.map((s) => [
    s.name,
    s.grade,
    s.school,
    s.region,
    s.gpa,
    s.sat,
    s.ielts,
    s.major1 || '—',
    s.major1Score ?? '—',
    s.major2 || '—',
    s.major2Score ?? '—',
  ])

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
  ws['!cols'] = [
    { wch: 24 }, // Name
    { wch: 10 }, // Grade
    { wch: 28 }, // School
    { wch: 14 }, // Region
    { wch: 8 },  // GPA
    { wch: 8 },  // SAT
    { wch: 8 },  // IELTS
    { wch: 20 }, // Major 1
    { wch: 14 }, // Major 1 Score
    { wch: 20 }, // Major 2
    { wch: 14 }, // Major 2 Score
  ]

  return ws
}

function createAcademicPerformanceSheet(students: ExportStudentData[]): XLSX.WorkSheet {
  const headers = [
    "O'quvchi ismi",
    'GPA',
    'SAT',
    'IELTS',
    'Olimpiadalar soni',
    "To'garaklar soni",
  ]

  if (students.length === 0) {
    const ws = XLSX.utils.aoa_to_sheet([headers, ["Ma'lumot mavjud emas"]])
    ws['!cols'] = headers.map(() => ({ wch: 18 }))
    return ws
  }

  const rows = students.map((s) => [
    s.name,
    s.gpa,
    s.sat,
    s.ielts,
    s.olympiads ?? 0,
    s.clubs ?? 0,
  ])

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
  ws['!cols'] = [
    { wch: 24 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 18 },
    { wch: 18 },
  ]

  return ws
}

function createAtRiskSheet(students: ExportStudentData[]): XLSX.WorkSheet {
  const headers = [
    'Ism',
    'Sinf',
    'Maktab',
    'GPA',
    'Davomat (%)',
    'Maslahatchi',
  ]

  // Filter at-risk students: either marked as at-risk, low GPA, or 0 clubs
  const atRisk = students.filter(
    (s) => s.isAtRisk || s.gpa < 3.0 || (s.clubs !== undefined && s.clubs === 0)
  )

  if (atRisk.length === 0) {
    const ws = XLSX.utils.aoa_to_sheet([
      headers,
      ["E'tibor talab etadigan o'quvchilar topilmadi"],
    ])
    ws['!cols'] = headers.map(() => ({ wch: 18 }))
    return ws
  }

  const rows = atRisk.map((s) => [
    s.name,
    s.grade,
    s.school,
    s.gpa,
    s.attendance ?? '—',
    s.counselor ?? 'Biriktirilmagan',
  ])

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
  ws['!cols'] = [
    { wch: 24 },
    { wch: 10 },
    { wch: 28 },
    { wch: 8 },
    { wch: 14 },
    { wch: 20 },
  ]

  return ws
}

export function generateExcelExport(data: ExcelExportData): void {
  const wb = XLSX.utils.book_new()

  // Sheet 1: Overview
  const overviewSheet = createOverviewSheet(data.overview)
  XLSX.utils.book_append_sheet(wb, overviewSheet, 'Umumiy')

  // Sheet 2: Student Directory
  const directorySheet = createStudentDirectorySheet(data.students)
  XLSX.utils.book_append_sheet(wb, directorySheet, "O'quvchilar ro'yxati")

  // Sheet 3: Academic Performance
  const academicSheet = createAcademicPerformanceSheet(data.students)
  XLSX.utils.book_append_sheet(wb, academicSheet, "Akademik ko'rsatkichlar")

  // Sheet 4: Students Requiring Attention
  const atRiskSheet = createAtRiskSheet(data.students)
  XLSX.utils.book_append_sheet(wb, atRiskSheet, "E'tibor talab etuvchilar")

  // Generate and download
  const year = new Date().getFullYear()
  XLSX.writeFile(wb, `Student_Statistics_${year}.xlsx`)
}
