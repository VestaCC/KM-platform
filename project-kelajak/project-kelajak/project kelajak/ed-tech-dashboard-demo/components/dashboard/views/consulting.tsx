'use client'

import { useState, useEffect } from 'react'
import {
  Sparkles,
  CheckCircle2,
  Circle,
  FileText,
  BookOpen,
  ListChecks,
  GraduationCap,
  Download,
  Loader2,
  UserPlus,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { guides } from '@/lib/mock-data'
import { useLanguage } from '@/lib/language-context'

interface RoadmapItem {
  title: string
  done: boolean
  description?: string
  timeline?: string
  impact?: string
}

interface RoadmapStage {
  id: number
  grade: string
  status: 'done' | 'active' | 'upcoming'
  items: RoadmapItem[]
}

interface ConsultingViewProps {
  student?: {
    name: string
    major: string
    gpa: number
    sat: number
    ielts: number
    grade?: string
    major1?: string
    major2?: string
    verifiedCerts?: string[]
  }
}

function generateRoadmapForStudent(
  student: any,
  lang: 'uz' | 'en'
): RoadmapStage[] {
  const major1 = student?.major1 || 'Mathematics'
  const major2 = student?.major2 || 'Physics'
  const currentGrade = student?.grade || '11-sinf'
  const verifiedCerts = student?.verifiedCerts || []
  const ielts = student?.ielts || 6.5
  const sat = student?.sat || 1380

  const gradesOrder = ['7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf']
  const currIdx = gradesOrder.indexOf(currentGrade)

  // Expiration rules
  const willIeltsExpire = verifiedCerts.includes('IELTS') && currIdx <= 2 // 7, 8, 9
  const willSatExpire = verifiedCerts.includes('SAT') && currIdx <= 2 // 7, 8, 9
  const willMajor1CertExpire = verifiedCerts.includes(major1) && currIdx <= 1 // 7, 8
  const willMajor2CertExpire = verifiedCerts.includes(major2) && currIdx <= 1 // 7, 8

  const stages: RoadmapStage[] = []

  // Stage 1: 7-sinf
  {
    const grade = '7-sinf'
    const stageIdx = gradesOrder.indexOf(grade)
    const status = stageIdx < currIdx ? 'done' : (stageIdx === currIdx ? 'active' : 'upcoming')
    const items: RoadmapItem[] = [
      {
        title: lang === 'uz' ? 'Matematika va mantiqiy fikrlash asoslari' : 'Foundations of Mathematics & Logical Reasoning',
        description: lang === 'uz' 
          ? 'Maktab darslarini a\'lo baholarga o\'zlashtirish va fan to\'garaklariga a\'zo bo\'lish.' 
          : 'Master school subjects with top grades and join academic interest groups.',
        timeline: lang === 'uz' ? 'Sentyabr - May' : 'September - May',
        impact: lang === 'uz' ? 'GPA asosi' : 'GPA Baseline',
        done: status === 'done' ? true : false,
      },
      {
        title: lang === 'uz' ? 'Ingliz tili asoslarini o\'rganish (A1/A2)' : 'Learn English Basics (A1/A2)',
        description: lang === 'uz'
          ? 'Grammatika va so\'z boyligini oshirish, ingliz tilidagi sodda kitoblarni o\'qish.'
          : 'Build grammar and vocabulary foundations, read simplified books in English.',
        timeline: lang === 'uz' ? 'Yil davomida' : 'Year-round',
        impact: lang === 'uz' ? 'Tillar bazasi' : 'Language Baseline',
        done: status === 'done' ? true : false,
      },
      {
        title: lang === 'uz' ? 'Darsdan tashqari faoliyatni boshlash' : 'Initiate Extracurricular Activities',
        description: lang === 'uz'
          ? 'Sport, rasm chizish yoki musiqa kabi to\'garaklarda qatnashib, qiziqishlarni kengaytirish.'
          : 'Participate in sports, arts, or music clubs to cultivate creative/physical skills.',
        timeline: lang === 'uz' ? 'Haftada 2 marta' : '2x per week',
        impact: lang === 'uz' ? 'Shaxsiy rivojlanish' : 'Personal Growth',
        done: status === 'done' ? true : false,
      }
    ]
    stages.push({ id: 1, grade: lang === 'uz' ? '7-sinf' : '7th Grade', status, items })
  }

  // Stage 2: 8-sinf
  {
    const grade = '8-sinf'
    const stageIdx = gradesOrder.indexOf(grade)
    const status = stageIdx < currIdx ? 'done' : (stageIdx === currIdx ? 'active' : 'upcoming')
    const items: RoadmapItem[] = [
      {
        title: lang === 'uz' ? 'Fanlar bo\'yicha chuqurlashtirilgan to\'garaklar' : 'Advanced Subject Club Explorations',
        description: lang === 'uz'
          ? 'Matematika, informatika yoki tabiiy fanlardan maktab to\'garaklariga qo\'shilish.'
          : 'Join school clubs focusing on advanced math, informatics, or natural sciences.',
        timeline: lang === 'uz' ? 'Sentyabr - Dekabr' : 'September - December',
        impact: lang === 'uz' ? 'Yo\'nalish tanlash' : 'Major Identification',
        done: status === 'done' ? true : false,
      },
      {
        title: lang === 'uz' ? 'Ingliz tili darajasini B1/B2 gacha oshirish' : 'Raise English Proficiency to B1/B2',
        description: lang === 'uz'
          ? 'Akademik o\'qish va yozish ko\'nikmalarini shakllantirish.'
          : 'Develop academic reading and writing skills for standardized test preparation.',
        timeline: lang === 'uz' ? 'Fevral - Iyun' : 'February - June',
        impact: lang === 'uz' ? 'IELTS poydevori' : 'IELTS Baseline',
        done: status === 'done' ? true : false,
      },
      {
        title: lang === 'uz' ? 'Robototexnika yoki dasturlash bo\'yicha ilk qadamlar' : 'Robotics or Coding Project Kickoff',
        description: lang === 'uz'
          ? 'Python yoki Scratch darslari, ilk sodda kod loyihalarini yaratish.'
          : 'Take Python or Scratch courses, and create basic programming projects.',
        timeline: lang === 'uz' ? 'Yozgi ta\'til' : 'Summer Break',
        impact: lang === 'uz' ? 'Amaliy ko\'nikmalar' : 'Practical Skills',
        done: status === 'done' ? true : false,
      }
    ]
    stages.push({ id: 2, grade: lang === 'uz' ? '8-sinf' : '8th Grade', status, items })
  }

  // Stage 3: 9-sinf
  {
    const grade = '9-sinf'
    const stageIdx = gradesOrder.indexOf(grade)
    const status = stageIdx < currIdx ? 'done' : (stageIdx === currIdx ? 'active' : 'upcoming')
    const items: RoadmapItem[] = []

    const isM1VerifiedAndValid = verifiedCerts.includes(major1) && !willMajor1CertExpire
    items.push({
      title: lang === 'uz' 
        ? `${major1} fani bo'yicha sertifikat tayyorgarligi` 
        : `${major1} Certificate Preparation`,
      description: lang === 'uz'
        ? `Darsliklar ustida ishlash va chuqurlashtirilgan o'quv dasturlarini o'rganish.`
        : `Master core concepts and study specialized syllabus contents.`,
      timeline: lang === 'uz' ? 'Sentyabr - Fevral' : 'September - February',
      impact: isM1VerifiedAndValid 
        ? (lang === 'uz' ? '✅ DTM +93.0 ball tasdiqlangan' : '✅ DTM +93.0 Points Locked')
        : (lang === 'uz' ? 'O\'quv rejalari' : 'Study Plans'),
      done: status === 'done' ? true : isM1VerifiedAndValid,
    })

    if (verifiedCerts.includes('IELTS') && willIeltsExpire) {
      items.push({
        title: lang === 'uz' ? 'IELTS imtihonini yangilash va qayta topshirish' : 'IELTS Exam Retake & Renewal',
        description: lang === 'uz'
          ? `Joriy IELTS tasdiqlangan, lekin bitirish paytida muddati tugaydi. Amal qilish muddati 2 yil. Yangi imtihonni 10 yoki 11-sinfda rejalashtiring.`
          : `Verified IELTS is active but will expire before graduation due to the 2-year validity limit. Schedule a retake in 10th/11th grade.`,
        timeline: lang === 'uz' ? 'Rejalashtirilmoqda' : 'Planning',
        impact: lang === 'uz' ? '⚠️ Qayta topshirish talab etiladi' : '⚠️ Certificate Renewal / Retake Required',
        done: false,
      })
    } else if (verifiedCerts.includes('IELTS')) {
      items.push({
        title: lang === 'uz' ? `IELTS Sertifikati (Ball: ${ielts})` : `IELTS Certificate (Score: ${ielts})`,
        description: lang === 'uz' ? 'Muvaffaqiyatli tasdiqlandi va kirish mavsumida faol bo\'ladi.' : 'Successfully verified and active for the admissions season.',
        timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
        impact: lang === 'uz' ? '✅ DTM +63.0 ball ta\'minlandi' : '✅ DTM +63.0 Points Guaranteed',
        done: true,
      })
    } else {
      items.push({
        title: lang === 'uz' ? 'Ingliz tili darajasini oshirish (IELTS B2/C1)' : 'Advanced English & IELTS Prep (B2/C1)',
        description: lang === 'uz'
          ? 'IELTS imtihonining barcha bo\'limlari bo\'yicha amaliy testlar.'
          : 'Practice mock tests across all sections of IELTS.',
        timeline: lang === 'uz' ? 'Oktyabr - Aprel' : 'October - April',
        impact: lang === 'uz' ? 'IELTS asosi' : 'IELTS Baseline',
        done: status === 'done' ? true : false,
      })
    }

    items.push({
      title: lang === 'uz' ? 'Tizimli darsdan tashqari faoliyatni shakllantirish' : 'Establish Extracurricular Activities Portfolio',
      description: lang === 'uz'
        ? 'Tegishli soha bo\'yicha to\'garaklarga muntazam qatnashib, ilk yutuqlarni qayd etish.'
        : 'Consistently participate in domain-relevant clubs and record initial achievements.',
      timeline: lang === 'uz' ? 'Sentyabr - May' : 'September - May',
      impact: lang === 'uz' ? 'Portfolio to\'plash' : 'Portfolio Baseline',
      done: status === 'done' ? true : false,
    })

    stages.push({ id: 3, grade: lang === 'uz' ? '9-sinf' : '9th Grade', status, items })
  }

  // Stage 4: 10-sinf
  {
    const grade = '10-sinf'
    const stageIdx = gradesOrder.indexOf(grade)
    const status = stageIdx < currIdx ? 'done' : (stageIdx === currIdx ? 'active' : 'upcoming')
    const items: RoadmapItem[] = []

    if (verifiedCerts.includes(major1) && willMajor1CertExpire) {
      items.push({
        title: lang === 'uz' ? `${major1} Milliy sertifikatini qayta topshirish` : `${major1} National Certificate Renewal`,
        description: lang === 'uz'
          ? 'Sertifikat muddati 3 yil bo\'lib, u bitirish paytida tugaydi. 11-sinfda qayta topshirishni rejalashtiring.'
          : 'Certificate validity is 3 years and will expire by graduation. Plan to retake in 11th grade.',
        timeline: lang === 'uz' ? '11-sinfda qayta topshirish' : 'Retake in 11th grade',
        impact: lang === 'uz' ? '⚠️ Qayta topshirish talab etiladi' : '⚠️ Certificate Renewal / Retake Required',
        done: false,
      })
    } else if (verifiedCerts.includes(major1)) {
      items.push({
        title: lang === 'uz' ? `${major1} Milliy Sertifikati` : `${major1} National Certificate`,
        description: lang === 'uz' ? 'Muvaffaqiyatli tasdiqlangan va amal qiladi.' : 'Successfully verified and active.',
        timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
        impact: lang === 'uz' ? '✅ DTM +93.0 ball ta\'minlandi' : '✅ DTM +93.0 Points Guaranteed',
        done: true,
      })
    } else {
      items.push({
        title: lang === 'uz' ? `${major1} fanidan Milliy sertifikatga tayyorgarlik` : `${major1} National Certificate Prep`,
        description: lang === 'uz'
          ? 'UzBMB standarti bo\'yicha nazariy va amaliy masalalarni o\'rganish.'
          : 'Study theory and solve problems matching the UzBMB test standards.',
        timeline: lang === 'uz' ? 'Oktyabr - Mart' : 'October - March',
        impact: lang === 'uz' ? 'Imtihon tayyorgarligi' : 'Test Preparation',
        done: status === 'done' ? true : false,
      })
    }

    if (major2 === 'Foreign Language') {
      if (verifiedCerts.includes('IELTS') && willIeltsExpire) {
        items.push({
          title: lang === 'uz' ? 'IELTS imtihonini yangilash va qayta topshirish' : 'IELTS Exam Retake & Renewal',
          description: lang === 'uz'
            ? 'Taqdim etilgan IELTS sertifikati muddati o\'tgan bo\'ladi. Yangi imtihon topshirishni rejalashtiring.'
            : 'Submitted IELTS certificate will be expired. Schedule a new exam.',
          timeline: lang === 'uz' ? '11-sinfga rejalash' : 'Plan for 11th grade',
          impact: lang === 'uz' ? '⚠️ Qayta topshirish talab etiladi' : '⚠️ Certificate Renewal / Retake Required',
          done: false,
        })
      } else if (verifiedCerts.includes('IELTS')) {
        items.push({
          title: lang === 'uz' ? `IELTS Sertifikati (Joriy: ${ielts})` : `IELTS Certificate (Current: ${ielts})`,
          description: lang === 'uz' ? 'Maksimal ballni ta\'minlovchi tasdiqlangan IELTS sertifikati.' : 'Verified IELTS certificate guaranteeing maximum score.',
          timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
          impact: lang === 'uz' ? '✅ DTM +63.0 ball ta\'minlandi' : '✅ DTM +63.0 Points Guaranteed',
          done: true,
        })
      } else {
        items.push({
          title: lang === 'uz' ? 'IELTS imtihonini topshirish va natija olish' : 'Take IELTS Exam & Obtain Score',
          description: lang === 'uz'
            ? 'Kamida 6.0 darajali IELTS sertifikatini qo\'lga kiritish va Major 2 blokidan 63.0 ballni naqd qilish.'
            : 'Achieve at least 6.0 score to lock maximum 63.0 points for Major 2 block.',
          timeline: lang === 'uz' ? 'Yanvar - May' : 'January - May',
          impact: lang === 'uz' ? '+63.0 DTM ball' : '+63.0 DTM Points',
          done: status === 'done' ? true : false,
        })
      }
    } else {
      if (verifiedCerts.includes(major2) && willMajor2CertExpire) {
        items.push({
          title: lang === 'uz' ? `${major2} Milliy sertifikatini yangilash` : `${major2} National Certificate Renewal`,
          description: lang === 'uz'
            ? 'Sertifikat amal qilish muddati bitirish paytida tugaydi. Qayta topshirishni rejalashtiring.'
            : 'Certificate will expire before graduation. Plan a renewal retake.',
          timeline: lang === 'uz' ? '11-sinfda topshirish' : 'Take in 11th grade',
          impact: lang === 'uz' ? '⚠️ Qayta topshirish talab etiladi' : '⚠️ Certificate Renewal / Retake Required',
          done: false,
        })
      } else if (verifiedCerts.includes(major2)) {
        items.push({
          title: lang === 'uz' ? `${major2} Milliy Sertifikati` : `${major2} National Certificate`,
          description: lang === 'uz' ? 'Muvaffaqiyatli tasdiqlangan va amal qiladi.' : 'Successfully verified and active.',
          timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
          impact: lang === 'uz' ? '✅ DTM +63.0 ball ta\'minlandi' : '✅ DTM +63.0 Points Guaranteed',
          done: true,
        })
      } else {
        items.push({
          title: lang === 'uz' ? `${major2} fanidan chuqur o'rganish` : `Advanced Study in ${major2}`,
          description: lang === 'uz'
            ? 'Major 2 fanining asosiy va murakkab mavzulari bo\'yicha mavzulashtirilgan testlarni yechish.'
            : 'Solve thematic tests covering standard and advanced topics of Major 2.',
          timeline: lang === 'uz' ? 'Noyabr - May' : 'November - May',
          impact: lang === 'uz' ? 'Imtihon asosi' : 'Exam Foundation',
          done: status === 'done' ? true : false,
        })
      }
    }

    if (verifiedCerts.includes('SAT') && willSatExpire) {
      items.push({
        title: lang === 'uz' ? 'SAT imtihonini yangilash va qayta topshirish' : 'SAT Exam Retake & Renewal',
        description: lang === 'uz'
          ? 'SAT sertifikatingiz bitirish paytida muddati tugaydi. Uning amal qilish muddati 2 yil. Yangi imtihonni rejalashtiring.'
          : 'SAT certificate will expire by graduation due to the 2-year validity period. Plan to retake.',
        timeline: lang === 'uz' ? '11-sinfga rejalash' : 'Plan for 11th grade',
        impact: lang === 'uz' ? '⚠️ Qayta topshirish talab etiladi' : '⚠️ Certificate Renewal / Retake Required',
        done: false,
      })
    } else if (verifiedCerts.includes('SAT')) {
      items.push({
        title: lang === 'uz' ? `SAT Sertifikati (Joriy: ${sat})` : `SAT Certificate (Current: ${sat})`,
        description: lang === 'uz' ? 'Maksimal DTM Matematika ballarini va xalqaro tan olinishni ta\'minlaydi.' : 'Guarantees maximum DTM Mathematics points and international recognition.',
        timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
        impact: lang === 'uz' ? '✅ DTM Matematika tasdiqlandi' : '✅ DTM Math Guaranteed',
        done: true,
      })
    } else {
      items.push({
        title: lang === 'uz' ? 'SAT imtihoniga tayyorgarlik ko\'rish' : 'SAT Exam Preparation',
        description: lang === 'uz'
          ? 'SAT matematika va ingliz tili qismlari bo\'yicha strategiyalarni o\'rganish.'
          : 'Learn math and reading/writing strategies for the digital SAT.',
        timeline: lang === 'uz' ? 'Yil davomida' : 'Year-round',
        impact: lang === 'uz' ? 'Xalqaro imkoniyatlar' : 'International Options',
        done: status === 'done' ? true : false,
      })
    }

    items.push({
      title: lang === 'uz' ? 'Ko\'ngillilik faoliyati (50+ soat)' : 'Community Service (50+ Hours)',
      description: lang === 'uz'
        ? 'Mahalliy ijtimoiy loyihalarda ishtirok etib, yetakchilik qobiliyatlarini rivojlantirish.'
        : 'Participate in local social projects to build leadership and communication skills.',
      timeline: lang === 'uz' ? 'Sentyabr - Fevral' : 'September - February',
      impact: lang === 'uz' ? 'Yumshoq ko\'nikmalar' : 'Soft Skills',
      done: status === 'done' ? true : false,
    })

    stages.push({ id: 4, grade: lang === 'uz' ? '10-sinf' : '10th Grade', status, items })
  }

  // Stage 5: 11-sinf
  {
    const grade = '11-sinf'
    const stageIdx = gradesOrder.indexOf(grade)
    const status = stageIdx < currIdx ? 'done' : (stageIdx === currIdx ? 'active' : 'upcoming')
    const items: RoadmapItem[] = []

    if (verifiedCerts.includes(major1) && !willMajor1CertExpire) {
      items.push({
        title: lang === 'uz' ? `${major1} Milliy Sertifikati` : `${major1} National Certificate`,
        description: lang === 'uz' ? 'Maksimal 93.0 ball tasdiqlangan.' : 'Verified maximum 93.0 points.',
        timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
        impact: lang === 'uz' ? '✅ DTM +93.0 ball ta\'minlandi' : '✅ DTM +93.0 Points Guaranteed',
        done: true,
      })
    } else {
      items.push({
        title: lang === 'uz' ? `${major1} Milliy sertifikat imtihonini topshirish` : `${major1} National Certificate Exam`,
        description: lang === 'uz'
          ? 'UzBMB tomonidan o\'tkaziladigan milliy sertifikat imtihonidan maksimal ball (+93.0) olish.'
          : 'Obtain the highest score on the UzBMB national exam to lock 93.0 points.',
        timeline: lang === 'uz' ? 'Mart - May' : 'March - May',
        impact: lang === 'uz' ? '+93.0 DTM ball' : '+93.0 DTM Points',
        done: status === 'done' ? true : false,
      })
    }

    if (major2 === 'Foreign Language') {
      if (verifiedCerts.includes('IELTS') && !willIeltsExpire) {
        items.push({
          title: lang === 'uz' ? `IELTS Sertifikati (Joriy: ${ielts})` : `IELTS Certificate (Current: ${ielts})`,
          description: lang === 'uz' ? 'Maksimal 63.0 ball tasdiqlangan.' : 'Verified maximum 63.0 points.',
          timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
          impact: lang === 'uz' ? '✅ DTM +63.0 ball ta\'minlandi' : '✅ DTM +63.0 Points Guaranteed',
          done: true,
        })
      } else {
        items.push({
          title: lang === 'uz' ? 'IELTS Chet tili sertifikatini olish' : 'Obtain IELTS / Foreign Language Certificate',
          description: lang === 'uz'
            ? 'IELTS >= 6.0 yoki Chet tili sertifikat imtihonidan B2 daraja olib, 63.0 ballni naqd qilish.'
            : 'Lock 63.0 points in Major 2 by obtaining IELTS >= 6.0 or CEFR B2 level.',
          timeline: lang === 'uz' ? 'Dekabr - Aprel' : 'December - April',
          impact: lang === 'uz' ? '+63.0 DTM ball' : '+63.0 DTM Points',
          done: status === 'done' ? true : false,
        })
      }
    } else {
      if (verifiedCerts.includes(major2) && !willMajor2CertExpire) {
        items.push({
          title: lang === 'uz' ? `${major2} Milliy Sertifikati` : `${major2} National Certificate`,
          description: lang === 'uz' ? 'Maksimal 63.0 ball tasdiqlangan.' : 'Verified maximum 63.0 points.',
          timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
          impact: lang === 'uz' ? '✅ DTM +63.0 ball ta\'minlandi' : '✅ DTM +63.0 Points Guaranteed',
          done: true,
        })
      } else {
        items.push({
          title: lang === 'uz' ? `${major2} Milliy sertifikat imtihonini topshirish` : `${major2} National Certificate Exam`,
          description: lang === 'uz'
            ? 'UzBMB tomonidan o\'tkaziladigan milliy sertifikat imtihonidan maksimal ball (+63.0) olish.'
            : 'Obtain the highest score on the UzBMB national exam to lock 63.0 points.',
          timeline: lang === 'uz' ? 'Aprel - Iyun' : 'April - June',
          impact: lang === 'uz' ? '+63.0 DTM ball' : '+63.0 DTM Points',
          done: status === 'done' ? true : false,
        })
      }
    }

    if (verifiedCerts.includes('SAT') && !willSatExpire) {
      items.push({
        title: lang === 'uz' ? `SAT Sertifikati (Joriy: ${sat})` : `SAT Certificate (Current: ${sat})`,
        description: lang === 'uz' ? 'Amaldagi SAT sertifikati tasdiqlangan.' : 'Valid SAT certificate is verified.',
        timeline: lang === 'uz' ? 'Yakunlangan' : 'Completed',
        impact: lang === 'uz' ? '✅ DTM Matematika tasdiqlandi' : '✅ DTM Math Guaranteed',
        done: true,
      })
    } else {
      items.push({
        title: lang === 'uz' ? 'SAT imtihonini topshirish' : 'Take Official SAT Exam',
        description: lang === 'uz'
          ? 'Xalqaro yoki xususiy universitetlar uchun SAT topshirish (Maqsad: 1450+).'
          : 'Submit official SAT score for admissions matching (Target: 1450+).',
        timeline: lang === 'uz' ? 'Oktyabr - Dekabr' : 'October - December',
        impact: lang === 'uz' ? 'Xalqaro tan olinish' : 'International Recognition',
        done: status === 'done' ? true : false,
      })
    }

    items.push({
      title: lang === 'uz' ? 'Ona tili va adabiyot (Majburiy blok)' : 'Mother Tongue & Literature (Compulsory)',
      description: lang === 'uz'
        ? 'Majburiy blokdagi 10 ta savoldan maksimal ball (+11.0) olish uchun darsliklarni takrorlash.'
        : 'Review textbook rules to score maximum points (+11.0) on the 10 compulsory questions.',
      timeline: lang === 'uz' ? 'Sentyabr - Iyun' : 'September - June',
      impact: lang === 'uz' ? '+11.0 DTM ball' : '+11.0 DTM Points',
      done: status === 'done' ? true : verifiedCerts.includes('Mother Tongue'),
    })

    items.push({
      title: lang === 'uz' ? 'O\'zbekiston tarixi (Majburiy blok)' : 'History of Uzbekistan (Compulsory)',
      description: lang === 'uz'
        ? 'Majburiy tarix blokidan maksimal ball (+11.0) olish uchun tarixiy sanalar va xaritalar bilan ishlash.'
        : 'Study historical timelines and maps to lock the +11.0 point compulsory block.',
      timeline: lang === 'uz' ? 'Noyabr - Iyun' : 'November - June',
      impact: lang === 'uz' ? '+11.0 DTM ball' : '+11.0 DTM Points',
      done: status === 'done' ? true : verifiedCerts.includes('History'),
    })

    const isMathCompulsoryLocked = verifiedCerts.includes('Mathematics') || verifiedCerts.includes('SAT')
    items.push({
      title: lang === 'uz' ? 'Matematika (Majburiy blok)' : 'Compulsory Mathematics',
      description: lang === 'uz'
        ? 'Majburiy matematika savollariga tayyorlanish (+11.0 ball).'
        : 'Solve basic mathematical word problems and logic questions (+11.0 points).',
      timeline: lang === 'uz' ? 'Yanvar - Iyun' : 'January - June',
      impact: lang === 'uz' ? '+11.0 DTM ball' : '+11.0 DTM Points',
      done: status === 'done' ? true : isMathCompulsoryLocked,
    })

    stages.push({ id: 5, grade: lang === 'uz' ? '11-sinf' : '11th Grade', status, items })
  }

  // Force all items in 'done' stages to have done = true
  return stages.map(stage => {
    if (stage.status === 'done') {
      return {
        ...stage,
        items: stage.items.map(it => ({ ...it, done: true }))
      }
    }
    return stage
  })
}

const guideIcons = [FileText, BookOpen, FileText, GraduationCap, ListChecks, BookOpen]

const statusStyles: Record<string, string> = {
  done: 'bg-success text-success-foreground',
  active: 'bg-accent text-accent-foreground',
  upcoming: 'bg-muted text-muted-foreground',
}

export function ConsultingView({ student }: ConsultingViewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleDownload = (id: number) => {
    if (downloadingId !== null) return
    setDownloadingId(id)
    setTimeout(() => {
      setDownloadingId(null)
      setToastMessage(lang === 'uz' ? "Fayl muvaffaqiyatli yuklab olindi!" : "File downloaded successfully!")
      setTimeout(() => setToastMessage(null), 3000)
    }, 1000)
  }

  useEffect(() => {
    if (isGenerating) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isGenerating])
  const [generationStep, setGenerationStep] = useState(0)
  const [customRoadmap, setCustomRoadmap] = useState<RoadmapStage[] | null>(null)
  const { lang } = useLanguage()

  const activeRoadmap: RoadmapStage[] = customRoadmap || generateRoadmapForStudent(student, lang)

  const handleGenerateRoadmap = () => {
    setIsGenerating(true)
    setGenerationStep(0)

    const promptPayload = {
      student_profile: {
        name: student?.name || 'Azizbek Karimov',
        major: student?.major || 'Matematika + Fizika',
        gpa: student?.gpa || 3.85,
        sat: student?.sat || 1420,
        ielts: student?.ielts || 7.0,
        grade: student?.grade || '11-sinf',
        verifiedCerts: student?.verifiedCerts || []
      },
      system_directives: {
        language: lang,
        instruction: lang === 'uz'
          ? "Iltimos, o'quvchi ma'lumotlari asosida to'liq o'zbek tilida qadam-baqadam yo'l xaritasini shakllantiring. Hech qanday ingliz tili aralashmasin."
          : "Please generate a step-by-step roadmap in English based on student details without any Uzbek translation or mixed terms."
      }
    }
    console.log("AI Roadmap prompt payload configuration:", promptPayload)

    // Simulate generation steps
    setTimeout(() => setGenerationStep(1), 600)
    setTimeout(() => setGenerationStep(2), 1200)
    setTimeout(() => setGenerationStep(3), 1800)

    setTimeout(() => {
      setIsGenerating(false)
      const newRoadmap = generateRoadmapForStudent(student, lang)
      setCustomRoadmap(newRoadmap)
    }, 2400)
  }

  const translatedMajor = (student?.major || 'Matematika + Fizika')
    .replace('Matematika + Fizika', lang === 'uz' ? 'Matematika va Fizika' : 'Mathematics & Physics')
    .replace('Matematika + Chet tili', lang === 'uz' ? 'Matematika va Chet tili' : 'Mathematics & Foreign Language')
    .replace('Biologiya + Kimyo', lang === 'uz' ? 'Biologiya va Kimyo' : 'Biology & Chemistry')
    .replace('Tarix + Chet tili', lang === 'uz' ? 'Tarix va Chet tili' : 'History & Foreign Language')
    .replace('Chet tili + Tarix', lang === 'uz' ? 'Chet tili va Tarix' : 'Foreign Language & History')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-left">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {lang === 'uz' ? "Kelajak AI Yo'l Xaritasi" : "Kelajak AI Roadmap"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {lang === 'uz' 
            ? "7-sinfdan boshlab oliygohgacha bo'lgan shaxsiy rivojlanish va imtihon yo'nalishingiz." 
            : "Your personalized academic pathway from 7th grade to graduation admissions."}
        </p>
      </div>

      {/* Section 1 — Roadmap Generator */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-left">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {lang === 'uz' ? "Yo'l xaritasi generatori" : "Roadmap Generator"}
          </h2>
          <Button onClick={handleGenerateRoadmap} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <Sparkles className="size-4" data-icon="inline-start" />
            {lang === 'uz' ? "AI yo'l xaritasini yaratish" : "Generate AI Roadmap"}
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <ol className="relative flex flex-col gap-8 border-l-2 border-dashed border-border pl-8 text-left">
              {activeRoadmap.map((stage) => (
                <li key={stage.id} className="relative">
                  <span
                    className={cn(
                      'absolute -left-[42px] flex size-7 items-center justify-center rounded-full ring-4 ring-background',
                      statusStyles[stage.status],
                    )}
                  >
                    {stage.status === 'done' ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <span className="text-xs font-bold">{stage.id}</span>
                    )}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-base font-semibold text-foreground">{stage.grade}</h3>
                    {stage.status === 'active' && (
                      <Badge className="border-0 bg-accent/15 text-accent">
                        {lang === 'uz' ? 'Jarayonda' : 'Active'}
                      </Badge>
                    )}
                    {stage.status === 'done' && (
                      <Badge className="border-0 bg-success/15 text-success">
                        {lang === 'uz' ? 'Yakunlangan' : 'Completed'}
                      </Badge>
                    )}
                  </div>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {stage.items.map((item) => (
                      <li
                        key={item.title}
                        className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40 shadow-sm"
                      >
                        <div className="flex items-start gap-2.5">
                          {item.done ? (
                            <CheckCircle2 className="size-4 shrink-0 text-success mt-0.5" />
                          ) : (
                            <Circle className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                          )}
                          <div className="flex-1 space-y-1">
                            <span
                              className={cn(
                                'text-sm font-semibold block leading-snug',
                                item.done ? 'text-muted-foreground line-through font-normal' : 'text-foreground',
                              )}
                            >
                              {item.title}
                            </span>
                            {item.description && (
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {(item.timeline || item.impact) && (
                          <div className="flex flex-wrap gap-2 pt-1.5 border-t border-border/50 mt-1">
                            {item.timeline && (
                              <Badge variant="outline" className="text-[10px] py-0 px-2 font-medium border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                📅 {item.timeline}
                              </Badge>
                            )}
                            {item.impact && (
                              <Badge variant="outline" className={cn(
                                "text-[10px] py-0 px-2 font-semibold border-0",
                                item.impact.includes("⚠️") 
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400" 
                                  : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400"
                              )}>
                                {item.impact}
                              </Badge>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* Section 2 — International Guide */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-left">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {lang === 'uz' ? "Xalqaro qo'llanma" : "International Guide"}
          </h2>
          <Button variant="outline" className="gap-2">
            <UserPlus className="size-4" data-icon="inline-start" />
            {lang === 'uz' ? "Mentor bilan bog'lanish" : "Connect with Mentor"}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {guides.map((guide, i) => {
            const Icon = guideIcons[i % guideIcons.length]
            return (
              <Card
                key={guide.id}
                className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handleDownload(guide.id)}
              >
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <Badge variant="secondary" className="text-[11px]">
                      {lang === 'uz' 
                        ? guide.type.replace('Yo\'riqnoma', 'Qo\'llanma').replace('Qo\'llanma', 'Qo\'llanma')
                        : guide.type.replace('Qo\'llanma', 'Guide').replace('Qo\'llanma', 'Guide')}
                    </Badge>
                  </div>
                  <p className="font-heading font-semibold leading-snug text-foreground">{guide.title}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {lang === 'uz' ? `${guide.reads} o'qildi` : `${guide.reads} reads`}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-accent">
                      {downloadingId === guide.id ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin" />
                          {lang === 'uz' ? "Yuklanmoqda..." : "Downloading..."}
                        </>
                      ) : (
                        <>
                          <Download className="size-3.5" />
                          {lang === 'uz' ? "Ochish" : "Open"}
                        </>
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* AI GENERATION OVERLAY LOADING MODAL */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md p-4 animate-fade-in text-left">
          <Card className="w-full max-w-md bg-slate-900 border border-slate-800 text-white pt-8 pb-6 px-6 text-center space-y-4">
            <div className="flex justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-400 animate-spin">
                <Sparkles className="size-8 animate-pulse" />
              </span>
            </div>
            <div className="space-y-1 text-center">
              <h3 className="font-heading text-lg font-bold leading-normal">
                {lang === 'uz' ? "Kelajak AI yo'l xaritasini yaratmoqda..." : "Kelajak AI is generating your roadmap..."}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'uz' 
                  ? `Sizning mutaxassisligingiz (${translatedMajor}) va ko'rsatkichlaringiz tahlil qilinmoqda.`
                  : `Analyzing your major (${translatedMajor}) and performance indicators.`}
              </p>
            </div>

            <div className="text-xs text-left border-t border-slate-800/80 pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", generationStep >= 0 ? "bg-green-500 animate-ping" : "bg-slate-700")} />
                <span className={generationStep >= 0 ? "text-white font-semibold" : "text-slate-500"}>
                  {lang === 'uz' ? "O'quvchi ma'lumotlarini tahlil qilish..." : "Analyzing student profile details..."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", generationStep >= 1 ? "bg-green-500 animate-ping" : "bg-slate-700")} />
                <span className={generationStep >= 1 ? "text-white font-semibold" : "text-slate-500"}>
                  {lang === 'uz' ? "Imtihon ballari va GPA ko'rsatkichlarini solishtirish..." : "Comparing test scores and GPA metrics..."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", generationStep >= 2 ? "bg-green-500 animate-ping" : "bg-slate-700")} />
                <span className={generationStep >= 2 ? "text-white font-semibold" : "text-slate-500"}>
                  {lang === 'uz' ? "Sohaga mos ravishda darsdan tashqari loyihalarni rejalashtirish..." : "Planning extracurricular actions matching the major..."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", generationStep >= 3 ? "bg-green-500 animate-ping" : "bg-slate-700")} />
                <span className={generationStep >= 3 ? "text-white font-semibold" : "text-slate-500"}>
                  {lang === 'uz' ? "Shaxsiy yo'l xaritasini yakunlash..." : "Finalizing personalized pathway..."}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* SUCCESS TOAST OVERLAY */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="flex items-center gap-2.5 rounded-xl border border-green-500/20 bg-green-500/10 text-green-500 px-4 py-3.5 shadow-[0_0_20px_rgba(34,197,94,0.15)] backdrop-blur-md">
            <CheckCircle2 className="size-5" />
            <p className="text-sm font-semibold">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}
