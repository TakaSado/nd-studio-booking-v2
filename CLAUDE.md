# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要な規約

**必ずすべて日本語でやり取りすること** - このプロジェクトでは、コミュニケーション、コメント、ドキュメント、エラーメッセージなど、すべて日本語で記述してください。

## プロジェクト概要

NDPromotion Studio Bookingシステム - Next.js 14とFirebaseで構築されたスタジオ予約管理システム

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# Linter実行
npm run lint

# テスト実行
npm run test

# テスト監視モード
npm run test:watch

# Firebase Functions
cd functions
npm run build        # TypeScriptビルド
npm run serve        # エミュレータ起動
npm run deploy       # デプロイ
```

## アーキテクチャ

### フロントエンド構成
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: `/src/components/ui/` - カスタムUIコンポーネント
- **Pages**: `/src/app/` - App Routerベースのページ構造

### APIルート構成 (`/src/app/api/`)
- `availability/` - 空き状況確認
- `checkout/` - Stripe決済セッション作成
- `cancel/` - 予約キャンセル処理
- `extend/` - 予約延長処理
- `notify/` - 通知処理

### Firebase Functions (`/functions/`)
- Stripe Webhook処理 (`apiWebhooksStripe`)
- 決済完了後の予約確認処理
- Firebase Admin SDKによるサーバーサイド処理

### 主要ライブラリ (`/src/lib/`)
- `bookings.ts` - 予約管理ロジック（ロック機構含む）
- `stripe.ts` - Stripe統合
- `firebaseAdmin.ts` - Firebase Admin SDK初期化
- `googleCalendar.ts` - Googleカレンダー連携
- `akerun.ts` - Akerun（スマートロック）連携
- `slack.ts` - Slack通知
- `gmail.ts` - メール送信
- `time.ts` - 時間計算ユーティリティ

## データモデル

### Booking型
```typescript
type Booking = {
  id: string
  start: string                    // ISO形式
  end: string                      // ISO形式
  durationHours: number
  amountTaxExcluded: number
  taxAmount: number
  amountTaxIncluded: number
  status: 'pending' | 'confirmed' | 'canceled' | 'failed'
  customer: { name: string; email: string; phone: string }
  calendarEventId?: string
  akerunGrantId?: string
  stripePaymentIntentId?: string
  stripeCheckoutSessionId?: string
}
```

## 予約フロー

1. **ロック作成**: 予約開始時に3分間の排他ロックを作成
2. **Pending予約作成**: 料金計算後、pending状態で予約レコード作成
3. **Stripe決済**: Checkoutセッション作成・リダイレクト
4. **Webhook処理**: 決済完了後、Firebase Functionsで予約確認
5. **外部連携**: Googleカレンダー登録、Akerunアクセス権付与、通知送信

## Firebase設定

- **Region**: asia-northeast1
- **Firestore**: ルールとインデックス管理
- **Hosting**: Next.jsアプリケーション
- **Functions**: Node.js 20ランタイム

## 環境変数

必要な環境変数:
- `FIREBASE_PROJECT_ID`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- その他外部サービスのAPIキー

## テスト

Vitestを使用。`npm run test`で実行、`npm run test:watch`で監視モード。

## デプロイ

1. Next.jsアプリ: `npm run build` → Firebase Hostingへ自動デプロイ
2. Functions: `cd functions && npm run deploy`