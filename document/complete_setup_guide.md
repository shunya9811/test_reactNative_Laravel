# Todo App 完全セットアップガイド

## プロジェクト構成

```
/
├── backend/          # Laravel API
└── frontend/         # React Native (Expo)
```

## 1. Laravel Backend セットアップ

### 1.1 プロジェクト作成
```bash
composer create-project laravel/laravel backend
cd backend
```

### 1.2 必要なパッケージインストール
```bash
composer require fruitcake/laravel-cors
```

### 1.3 ファイル作成・編集
以下のファイルを作成・編集してください：

- `database/migrations/xxxx_xx_xx_xxxxxx_create_todos_table.php`
- `app/Models/Todo.php`
- `app/Http/Controllers/Api/TodoController.php`
- `routes/api.php`
- `config/cors.php`

### 1.4 データベース設定
`.env` ファイルでデータベース設定を行い、マイグレーションを実行：

```bash
php artisan migrate
```

### 1.5 サーバー起動
```bash
php artisan serve
```

## 2. React Native Frontend セットアップ

### 2.1 プロジェクト作成
```bash
npx create-expo-app frontend
cd frontend
```

### 2.2 依存関係インストール
```bash
npm install axios @expo/vector-icons
```

### 2.3 App.js を置き換え
提供されたコードで `App.js` を置き換えてください。

### 2.4 開発サーバー起動
```bash
npx expo start
```

## 3. 実機テスト時の設定

### PCのIPアドレス確認
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
```

### App.js の API_BASE_URL を変更
```javascript
// 例：PCのIPが192.168.1.100の場合
const API_BASE_URL = 'http://192.168.1.100:8000/api';
```

## 4. 動作確認

1. Laravel API サーバーが localhost:8000 で起動していることを確認
2. React Native アプリを Expo Go またはシミュレーターで起動
3. TODOの追加・編集・削除が正常に動作することを確認

## 5. トラブルシューティング

### CORS エラーが発生する場合
- `config/cors.php` の設定を確認
- Laravel の CORS ミドルウェアが正しく設定されていることを確認

### API接続エラーが発生する場合
- Laravel サーバーが起動していることを確認
- ネットワーク設定（IP アドレス）を確認
- ファイアウォールの設定を確認

### 実機でアクセスできない場合
- PCとスマートフォンが同一ネットワークに接続されていることを確認
- PCのファイアウォールでポート8000が開放されていることを確認