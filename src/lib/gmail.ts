// Gmail API スタブ（サービスアカウント + DWD）。本番は googleapis 実装。

type Mail = {
  to: string
  subject: string
  html: string
}

export async function sendMail(_mail: Mail) {
  // TODO: implement via gmail.users.messages.send
  return { id: 'mock-mail-id' }
}

export function buildBookingConfirmedTemplate(params: { name: string; startHuman: string; endHuman: string }) {
  const footer = `<p style="font-size:12px;color:#6b7280">緊急連絡先: ${process.env.SUPPORT_PHONE} / ${process.env.SUPPORT_EMAIL}</p>`
  return {
    subject: '【予約確定】NDスタジオ',
    html: `<div><p>${params.name} 様</p><p>以下のとおり予約が確定しました。</p><p>${params.startHuman} - ${params.endHuman}</p>${footer}</div>`
  }
}

export function buildBookingCanceledTemplate(params: { name: string; startHuman: string; refundYen: number }) {
  const footer = `<p style="font-size:12px;color:#6b7280">緊急連絡先: ${process.env.SUPPORT_PHONE} / ${process.env.SUPPORT_EMAIL}</p>`
  return {
    subject: '【キャンセル】NDスタジオ',
    html: `<div><p>${params.name} 様</p><p>予約はキャンセルされました。返金額：¥${params.refundYen.toLocaleString()}</p><p>対象開始時刻：${params.startHuman}</p>${footer}</div>`
  }
}

