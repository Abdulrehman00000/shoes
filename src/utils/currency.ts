export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'AED'
  | 'SAR'
  | 'PKR'
  | 'INR'
  | 'CHF'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'SGD'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'CNY'
  | 'HKD'
  | 'TRY'
  | 'MYR'
  | 'ZAR'
  | 'BRL'
  | 'SEK'
  | 'NOK'
  | 'KRW';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // relative to USD = 1.0
  flag: string;
  placement: 'before' | 'after';
  country: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
    flag: '🇺🇸',
    placement: 'before',
    country: 'United States',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.92,
    flag: '🇪🇺',
    placement: 'before',
    country: 'European Union (France, Italy, Germany)',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.79,
    flag: '🇬🇧',
    placement: 'before',
    country: 'United Kingdom',
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    rate: 3.67,
    flag: '🇦🇪',
    placement: 'before',
    country: 'United Arab Emirates (Dubai, Abu Dhabi)',
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR ',
    name: 'Saudi Riyal',
    rate: 3.75,
    flag: '🇸🇦',
    placement: 'before',
    country: 'Saudi Arabia',
  },
  PKR: {
    code: 'PKR',
    symbol: 'Rs ',
    name: 'Pakistani Rupee',
    rate: 278.5,
    flag: '🇵🇰',
    placement: 'before',
    country: 'Pakistan',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rate: 86.5,
    flag: '🇮🇳',
    placement: 'before',
    country: 'India',
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF ',
    name: 'Swiss Franc',
    rate: 0.90,
    flag: '🇨🇭',
    placement: 'before',
    country: 'Switzerland (Geneva, Zurich)',
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    rate: 154.0,
    flag: '🇯🇵',
    placement: 'before',
    country: 'Japan',
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    rate: 1.39,
    flag: '🇨🇦',
    placement: 'before',
    country: 'Canada',
  },
  AUD: {
    code: 'AUD',
    symbol: 'AU$',
    name: 'Australian Dollar',
    rate: 1.54,
    flag: '🇦🇺',
    placement: 'before',
    country: 'Australia',
  },
  SGD: {
    code: 'SGD',
    symbol: 'SG$',
    name: 'Singapore Dollar',
    rate: 1.34,
    flag: '🇸🇬',
    placement: 'before',
    country: 'Singapore',
  },
  QAR: {
    code: 'QAR',
    symbol: 'QAR ',
    name: 'Qatari Riyal',
    rate: 3.64,
    flag: '🇶🇦',
    placement: 'before',
    country: 'Qatar (Doha)',
  },
  KWD: {
    code: 'KWD',
    symbol: 'KWD ',
    name: 'Kuwaiti Dinar',
    rate: 0.31,
    flag: '🇰🇼',
    placement: 'before',
    country: 'Kuwait',
  },
  BHD: {
    code: 'BHD',
    symbol: 'BHD ',
    name: 'Bahraini Dinar',
    rate: 0.38,
    flag: '🇧🇭',
    placement: 'before',
    country: 'Bahrain',
  },
  OMR: {
    code: 'OMR',
    symbol: 'OMR ',
    name: 'Omani Rial',
    rate: 0.385,
    flag: '🇴🇲',
    placement: 'before',
    country: 'Oman',
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    rate: 7.24,
    flag: '🇨🇳',
    placement: 'before',
    country: 'China',
  },
  HKD: {
    code: 'HKD',
    symbol: 'HK$',
    name: 'Hong Kong Dollar',
    rate: 7.78,
    flag: '🇭🇰',
    placement: 'before',
    country: 'Hong Kong',
  },
  TRY: {
    code: 'TRY',
    symbol: '₺',
    name: 'Turkish Lira',
    rate: 34.5,
    flag: '🇹🇷',
    placement: 'before',
    country: 'Turkey (Istanbul)',
  },
  MYR: {
    code: 'MYR',
    symbol: 'RM ',
    name: 'Malaysian Ringgit',
    rate: 4.45,
    flag: '🇲🇾',
    placement: 'before',
    country: 'Malaysia',
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R ',
    name: 'South African Rand',
    rate: 18.2,
    flag: '🇿🇦',
    placement: 'before',
    country: 'South Africa',
  },
  BRL: {
    code: 'BRL',
    symbol: 'R$ ',
    name: 'Brazilian Real',
    rate: 5.75,
    flag: '🇧🇷',
    placement: 'before',
    country: 'Brazil',
  },
  SEK: {
    code: 'SEK',
    symbol: 'kr ',
    name: 'Swedish Krona',
    rate: 10.65,
    flag: '🇸🇪',
    placement: 'after',
    country: 'Sweden',
  },
  NOK: {
    code: 'NOK',
    symbol: 'kr ',
    name: 'Norwegian Krone',
    rate: 10.85,
    flag: '🇳🇴',
    placement: 'after',
    country: 'Norway',
  },
  KRW: {
    code: 'KRW',
    symbol: '₩',
    name: 'South Korean Won',
    rate: 1380.0,
    flag: '🇰🇷',
    placement: 'before',
    country: 'South Korea (Seoul)',
  },
};

export function formatPrice(usdAmount: number, currency: CurrencyConfig = CURRENCIES.USD): string {
  const rate = currency?.rate || 1.0;
  const symbol = currency?.symbol || '$';
  const placement = currency?.placement || 'before';

  const converted = Math.round(usdAmount * rate);
  const formattedNumber = converted.toLocaleString();

  if (placement === 'before') {
    return `${symbol}${formattedNumber}`;
  }
  return `${formattedNumber} ${symbol}`;
}
