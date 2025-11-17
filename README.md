# GitHubユーザー検索アプリ（React Native + Expo）

このアプリは、GitHubのユーザー名を入力すると、GitHub APIを使ってそのユーザーのプロフィール情報を取得・表示するReact Nativeアプリです。

## 使用技術

- React Native（Expo）
- TypeScript
- GitHub REST API
- 状態管理（useState）
- 型定義（GitHubUser）
- コメントによる保守性向上

## 機能概要

- ユーザー名を入力して検索
- GitHub APIからプロフィール情報を取得
- アイコン画像、名前、自己紹介、フォロワー数などを表示
- ローディング表示あり
- 型定義とコメントを意識した保守性の高いコード

## 実行方法

```bash
npm install
npx expo start
