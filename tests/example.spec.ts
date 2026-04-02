import { test } from "@playwright/test";

test("open app in WebKit (Safari-like)", async ({ page }) => {
  await page.goto("http://localhost:5173"); // your React dev server
  await page.waitForLoadState("networkidle");

  // keep browser open for inspection
  await page.pause();
});
