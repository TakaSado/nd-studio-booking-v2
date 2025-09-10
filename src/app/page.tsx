'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useState } from 'react'
import Image from 'next/image'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // ギャラリー画像データ（Unsplashの高品質画像）
  const galleryImages = [
    { 
      id: 1, 
      category: 'studio', 
      title: 'メインスタジオ', 
      description: '広々とした撮影スペース',
      imageUrl: 'https://images.unsplash.com/photo-1565876480051-7e14a5b36259?w=800&h=600&fit=crop'
    },
    { 
      id: 2, 
      category: 'studio', 
      title: 'ホワイトスタジオ', 
      description: '白を基調とした明るい空間',
      imageUrl: 'https://images.unsplash.com/photo-1468930897867-5b4171bfb411?w=800&h=600&fit=crop'
    },
    { 
      id: 3, 
      category: 'equipment', 
      title: '照明機材', 
      description: 'プロ仕様のLED照明',
      imageUrl: 'https://images.unsplash.com/photo-1604298458655-ae6e04213678?w=800&h=600&fit=crop'
    },
    { 
      id: 4, 
      category: 'studio', 
      title: 'グリーンバック', 
      description: 'クロマキー撮影対応',
      imageUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=600&fit=crop'
    },
    { 
      id: 5, 
      category: 'equipment', 
      title: 'カメラ機材', 
      description: '最新の撮影機材',
      imageUrl: 'https://images.unsplash.com/photo-1606986628253-05620e9b0a80?w=800&h=600&fit=crop'
    },
    { 
      id: 6, 
      category: 'studio', 
      title: '控室', 
      description: 'メイクルーム完備',
      imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&h=600&fit=crop'
    },
    { 
      id: 7, 
      category: 'works', 
      title: 'ポートレート撮影事例', 
      description: 'プロフィール写真撮影',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
    },
    { 
      id: 8, 
      category: 'works', 
      title: '商品撮影事例', 
      description: 'ECサイト用商品撮影',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop'
    },
    { 
      id: 9, 
      category: 'works', 
      title: '動画撮影事例', 
      description: 'YouTube動画制作',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop'
    },
    { 
      id: 10, 
      category: 'studio', 
      title: 'エントランス', 
      description: 'スタジオ入口',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    },
    { 
      id: 11, 
      category: 'equipment', 
      title: '音響設備', 
      description: '録音・配信対応',
      imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop'
    },
    { 
      id: 12, 
      category: 'works', 
      title: 'ファッション撮影事例', 
      description: 'アパレル商品撮影',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop'
    }
  ]

  const categories = [
    { id: 'all', label: 'すべて' },
    { id: 'studio', label: 'スタジオ' },
    { id: 'equipment', label: '設備・機材' },
    { id: 'works', label: '撮影事例' }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const studioFeatures = [
    { icon: '📐', title: '100㎡', description: '広々とした撮影スペース' },
    { icon: '💡', title: 'LED照明完備', description: '調光可能な最新設備' },
    { icon: '🎨', title: '各種背景', description: '白・黒・グリーンバック' },
    { icon: '🎬', title: '動画撮影対応', description: '配信・録画機材完備' }
  ]

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-transparent" />
        </div>
        
        {/* 背景画像 - ローカルファイルまたはダークな画像URL */}
        {/* ローカル画像を使用する場合: src="/images/hero/studio-hero-dark.jpg" */}
        <Image
          src="/images/hero/studio-hero-dark.jpg"
          alt="NDスタジオ - プロフェッショナル撮影スタジオ"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              NDスタジオ
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8">
              プロフェッショナルな撮影環境をご提供
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" variant="primary">
                  スタジオを予約
                </Button>
              </Link>
              <Link href="#gallery">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  ギャラリーを見る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* スタジオ概要 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">スタジオの特徴</h2>
              <p className="text-lg text-gray-700">24時間365日利用可能な完全無人スタジオ</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {studioFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ギャラリーセクション */}
      <section id="gallery" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ギャラリー</h2>
            <p className="text-xl text-gray-800 font-medium mb-8">スタジオの様子をご覧ください</p>
            
            {/* カテゴリーフィルター */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* ギャラリーグリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image.id)}
                className="group cursor-pointer relative aspect-square overflow-hidden rounded-xl bg-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {/* 実際の画像 */}
                <Image 
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
                
                {/* 拡大アイコン */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* スタジオ詳細情報 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                撮影に必要なすべてが揃う空間
              </h2>
              <div className="space-y-4 text-gray-800">
                <p className="leading-relaxed">
                  NDスタジオは、プロフェッショナルな撮影から個人の創作活動まで、
                  あらゆるニーズに対応する多目的スタジオです。
                </p>
                <p className="leading-relaxed">
                  最新の照明機材、各種背景、音響設備を完備し、
                  写真撮影、動画制作、ライブ配信など幅広い用途でご利用いただけます。
                </p>
                <p className="leading-relaxed">
                  24時間365日、オンライン予約システムとスマートロックにより、
                  いつでも快適にご利用いただける環境を整えています。
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/book">
                  <Button size="lg" variant="primary">
                    今すぐ予約する
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    料金・設備を見る
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&h=400&fit=crop'
              ].map((url, i) => (
                <div 
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg relative"
                >
                  <Image
                    src={url}
                    alt={`スタジオ設備${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 利用可能な撮影 */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">こんな撮影にご利用いただけます</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'ポートレート撮影', icon: '👤', items: ['宣材写真', 'プロフィール撮影', 'オーディション写真'] },
              { title: '商品撮影', icon: '📦', items: ['EC用商品撮影', 'カタログ撮影', 'ファッション撮影'] },
              { title: '動画制作', icon: '🎥', items: ['YouTube撮影', 'ライブ配信', 'インタビュー収録'] }
            ].map((category, index) => (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <ul className="space-y-2 text-left">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-800">
                        <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            撮影スタジオをお探しですか？
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            プロ仕様の機材と快適な空間で、あなたの創作活動をサポートします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="xl" variant="secondary" className="min-w-[200px]">
                スタジオを予約
              </Button>
            </Link>
            <Link href="/access">
              <Button size="xl" variant="outline" className="min-w-[200px] bg-white/10 text-white border-white/30 hover:bg-white/20">
                アクセス情報
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ライトボックス（画像拡大表示） */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
              {/* 拡大画像 */}
              {galleryImages.find(img => img.id === selectedImage) && (
                <>
                  <Image
                    src={galleryImages.find(img => img.id === selectedImage)!.imageUrl}
                    alt={galleryImages.find(img => img.id === selectedImage)!.title}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {galleryImages.find(img => img.id === selectedImage)?.title}
                    </h3>
                    <p className="text-gray-200">
                      {galleryImages.find(img => img.id === selectedImage)?.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}