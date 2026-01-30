const ALLOWED_DOMAINS: readonly string[] = [
  'gmail.com',
  'outlook.com',
  'icloud.com',
];
const EDU_PATTERN = /\.edu(\.[a-z]{2})?$/i;

export function isAllowedEmail(email: string): boolean {
  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex === email.length - 1) return false;

  const domain = email.slice(atIndex + 1).toLowerCase();

  if (ALLOWED_DOMAINS.includes(domain)) return true;
  if (EDU_PATTERN.test(domain)) return true;

  return false;
}
