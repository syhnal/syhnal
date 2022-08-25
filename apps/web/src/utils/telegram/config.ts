// shared
import { TgConfig } from "logic"

const chats = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!.split(" ")

const tgConfig: TgConfig = {
  token: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!,
  chats
}

export { tgConfig }