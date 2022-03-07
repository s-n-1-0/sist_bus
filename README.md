# GitHub Pages
大学のバスの時刻をGitHub Pagesで表示しています。<br>
https://s-n-1-0.github.io/sist_bus/

※Gitの学習も兼ねているのでログがごちゃっとしてます

# 時刻表データについて
Googleスプレッドシートに打ち込んだデータをGASでjson形式に変換したものを手動でアップロードしています。

# リポジトリについて
coreフォルダの階層で以下のコマンドを使用できます。

### Webpackビルド
```
npm run build 
または
npm run dev
```

### Webpack DevServerの立ち上げ

```
npm run server
```

### 注意事項
GitHub Pagesはpagesブランチで管理しています。pagesブランチにマージしないと変更は反映されません。
webpack内の変更は
```
npm run build
```
を実行してビルドしてください。
