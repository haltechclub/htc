# Hal Tech Club website

## 概要

本番環境  
[https://haltechclub.com](https://haltechclub.com)  

開発環境  
[https://develop.haltechclub.com](https://develop.haltechclub.com)  

### 使用技術

#### Nuxt.js  

SPA/PWA

#### CircleCI  

自動デプロイ  
developへのpushで[開発環境](https://develop.haltechclub.com)  
masterへのpushで[本番環境](https://haltechclub.com)  
にデプロイされます。

#### Firebase Hosting  

デプロイ先  

#### [Google Cloud Storage](https://image.haltechclub.com)  

画像ホスティング  

## 開発環境準備

``` bash
# 取得
$ git clone git@github.com:haltechclub/htc.git
$ cd ./htc

# 依存ライブラリのインストール
$ yarn install

# mdファイルの変換ライブラリ導入
$ yarn global add processmd
```

### 恐らく使わないコマンド  

``` bash
# build for production and launch server（使わないと思う）
$ yarn run build
$ yarn start

# 静的ファイル生成（CircleCIで使ってますが開発中打つことはない）
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## 開発の流れ

### git-flow

![git-flow](https://camo.qiitausercontent.com/d901f284065e5bd1ba72137193b8befa9db0040d/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3339303030302f62316564353930322d323036662d313338332d373565642d3165353830333434363062332e706e67)
[参考URL](https://qiita.com/tktktktk/items/8b40cde759554ea071f9)  

基本的に  

1. issueを作成
2. feature/xxxブランチを切る
3. 作ってはpushの繰り返しで完成させる
4. PullRequestを作成する
5. developへのマージと共にissueを閉じてfeature/xxxブランチも削除

という流れで開発をお願いします。  

PullRequestでissueを閉じる [参考](https://qiita.com/tackeyy/items/3033e3dae2abb7110a83)

### よく使うコマンド

``` bash
# md編集
# contents/summary.jsonの消去

# mdファイルを元にjsonを生成
$ yarn -s processmd "contents/markdown/**/*.md" --preview 160 --stdout --outputDir contents/json > contents/summary.json

# localhost:3000で起動
$ yarn run dev
```

## ディレクトリ構成

``` bash
htc
├── .circleci/
│   └── config.yml  # CircleCIの設定ファイル
├── .firebase/
│   └── hosting.ZGlzdA.cache
├── .firebaserc
├── README.md
├── assets/     # 画像とかのアセット
├── components/ # 画面部品
│   ├── Article.vue
│   ├── Header.vue
│   ├── Logo.vue
│   └── README.md
├── contents/
│   ├── json/       # processmdにて出力
│   ├── markdown/   # 記事のmdはここに格納
│   └── summary.json    # processmdにて出力
├── dist/   # nuxt generateした時に静的ファイルが生成される場所
├── firebase.json
├── layouts/    # 基本となるレイアウト
│   ├── README.md
│   └── default.vue
├── middleware/
│   └── README.md
├── modules/
│   └── splitExt.js
├── node_modules/
├── nuxt.config.js  # nuxtの設定を記述
├── pages/  # メインコンテンツとなるページ
│   ├── .DS_Store
│   ├── README.md
│   ├── articles/
│   ├── categories/
│   └── index.vue
├── static/ # 静的に配信されるファイル
│   ├── README.md
│   ├── favicon.ico
│   ├── icon.png
│   └── sw.js
```

### assets

画像やCSSなどを格納するディレクトリ。  
nuxt内からは`"@/assets/~"`でアクセスされる。  

### components

画面部品。`pages/`内のコンテンツから呼び出される。  

### contents/markdown

記事の元となるマークダウンファイル。  
ファイル上部にyaml形式で記事のヘッダーを記入可能。  
ファイル名から拡張子を取り除いた部分がURLとなる。  

### contents/json

記事として表示されるjsonファイル。  
processmdで生成。  
記事のヘッダーはjson形式に変換される。  
ファイル名から拡張子を取り除いた部分がURLとなる。  

ex)  
`contents/markdown/2019-6-14-lt.md`  
↓  
`contents/json/2019-6-14-lt.json`  
↓  
`https://haltechclub.com/articles/2019-6-14-lt`

### contents/summary.json

記事一覧や基本情報を記述。  
processmdで生成。  

### pages

実際に表示されるコンテンツ部。  
routingはディレクトリ構造で管理。  
ex)  
`https://haltechclub.com/articles/2019-6-14-lt`  
↓  
`pages/articles/_name.vue`  
`name`はvueファイル内で`params.name`として取得可能。  
