import { test, expect, Page } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('/sign_up');

  // NOTE: 会員登録フォームを入力
  await page.getByRole('textbox', { name: 'ユーザ名' }).fill('test_todos_login');
  await page.getByRole('textbox', { name: 'Email' }).fill('test_todos_login@example.com');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('password');

  await page.getByRole('button', { name: '登録する' }).click();

  // NOTE: ログイン
  await page.goto('/sign_in');
  await page.getByRole('textbox', { name: 'Email' }).fill('test_todos_login@example.com');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('password');

  await page.getByRole('button', { name: 'ログインする' }).click();

  await page.waitForURL('/todos');
});

test('First Todo Creating', async () => {
  await page.goto('/todos');

  expect(page.getByText('まだ登録済みTodoが0件です。')).toBeVisible();

  await page.getByRole('link', { name: 'Todo作成' }).click();
  await page.waitForURL('/todos/new');

  await page.getByRole('textbox', { name: 'タイトル' }).fill('テスト_タイトル');
  await page.getByRole('textbox', { name: '内容' }).fill('テスト_内容');

  await page.getByRole('button', { name: '登録する' }).click();

  await page.waitForURL('/todos');
  expect(page.getByText('テスト_タイトル')).toBeVisible();
  expect(page.getByRole('button', { name: '編集する' })).toBeVisible();
  expect(page.getByRole('button', { name: '削除する' })).toBeVisible();
});
