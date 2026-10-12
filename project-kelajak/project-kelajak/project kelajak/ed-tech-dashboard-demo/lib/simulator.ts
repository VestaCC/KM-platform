// lib/simulator.ts
// Computed script module for the 189.0 Maximum Point Admission Simulator

export interface SimulatorInput {
  gpa: number
  ielts: number
  sat: number
  major1: string
  major2: string
  verifiedCerts: string[] // list of verified subjects or exams: e.g. ["Mathematics", "IELTS", "Physics"]
  verifiedCertsDetails?: any[]
}

export interface SimulatorResult {
  commonScore: number
  major1Score: number
  major2Score: number
  totalScore: number
  isMajor1Locked: boolean
  isMajor2Locked: boolean
  activeCertCodes?: string[]
}

/**
 * Normalizes subject names to resolve apostrophe, backtick, backslash, and translation mismatches.
 */
function normalizeSubjectString(str: string): string {
  if (!str) return ''
  let normalized = str.toLowerCase().trim()
  
  // Strip backslashes if present (e.g. O\'zbekiston)
  normalized = normalized.replace(/\\/g, '')

  // Unify different apostrophe variations (curly, backtick, left/right single quotes) to a standard single quote
  normalized = normalized.replace(/[’‘`´]/g, "'")

  // Map "uzbekistan tarixi" to "o'zbekiston tarixi"
  if (normalized === 'uzbekistan tarixi') {
    normalized = "o'zbekiston tarixi"
  }

  return normalized
}

/**
 * Checks if a certificate subject matches a target major/compulsory subject.
 * Handles language toggles / translations (e.g. Matematika <=> Mathematics).
 */
export function matchSubject(certSubject: string, targetSubject: string): boolean {
  if (!certSubject || !targetSubject) return false
  const s1 = normalizeSubjectString(certSubject)
  const s2 = normalizeSubjectString(targetSubject)

  if (s1 === s2) return true

  // Mathematics mappings
  if (s1 === 'matematika' && (s2 === 'mathematics' || s2 === 'math')) return true
  if (s2 === 'matematika' && (s1 === 'mathematics' || s1 === 'math')) return true

  // Physics mappings
  if (s1 === 'fizika' && s2 === 'physics') return true
  if (s2 === 'fizika' && s1 === 'physics') return true

  // Chemistry mappings
  if (s1 === 'kimyo' && s2 === 'chemistry') return true
  if (s2 === 'kimyo' && s1 === 'chemistry') return true

  // Biology mappings
  if (s1 === 'biologiya' && s2 === 'biology') return true
  if (s2 === 'biologiya' && s1 === 'biology') return true

  // History mappings
  if (s1 === "o'zbekiston tarixi" && (s2 === 'history' || s2 === "o'zbekiston tarixi")) return true
  if (s2 === "o'zbekiston tarixi" && (s1 === 'history' || s1 === "o'zbekiston tarixi")) return true

  // Mother Tongue mappings
  if (s1 === 'ona tili va adabiyot' && (s2 === 'mother tongue' || s2 === 'native language')) return true
  if (s2 === 'ona tili va adabiyot' && (s1 === 'mother tongue' || s1 === 'native language')) return true

  // Foreign Language mappings
  if ((s1 === 'ingliz tili' || s1 === 'ielts') && (s2 === 'foreign language' || s2 === 'english' || s2 === 'ingliz tili')) return true
  if ((s2 === 'ingliz tili' || s2 === 'ielts') && (s1 === 'foreign language' || s1 === 'english' || s1 === 'ingliz tili')) return true

  if (s1 === 'rus tili' && (s2 === 'foreign language' || s2 === 'russian')) return true
  if (s2 === 'rus tili' && (s1 === 'foreign language' || s1 === 'russian')) return true

  return false
}

/**
 * Normalizes score to a raw percentage float (0.0 to 1.0)
 */
export function getPercentageFromCert(cert: any): number {
  if (!cert) return 0.0
  if (typeof cert.engine_percentage === 'number') {
    return cert.engine_percentage / 100.0
  }
  if (typeof cert.percentage === 'number') {
    return cert.percentage
  }

  const scoreStr = String(cert.score || '')
  if (scoreStr.includes('%')) {
    const parsed = parseFloat(scoreStr.replace('%', ''))
    if (!isNaN(parsed)) return parsed / 100
  }

  const isIELTS = cert.provider === 'IELTS' || cert.provider === 'IELTS Academic'
  const isSAT = cert.provider === 'SAT'

  if (isIELTS) {
    const cleanScore = scoreStr.replace(/[^\d.]/g, '')
    const band = parseFloat(cleanScore)
    if (!isNaN(band)) {
      if (band >= 9.0) return 1.0
      if (band >= 8.5) return 0.95
      if (band >= 8.0) return 0.90
      if (band >= 7.5) return 0.85
      if (band >= 7.0) return 0.80
      if (band >= 6.5) return 0.75
      if (band >= 6.0) return 0.70
      if (band >= 5.5) return 0.65
      if (band >= 5.0) return 0.60
      if (band >= 4.5) return 0.50
      if (band >= 4.0) return 0.40
      return band / 9.0
    }
  }

  if (isSAT) {
    const cleanScore = scoreStr.replace(/[^\d.]/g, '')
    const sat = parseFloat(cleanScore)
    if (!isNaN(sat)) {
      return Math.min(1.0, Math.max(0.0, (sat - 400) / 1200))
    }
  }

  // Fallback level-based scoring
  const lvl = String(cert.level || '').toUpperCase()
  if (lvl === 'A+' || lvl === 'C1') return 1.0
  if (lvl === 'A' || lvl === 'B2') return 0.85
  if (lvl === 'B+' || lvl === 'B1') return 0.75
  if (lvl === 'B') return 0.65
  if (lvl === 'C+') return 0.55
  if (lvl === 'C') return 0.46

  // Fallback standard parsing
  const rawNum = parseFloat(scoreStr.replace(/[^\d.]/g, ''))
  if (!isNaN(rawNum)) {
    if (rawNum > 100) return Math.min(1.0, (rawNum - 400) / 1200)
    return Math.min(1.0, rawNum / 100)
  }

  return 0.0
}

/**
 * Calculates the score out of the 189.0 threshold used in Uzbekistan state universities.
 * - 3 Compulsory blocks: Matematika, Ona tili va adabiyot, O'zbekiston tarixi: up to 33.0 points (11.0 each).
 *   Locks to 11.0 if verified certificate is found and evaluated grade is >= C / B1.
 * - Primary Selected Major (Major 1): up to 93.0 max. Calculated as percentage * 93.0. Defaults to 0.0 if not verified.
 * - Secondary Selected Major (Major 2): up to 63.0 max. Calculated as percentage * 63.0. Defaults to 0.0 if not verified.
 */
/**
 * Resolves a subject or exam provider to a single canonical subject category.
 * This ensures cross-provider overrides function correctly (e.g. English CEFR vs IELTS).
 */
export function getCanonicalSubject(subject: string, provider?: string): string {
  const normalized = (subject || '').toLowerCase().trim().replace(/\\/g, '').replace(/[’‘`´]/g, "'")
  const prov = (provider || '').toUpperCase().trim()
  
  // 1. Mathematics Slot
  if (
    normalized === 'matematika' || 
    normalized === 'mathematics' || 
    normalized === 'math' || 
    prov === 'SAT' || 
    normalized === 'sat'
  ) {
    return 'mathematics'
  }

  // 2. Foreign Language Slot
  if (
    normalized === 'ingliz tili' || 
    normalized === 'english' || 
    normalized === 'rus tili' || 
    normalized === 'russian' || 
    normalized === 'foreign language' || 
    normalized === 'chet tili' || 
    prov === 'IELTS' || 
    prov === 'IELTS ACADEMIC' || 
    normalized === 'ielts'
  ) {
    return 'foreign_language'
  }

  // 3. Mother Tongue Slot
  if (
    normalized === 'ona tili va adabiyot' || 
    normalized === 'ona tili' || 
    normalized === 'mother tongue' || 
    normalized === 'native language'
  ) {
    return 'mother_tongue'
  }

  // 4. History Slot
  if (
    normalized === "o'zbekiston tarixi" || 
    normalized === 'uzbekistan tarixi' || 
    normalized === 'history' || 
    normalized === 'tarix'
  ) {
    return 'history'
  }

  // 5. Physics Slot
  if (normalized === 'fizika' || normalized === 'physics') {
    return 'physics'
  }

  // 6. Chemistry Slot
  if (normalized === 'kimyo' || normalized === 'chemistry') {
    return 'chemistry'
  }

  // 7. Biology Slot
  if (normalized === 'biologiya' || normalized === 'biology') {
    return 'biology'
  }

  return normalized
}

