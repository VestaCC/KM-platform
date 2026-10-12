// lib/stats.ts
// Centralised statistical calculation utilities.
// All functions guard against NaN / Infinity / null — always return a number.

/**
 * EC Participation Rate
 * = (students with ≥1 out-of-school activity / total registered students) × 100
 * Returns 0 when total is 0 or negative to prevent divide-by-zero errors.
 */
export function calcParticipationRate(studentsWithActivity: number, totalStudents: number): number {
  if (!isFinite(totalStudents) || totalStudents <= 0) return 0
  if (!isFinite(studentsWithActivity) || studentsWithActivity < 0) return 0
  const rate = (studentsWithActivity / totalStudents) * 100
  return Math.min(100, Math.max(0, Math.round(rate * 10) / 10)) // clamp 0–100, 1dp
}

/**
 * Derive participation count from an ecHoursRatio percentage and total students.
 * ecHoursRatio represents the % of students with ≥1 activity (0–100).
 */
export function activeStudentsFromRatio(ecHoursRatio: number, totalStudents: number): number {
  if (!isFinite(ecHoursRatio) || !isFinite(totalStudents)) return 0
  return Math.round((Math.min(100, Math.max(0, ecHoursRatio)) / 100) * totalStudents)
}

/**
 * Average participation rate across an array of schools.
 * Weights by student population so large schools don't equal tiny ones.
 */
export function weightedAvgParticipationRate(
  schools: Array<{ ecHoursRatio: number; totalStudents: number }>
): number {
  const totalPop = schools.reduce((s, sc) => s + (sc.totalStudents || 0), 0)
  if (totalPop <= 0) return 0
  const weightedSum = schools.reduce((s, sc) => {
    const active = activeStudentsFromRatio(sc.ecHoursRatio, sc.totalStudents)
    return s + active
  }, 0)
  return calcParticipationRate(weightedSum, totalPop)
}

/** Participation rate label category */
export function participationLabel(rate: number): 'high' | 'medium' | 'low' {
  if (rate >= 70) return 'high'
  if (rate >= 40) return 'medium'
  return 'low'
}

/** Tailwind colour class for a participation rate tier */
export function participationColor(rate: number): string {
  if (rate >= 70) return 'text-emerald-600'
  if (rate >= 40) return 'text-amber-500'
  return 'text-red-500'
}

export function participationBgColor(rate: number): string {
  if (rate >= 70) return 'bg-emerald-600'
  if (rate >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

export interface StatisticalStudent {
  grade: string
  clubs: number
  achievementsByEC?: Record<string, number>
}

/**
 * Filter utility to identify students in the active 5-year cohort (Grades 7–11)
 * who possess exactly 0 entries in their verified extracurricular collections.
 */
export function getInactiveStudents<T extends StatisticalStudent>(students: T[]): T[] {
  if (!students || students.length === 0) return []
  return students.filter(student => {
    const gradeNum = parseInt(student.grade)
    const isActiveCohort = isFinite(gradeNum) && gradeNum >= 7 && gradeNum <= 11
    if (!isActiveCohort) return false

    const hasClubs = (student.clubs || 0) > 0
    const hasAchievements = student.achievementsByEC && Object.keys(student.achievementsByEC).length > 0
    return !hasClubs && !hasAchievements
  })
}

/**
 * Compute the idle percentage using the total registered student pool as the denominator.
 * Handles empty lists safely by returning 0%.
 */
export function calcIdlePercentage<T extends StatisticalStudent>(
  students: T[],
  totalPoolCount: number
): number {
  if (!isFinite(totalPoolCount) || totalPoolCount <= 0) return 0
  const inactiveCount = getInactiveStudents(students).length
  const rate = (inactiveCount / totalPoolCount) * 100
  return Math.min(100, Math.max(0, Math.round(rate * 10) / 10))
}

