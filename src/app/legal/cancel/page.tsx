export default function CancelPolicyPage() {
  return (
    <main className="container-padded py-12">
      <h1 className="text-2xl font-semibold mb-4">キャンセルポリシー（サンプル）</h1>
      <p className="text-sm text-gray-500 mb-6">本ページはサンプルです。貴社法務での確認・差し替えを前提とします。</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>T–12h 以前：全額返金</li>
        <li>T–12h～T–2h：80%課金（20%返金）</li>
        <li>T–2h 以降：100%課金（返金なし）</li>
      </ul>
    </main>
  )
}

