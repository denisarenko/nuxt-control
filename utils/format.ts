interface NumberOptions {
  value: number;
  currency?: string;
  options?: Intl.NumberFormatOptions;
  locale?: string;
}

interface DateOptions {
  date: Date | number | string;
  format?: 'short' | 'long' | 'iso';
  time?: boolean;
  year?: boolean;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
}

export const formatNumber = ({ value, currency, options, locale = 'en-US' }: NumberOptions) => {
  const defaultOptions: Intl.NumberFormatOptions = currency ? { style: 'currency', currency } : {};

  return new Intl.NumberFormat(locale, options || defaultOptions).format(value);
};

export const formatDate = ({
  date,
  format = 'short',
  time = false,
  year = true,
  options,
  locale = 'en-US'
}: DateOptions) => {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (format === 'iso') return dateObject.toISOString().split('T')[0] ?? dateObject.toISOString();

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hourCycle: 'h24',
    month: format === 'long' ? 'long' : 'short',
    day: 'numeric',
    ...(time ? { hour: 'numeric', minute: 'numeric' } : {}),
    ...(year ? { year: 'numeric' } : {})
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(dateObject);
};
