# 五目並べ (Gomoku)

スマートフォンなどの小さな画面でも操作しやすいようにズーム機能を搭載した、シンプルな五目並べゲームです。

[Play here](https://hn770123.github.io/Gomoku/)

## 操作方法

1.  **盤面の拡大 (Zoom In)**:
    *   石を置きたい場所をタップすると、その位置を中心に盤面が拡大されます。
2.  **石を置く (Place Stone)**:
    *   拡大された状態で再度タップすると、石を置くことができます。
    *   石を置くと、自動的にズームアウトします。
3.  **キャンセル (Zoom Out)**:
    *   拡大中に "Zoom Out" ボタンを押すと、石を置かずにズームアウトできます。
4.  **リセット**:
    *   "New Game" ボタンでゲームを最初からやり直すことができます。

## ルール

*   **盤面サイズ**: 15x15
*   **手番**: 黒番から開始し、交互に打ちます。
*   **勝利条件 (フリースタイル)**:
    *   縦・横・斜めのいずれかに同じ色の石を **5つ以上** 並べたプレイヤーの勝利です。
    *   禁じ手（長連など）はありません。
*   **引き分け**: 盤面が全てのマスが埋まった場合は引き分けとなります。

## 技術スタック

```mermaid
graph TD
    User((User))
    Browser[Web Browser]

    subgraph "Frontend (React + TypeScript)"
        Vite[Vite (Build Tool)]
        App[React Application]
        Components[Game Components]
        Logic[Game Logic]
    end

    subgraph "Hosting"
        GHP[GitHub Pages]
    end

    User -->|Access| Browser
    Browser -->|Load| GHP
    GHP -->|Serve| App
    App -->|Build with| Vite
    App -->|Render| Components
    Components -->|Use| Logic
```
