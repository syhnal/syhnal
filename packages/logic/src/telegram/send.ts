const tgSendMessage = (text: string, token: string, chat: string) => {
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chat,
      text: text
    })
  })
}

export { tgSendMessage }