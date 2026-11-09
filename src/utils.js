export const toDate = (value) => {
  if (!value) return null;
  const [year, month, date] = value.split('-').map(Number);
  const parsed = new Date(year, month - 1, date, 12);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const daysUntil = (value) => {
  const date = toDate(value);
  if (!date) return Number.POSITIVE_INFINITY;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Math.ceil((date - today) / 86400000);
};

export const expiryStatus = (value) => {
  const days = daysUntil(value);
  if (days < 0) return 'Expired';
  if (days <= 7) return 'Expiring soon';
  if (days <= 30) return 'Expiring soon';
  return 'Healthy';
};

export const expiryGroup = (value) => {
  const days = daysUntil(value);
  if (days < 0) return 'Expired';
  if (days <= 7) return 'Within 7 days';
  if (days <= 30) return 'Within 30 days';
  return 'Later';
};

export const formatDate = (value) => {
  const date = toDate(value);
  let locale = 'en-US';
  try { if (localStorage.getItem('medsave-language') === 'hi') locale = 'hi-IN'; } catch { /* Use the default locale if browser storage is unavailable. */ }
  return date ? new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }).format(date) : '—';
};

export const formatMoney = (value, currency = 'USD') => {
  let locale = 'en-US';
  try { if (localStorage.getItem('medsave-language') === 'hi') locale = 'hi-IN'; } catch { /* Use the default locale if browser storage is unavailable. */ }
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(value || 0);
};

export const getStoredMedicines = () => {
  try {
    const stored = localStorage.getItem('medsave-medicines');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const getStoredPreferences = () => {
  try {
    return JSON.parse(localStorage.getItem('medsave-preferences') || 'null');
  } catch {
    return null;
  }
};
