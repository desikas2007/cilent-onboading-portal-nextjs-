export const formatCurrency = (value: number): string => {
  return `₹${value.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN');
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const getFinancialYear = (assessmentYear: string): string => {
  const startYear = parseInt(assessmentYear.split('-')[0]) - 1;
  const endYear = parseInt(assessmentYear.split('-')[0]);
  return `April ${startYear} - March ${endYear}`;
};

export const cn = (...classes: (string | undefined | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};
