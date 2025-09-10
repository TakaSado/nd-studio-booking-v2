export default function PrivacyPage() {
  return (
    <main className="container-padded py-12">
      <h1 className="text-2xl font-semibold mb-4">プライバシーポリシー（サンプル）</h1>
      <p className="text-sm text-gray-500 mb-6">本ページはサンプルです。貴社法務での確認・差し替えを前提とします。</p>
      <div className="space-y-4 text-gray-700">
        <p>当社は、予約に必要な最小限の情報（氏名・メール・電話）を取得します。</p>
        <p>決済情報は Stripe により処理され、当社では保持しません。</p>
        <p>アクセスログ等は運用・セキュリティ目的で保存します。</p>
      </div>
    </main>
  )
}

