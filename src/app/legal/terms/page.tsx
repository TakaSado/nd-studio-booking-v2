export default function TermsPage() {
  return (
    <main className="container-padded py-12">
      <h1 className="text-2xl font-semibold mb-4">利用規約（サンプル）</h1>
      <p className="text-sm text-gray-500 mb-6">本ページはサンプルです。貴社法務での確認・差し替えを前提とします。</p>
      <div className="space-y-4 text-gray-700">
        <p>第1条（適用）・・・</p>
        <p>第2条（予約）・・・</p>
        <p>第3条（料金）・・・税込 5,500円/時。決済は Stripe のみ。</p>
        <p>第4条（キャンセル）・・・T–12h 以前：全額返金、T–12h～T–2h：20%返金、T–2h 以降：返金なし。</p>
      </div>
    </main>
  )
}