/**
 * Calculates the score out of the 189.0 threshold used in Uzbekistan state universities.
 * - 3 Compulsory blocks: Matematika, Ona tili va adabiyot, O'zbekiston tarixi: up to 33.0 points (11.0 each).
 *   Locks to 11.0 if verified certificate is found and evaluated grade is >= C / B1.
 * - Primary Selected Major (Major 1): up to 93.0 max. Calculated as percentage * 93.0. Defaults to 0.0 if not verified.
 * - Secondary Selected Major (Major 2): up to 63.0 max. Calculated as percentage * 63.0. Defaults to 0.0 if not verified.
 */
export function calculate189Score(input: SimulatorInput): SimulatorResult {
  const verifiedCertsDetails = input.verifiedCertsDetails || []

  // Group certificates by canonical subject slot, selecting the highest percentage score
  const bestCertsMap: Record<string, any> = {}
  verifiedCertsDetails.forEach((cert) => {
    const canonicalSubj = getCanonicalSubject(cert.subject, cert.provider)
    const pct = getPercentageFromCert(cert)
    
    if (!bestCertsMap[canonicalSubj] || getPercentageFromCert(bestCertsMap[canonicalSubj]) < pct) {
      bestCertsMap[canonicalSubj] = cert
    }
  })
  const activeCerts = Object.values(bestCertsMap)
  const activeCertCodes = activeCerts.map((c) => c.code).filter(Boolean)

  // 1. Majburiy Blok (Max 33.0 Points)
  const compulsorySubjects = ['Matematika', 'Ona tili va adabiyot', "O'zbekiston tarixi"]
  const PASS_GRADES = ['C', 'C+', 'B', 'B+', 'A', 'A+', 'B1', 'B2', 'C1']
  let commonScore = 0

  compulsorySubjects.forEach((compSubj) => {
    // Check if there is a verified certificate that matches this compulsory subject
    const cert = activeCerts.find((c) => {
      // Compulsory Math can match Matematika certificate or SAT
      if (compSubj === 'Matematika') {
        return matchSubject(c.subject, 'Matematika') || c.provider === 'SAT'
      }
      return matchSubject(c.subject, compSubj)
    })

    if (cert && PASS_GRADES.includes(String(cert.level).toUpperCase())) {
      commonScore += 11.0
    }
  })

  // 2. Primary Selected Major (Major 1)
  const major1Cert = activeCerts.find((c) => {
    // Major 1 could be matched with its subject (e.g. Mathematics or Matematika)
    // or if the major is Mathematics and provider is SAT
    if (input.major1 === 'Mathematics') {
      return matchSubject(c.subject, 'Mathematics') || c.provider === 'SAT'
    }
    return matchSubject(c.subject, input.major1)
  })

  let major1Score = 0
  let isMajor1Locked = false
  if (major1Cert) {
    isMajor1Locked = true
    const pct = getPercentageFromCert(major1Cert)
    major1Score = Math.min(93.0, Math.round((pct * 93.0) * 10) / 10)
  }

  // 3. Secondary Selected Major (Major 2)
  const major2Cert = activeCerts.find((c) => {
    if (input.major2 === 'Foreign Language') {
      return matchSubject(c.subject, 'Ingliz tili') || matchSubject(c.subject, 'Rus tili') || c.provider === 'IELTS' || c.provider === 'IELTS Academic'
    }
    return matchSubject(c.subject, input.major2)
  })

  let major2Score = 0
  let isMajor2Locked = false
  if (major2Cert) {
    isMajor2Locked = true
    const pct = getPercentageFromCert(major2Cert)
    major2Score = Math.min(63.0, Math.round((pct * 63.0) * 10) / 10)
  }

  const totalScore = Math.min(189.0, Math.max(0, parseFloat((commonScore + major1Score + major2Score).toFixed(1))))

  return {
    commonScore,
    major1Score,
    major2Score,
    totalScore,
    isMajor1Locked,
    isMajor2Locked,
    activeCertCodes,
  }
}

