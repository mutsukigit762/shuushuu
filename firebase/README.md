# 収集3の共有用Firebase（shuushuu-mutsuki）

2026-10-19に作成。collection などが使っている memo-ce334 とは別のプロジェクト
（あちらはムツキ本人のGoogleログインでしか入れない設定なので、緩めないために分けた）。

- 中身：`rooms/{合言葉}/days/{日付}` に1日分（goal・d0〜d4）
- ログインなし。合言葉を知っている人は誰でも読み書きできる
- 反映：`firebase deploy --only firestore:rules --project shuushuu-mutsuki`（このフォルダで）
