export default function PricingPage() {
  return (
    <main className="container-padded py-12">
      <h1 className="text-2xl font-semibold mb-4">料金・設備</h1>
      <p className="text-gray-700 mb-6">料金は税込表示。予約は1時間単位、5,500円/時。</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>スタジオ利用：5,500円/時（税込）</li>
        <li>無人運用、Akerun による入退室管理</li>
        <li>無料Wi-Fi、基本照明</li>
      </ul>
    </main>
  )
}