/**
 * Utility to extract the highest IELTS score comparing baseline score and verified certificates.
 */
export function getHighestIelts(baseIelts: number, certsDetails: any[]): number {
  let highest = baseIelts || 0
  if (certsDetails && Array.isArray(certsDetails)) {
    certsDetails.forEach((cert) => {
      const isIelts = cert.provider === 'IELTS' || cert.provider === 'IELTS Academic'
      if (isIelts) {
        let val = 0
        if (typeof cert.scoreValue === 'number') {
          val = cert.scoreValue
        } else {
          const scoreStr = String(cert.score || '')
          const cleanScore = scoreStr.replace(/[^\d.]/g, '')
          val = parseFloat(cleanScore) || 0
        }
        if (val > highest) {
          highest = val
        }
      }
    })
  }
  return highest
}

/**
 * Utility to extract the highest SAT score comparing baseline score and verified certificates.
 */
export function getHighestSat(baseSat: number, certsDetails: any[]): number {
  let highest = baseSat || 0
  if (certsDetails && Array.isArray(certsDetails)) {
    certsDetails.forEach((cert) => {
      const isSat = cert.provider === 'SAT'
      if (isSat) {
        let val = 0
        if (typeof cert.scoreValue === 'number') {
          val = cert.scoreValue
        } else {
          const scoreStr = String(cert.score || '')
          const cleanScore = scoreStr.replace(/[^\d.]/g, '')
          val = parseFloat(cleanScore) || 0
        }
        if (val > highest) {
          highest = val
        }
      }
    })
  }
  return highest
}

