# GitHub Pages

大学のバスの時刻を GitHub Pages で表示しています。<br>
https://s-n-1-0.github.io/sist_bus/

# リポジトリ内ショートカット

1. [アナウンスの更新場所](./app/src/components/AnnouncementBlock.vue)

2. [時刻表データの保存場所](./app/public/json/schedules/)

# 時刻表データについて

Google スプレッドシートに打ち込んだデータを GAS で json 形式に変換したものを手動でアップロードしています。

- [シート記入ルール](./SHEETRULE.md)

# リポジトリについて

appフォルダ内にVueプロジェクトがあります。

### セットアップ方法など
[https://github.com/s-n-1-0/sist_bus/tree/main/app](https://github.com/s-n-1-0/sist_bus/blob/main/app/README.md)を参照

# 注意事項

GitHub Pages は pages ブランチで管理しています。pages ブランチに対して**プルリクエストを作成しないと**反映されないようにしています。

Actions で自動的にビルドするので npm run build 及びビルド用コミットは不要です。
