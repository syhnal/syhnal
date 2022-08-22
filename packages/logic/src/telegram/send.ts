import { TgConfig } from "./config"

const tgSendMessage = (text: string, config: TgConfig) => {
  fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: config.chat,
      text: text
    })
  })
}

export { tgSendMessage }