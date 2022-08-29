type Lang = "uk" | "ru";

const toLang = (locale: string): Lang => locale as Lang;

export { toLang }
export type { Lang }