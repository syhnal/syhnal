interface TgConfig {
  token: string
}

const tgConfig: TgConfig = {
  token: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!
}

export { tgConfig }