import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const domains = fs.readdirSync('./app');
const zones = domains.map((domain) => ({
  from: `./app/${domain}/!(public)/**/*`,
  target: `./app/!(${domain})/**/*`,
}));

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // NOTE: Prettierとの競合を防ぐ設定を追加
      //     : prettierConfigからルールを追加
      ...eslintConfigPrettier.rules,

      // NOTE: app配下はそれぞれが専属で使用するため、他のドメインのディレクトリからimport不可にする
      'import/no-restricted-paths': [
        'error',
        {
          zones,
        },
      ],
    },
  },
  { ignores: ['app/**/__generated__/**/*.ts'] },
];

export default eslintConfig;
