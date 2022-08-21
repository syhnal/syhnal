const tgSendMessage = (text: string, token: string) => {
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: "1191083345",
      text: text
    })
  })
}

export { tgSendMessage }