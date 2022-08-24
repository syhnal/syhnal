// shared
import { TgConfig } from "logic"

const tgConfig: TgConfig = {
  token: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!,
  chats: [process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!]
}

export { tgConfig }