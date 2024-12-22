#!/bin/bash

# テスト実行
docker-compose -f docker-compose.e2e.yaml run --rm frontend_test npm run e2e

# テスト用DBのリセット
docker-compose -f docker-compose.e2e.yaml run --rm db mysql -h db -u root -p -e "DROP DATABASE go_nextjs_graphql_practice_test; CREATE DATABASE go_nextjs_graphql_practice_test;"
docker-compose -f docker-compose.e2e.yaml run --rm api_server_test sh -c 'cd db && godotenv -f /app/.env.test.local sql-migrate up -env="mysql"'
