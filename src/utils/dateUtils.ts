import { format, parseISO } from 'date-fns';
import { he } from 'date-fns/locale';

export const formatDate = (dateString: string | Date): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'dd MMMM yyyy', { locale: he });
  } catch {
    return dateString as string;
  }
};

export const formatTime = (dateString: string | Date): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'HH:mm', { locale: he });
  } catch {
    return '';
  }
};

export const formatDateTime = (dateString: string | Date): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'dd MMMM yyyy HH:mm', { locale: he });
  } catch {
    return dateString as string;
  }
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy', { locale: he });
};

export const isToday = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

export const isUpcoming = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  return checkDate > new Date();
};
