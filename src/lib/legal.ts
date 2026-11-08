/**
 * Dates of the legal documents (YYYY-MM-DD). Change them only together with the text of the document,
 * never compute them – the page must show when the document really changed.
 */
export const PRIVACY_UPDATED = '2026-11-08';
export const TERMS_UPDATED = '2026-11-08';

/** Public contact channel of Finance 44 (used in both documents). */
export const CONTACT_URL = 'https://github.com/m-dominiak-company44/finance-44/issues';

/** Formats a YYYY-MM-DD date in the page language, without time zone shifts (e.g. "8 listopada 2026"). */
export function formatLegalDate(isoDate: string, language: string): string {
    const [year, month, day] = isoDate.split('-').map(Number);
    return new Intl.DateTimeFormat(language, { dateStyle: 'long' }).format(new Date(year, month - 1, day));
}