/**
 * Evaluates a certificate score against the dual-category UzBMB grading scale.
 */
export function evaluateCertificate(
  provider: string,
  subject: string,
  score: number
): { rawBall: number; engine_percentage: number; gradeBadge: string } {
  const isLanguage =
    subject === 'Ingliz tili' ||
    subject === 'Rus tili' ||
    subject === 'English' ||
    subject === 'Russian' ||
    provider === 'IELTS' ||
    provider === 'IELTS Academic'

  let rawBall = score
  let engine_percentage = 0.0
  let gradeBadge = 'Fails'

  if (isLanguage) {
    // CATEGORY 1: Language Subjects
    if (provider === 'IELTS' || provider === 'IELTS Academic') {
      if (score >= 7.0) {
        rawBall = 65 // C1 equivalent
      } else if (score >= 5.5) {
        rawBall = 51 // B2 equivalent
      } else if (score >= 5.0) {
        rawBall = 38 // B1 equivalent
      } else {
        rawBall = 30 // Fail
      }
    }

    if (rawBall >= 51) {
      engine_percentage = 100.0
      gradeBadge = rawBall >= 65 ? 'C1' : 'B2'
    } else if (rawBall >= 38 && rawBall <= 50) {
      engine_percentage = 75.0
      gradeBadge = 'B1'
    } else {
      engine_percentage = 0.0
      gradeBadge = 'Fails'
    }
  } else {
    // CATEGORY 2: Science & Content Subjects
    if (provider === 'SAT') {
      if (score >= 1400) {
        rawBall = 70.0 // A+ equivalent
      } else if (score >= 1200) {
        rawBall = 65.0 // A equivalent
      } else if (score >= 1100) {
        rawBall = 61.0 // B+ equivalent
      } else if (score >= 1000) {
        rawBall = 56.0 // B equivalent
      } else if (score >= 900) {
        rawBall = 51.0 // C+ equivalent
      } else if (score >= 800) {
        rawBall = 47.0 // C equivalent
      } else {
        rawBall = 40.0 // Fail
      }
    }

    if (rawBall >= 65.0) {
      engine_percentage = 100.0
      gradeBadge = rawBall >= 70.0 ? 'A+' : 'A'
    } else if (rawBall >= 46.0 && rawBall < 65.0) {
      engine_percentage = parseFloat(((rawBall * 100) / 65.0).toFixed(2))
      if (rawBall >= 60.0) {
        gradeBadge = 'B+'
      } else if (rawBall >= 55.0) {
        gradeBadge = 'B'
      } else if (rawBall >= 50.0) {
        gradeBadge = 'C+'
      } else {
        gradeBadge = 'C'
      }
    } else {
      engine_percentage = 0.0
      gradeBadge = 'Fails'
    }
  }

  return { rawBall, engine_percentage, gradeBadge }
}


