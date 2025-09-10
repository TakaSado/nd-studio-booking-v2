export default function TokushohoPage() {
  return (
    <main className="container-padded py-12">
      <h1 className="text-2xl font-semibold mb-4">特定商取引法に基づく表記（サンプル）</h1>
      <p className="text-sm text-gray-500 mb-6">本ページはサンプルです。貴社法務での確認・差し替えを前提とします。</p>
      <div className="space-y-2 text-gray-700">
        <p>販売事業者：NDPromotion 株式会社（仮）</p>
        <p>所在地：東京都〇〇区〇〇 1-2-3</p>
        <p>連絡先：{process.env.NEXT_PUBLIC_SUPPORT_EMAIL} / {process.env.NEXT_PUBLIC_SUPPORT_PHONE}</p>
        <p>販売価格：5,500円/時（税込）</p>
        <p>支払方法：クレジットカード（Stripe）</p>
      </div>
    </main>
  )
}

