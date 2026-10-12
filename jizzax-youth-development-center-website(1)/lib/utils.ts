import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const UZ_MONTHS_CORRECT = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
const RU_MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const UZ_MONTHS_SHORT = ["YAN", "FEV", "MAR", "APR", "MAY", "IYU", "IYL", "AVG", "SEN", "OKT", "NOY", "DEK"];
const RU_MONTHS_SHORT = ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЙ", "ИЮН", "ИЮЛ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"];
const EN_MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function formatFullDate(date: Date, language: 'UZ' | 'RU' | 'EN', padDayForUz: boolean = false): string {
  const rawDay = date.getDate();
  const dayStr = (padDayForUz && language === "UZ") ? rawDay.toString().padStart(2, '0') : rawDay.toString();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (language === "UZ") {
    return `${year}-yil ${dayStr}-${UZ_MONTHS_CORRECT[monthIndex]}`;
  } else if (language === "RU") {
    return `${rawDay} ${RU_MONTHS[monthIndex]} ${year} г.`;
  } else {
    return `${EN_MONTHS[monthIndex]} ${rawDay}, ${year}`;
  }
}

export function formatShortMonth(date: Date, language: 'UZ' | 'RU' | 'EN'): string {
  const monthIndex = date.getMonth();
  if (language === "UZ") {
    return UZ_MONTHS_SHORT[monthIndex];
  } else if (language === "RU") {
    return RU_MONTHS_SHORT[monthIndex];
  } else {
    return EN_MONTHS_SHORT[monthIndex];
  }
}
