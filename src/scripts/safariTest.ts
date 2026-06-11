import { webkit } from "@playwright/test";

// Run with: node .\src\scripts\safariTest.ts

(async () => {
  const browser = await webkit.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:5173");

  // Keep browser open
})();