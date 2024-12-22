# go-nextjs-app-router-graphql-sample
Go × Next.js(App Router)によるGraphQLアーキテクチャ

## 技術構成
### バックエンド
- go
- sqlboiler
- sql-migrate
- gqlgen
- ozzo-validation
- godotenv
- go-txdb
- stretchr/testify
- go-randomdata
- factory-go/factory

### フロントエンド
- TypeScript v5
- React v19
- Next.js v19
- @apollo/client
- @@apollo/experimental-nextjs-app-support
- @graphql-codegen/near-operation-file-preset
- @graphql-codegen/typescript-react-apollo
- ESLint
- Prettier

### その他
- Playwright
- Github Actions

## 機能
- 会員登録
- ログイン
- TODOリストの作成・編集・一覧表示

## フロントエンド設計方針
### Colocationパターンによるディレクトリ設計
特定ドメイン(ページ)でのみ使用するコンポーネント、Server Actionsや型はappディレクトリ配下の該当ドメイン下で管理

### アプリケーションで共通して使用するものはsrcディレクトリ配下に、appディレクトリと同階層に配置
- /src
  - /components...共通コンポーネント
  - /actions...共通のServer Actions
  - /graphql...共通のGraphQLスキーマ
  - /app...App Routerによるページ

### Fragment ColocationによるGraphQLのスキーマ・型の管理
以下のメリットを重視
- 実際に使用するコンポーネントにスキーマを宣言することにより、コンポーネントとの依存関係が明示的になり、QueryやMutation, 結果の使用箇所がわかりやすくなる
- アプリケーション全体で共通の型を使用しつつも、コンポーネントが必要とするFieldをFragmentで宣言することにより、型安全性が向上する
- QueryやMutationを必要とするコンポーネントと、結果のみを必要とするコンポーネントの関心の分離ができる
- 単一のスキーマによる生成型ファイルよりも個別に分離された型ファイルの方が、バンドルサイズを縮減できる

### 所管
- App RouterでもApollo ClientによるGraphQLアーキテクチャを実装できるのは嬉しい(まだexperimentalだが...)
- ただ、App Router以前のようにhooks形式で使用できていた頃と比較すると、可読性や型安全性の面で少しビハインドは感じる
- が、コンポーネント内で適切にFragmentで分けていれば、使用箇所は明示的にできるので、全体としては使いやすいのでは

## 環境構築
## 1. 環境変数のファイルの作成(バックエンド)
- api_serverディレクトリ配下の.env.sampleをコピーし、.envとする
- .env.sampleは開発環境をサンプルとしているため、設定値の調整は不要
```
cp .env.sample .env
```

## 2. 環境変数のファイルの作成(フロントエンド)
- frontend/srcディレクトリ配下の.env.sampleをコピーし、.envとする
- .env.sampleは開発環境をサンプルとしているため、設定値の調整は不要
```
cp .env.sample .env
```

### 2. Dockerのbuild・立ち上げ
- ビルド
```
docker-compose build
```

- 起動
```
docker-compose up -d
```

- コンテナに入る
```
docker-compose exec api_server sh
```

### 3. 開発環境DBのマイグレーション
- 2で起動・コンテナに入った上で、以下のコマンドを実行

マイグレーションファイルの作成
```
cd db

godotenv -f /app/.env sql-migrate new -env="mysql" <filename>
```

マイグレーション実行
```
cd db

godotenv -f /app/.env sql-migrate up -env="mysql"
```

### 4. Webサーバの起動
- 2の起動・コンテナに入った上で、以下のコマンドを実行
```
cd /app

godotenv -f /app.env go run server.go
```

4により、Webサーバの起動ができたら、graphiqlでアクセスができていることを確認

http://localhost:8080

### 5. アプリケーションへのアクセス
フロントエンドはコンテナ立ち上げ時に開発サーバを起動しているため、以下のURLにアクセスし、ログイン画面が表示されればフロントエンドもOK

http://localhost:3000

## GraphQLの開発
### バックエンド
- api_server/graphql配下の*.graphqlsファイルにスキーマを書く

- api_serverコンテナに入った上で、以下のコマンドを実行
```
make gen-gql
```

- 自動生成されたResolverに処理を書いていく

- DataLoaderの実装
	- GraphQLではネストしたデータ(特にアソシエーション)を取得する際にN+1が発生しがち
	- DataLoaderをMiddlewareに組み込んで使用することにより、N+1を防ぐ
	- <https://github.com/yamao-sys/go-nextjs-app-router-graphql-sample/blob/main/api_server/lib/dataloaders/dataloaders.go>
	- 参考: https://gqlgen.com/reference/dataloaders/

### フロントエンド
- **特定ページのみで使用するスキーマの場合**と**各ページで共通で使用するスキーマの場合**がある
- それぞれどこにスキーマを書くかは以下に記載するが、共通コマンドとして、`npm run gql-codegen`を実行すると、型ファイルが自動生成される

#### 特定ページのみで使用するスキーマの場合
- そのスキーマを使用するコンポーネントにgqlを使用し、QueryやMutation, Fragmentを定義

```
gql`
  query sampleQuery {
    sampleQuery {
      ...
    }
  }
`
```

```
gql`
  mutation sampleMutation($input: SampleInput!) {
    sampleMutation(input: $input) {
      ...
    }
  }
`
```

```
# Fragmentは「コンポーネント名_使用する型」の命名にする
gql`
  fragment コンポーネント名_SampleType on SampleType {
    ...
  }
`
```

- frontendコンテナに入り、`npm run gql-codegen`を実行
  - → 同階層に`__generated__`のディレクトリができ、その中で型が生成される

- 使用するページ(ドメイン)配下に`_actions`ディレクトリを作成し、その配下でQueryやMutationを実行する関数を作成・使用するように
  - 同ドメイン配下にある`__generated__`の型を使用するように
  - InputTypeなどは`frontend/graphql/__generated__`配下の共通のものを使用しても良い

#### 各ページで共通で使用するスキーマの場合
- `frontend/graphql`配下にスキーマファイルを作成し、QueryやMutation, Fragment等を書く

- frontendコンテナに入り、`npm run gql-codegen`を実行
  - → `frontend/graphql/__generated__`配下に型が生成される

## テスト実行
### テスト用DBの作成・マイグレーション
- テスト用のDBをdbコンテナのホストにログインし、DB名`go_nextjs_app_router_graphql_sample_test`で作成する
- DBを作成した上で、api_serverコンテナに入った上で、以下のコマンドを実行
```
cd db

# テスト用のDBのマイグレーション
godotenv -f /app/.env.test.local sql-migrate up -env="mysql"
```

### テスト実行
## バックエンドの単体テスト
api_serverコンテナに入った上で、以下のコマンドを実行
```
godotenv -f /app/.env.test.local go test -v ./...
```

## ローカルでのE2Eテスト
```
sh run-e2e-local.sh
```
