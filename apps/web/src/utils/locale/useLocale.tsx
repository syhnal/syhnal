import { Locale } from 'logic';

const toLang = (locale: string): Locale => locale as Locale;

export { toLang }