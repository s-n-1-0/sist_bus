# GitHub Pages

大学のバスの時刻を GitHub Pages で表示しています。<br>
https://s-n-1-0.github.io/sist_bus/

※Git の学習も兼ねているのでログがごちゃっとしてます

# 時刻表データについて

Google スプレッドシートに打ち込んだデータを GAS で json 形式に変換したものを手動でアップロードしています。

- [シート記入ルール](./SHEETRULE.md)

# リポジトリについて

core フォルダの階層で以下のコマンドを使用できます。

### Webpack DevServer の立ち上げ

```
npm run dev
```

別ターミナルで

```
npm run server
```

### 注意事項

GitHub Pages は pages ブランチで管理しています。pages ブランチにマージしないと変更は反映されません。
core フォルダ内の変更は

```
npm run build
```

を実行してビルドしてください。  
※docs フォルダ内の変更(例えば時刻変更)はビルド不要
