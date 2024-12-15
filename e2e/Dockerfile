# ベースとなるDockerイメージを指定
FROM mcr.microsoft.com/playwright:focal

# ワーキングディレクトリを設定
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./entrypoint.sh /app/entrypoint.sh

RUN chmod 755 entrypoint.sh

# 必要なパッケージをインストール
RUN npm install

# Playwrightで使用するブラウザをインストール
RUN npx playwright install --with-deps
