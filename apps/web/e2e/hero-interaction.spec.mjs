import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

test("hero probe, theme toggle, nav", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const hero = page.locator(".hero-grid").first();
  await hero.hover({ position: { x: 280, y: 140 } });
  await page.waitForTimeout(1500);

  await page.getByRole("button", { name: /Switch to (light|dark) theme/i }).click();
  await page.waitForTimeout(900);

  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work/);
  await page.waitForTimeout(1200);

  await page.getByRole("link", { name: "Shashwat Dwivedi" }).click();
  await page.waitForTimeout(2000);
});

test.afterAll(async () => {
  const outDir = path.resolve(here, "../../docs/step3a/playwright-output");
  const dest = path.resolve(here, "../../docs/step3a/hero-interaction.webm");
  if (!fs.existsSync(outDir)) return;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".webm")) files.push(full);
    }
  };
  const files = [];
  walk(outDir);
  if (files.length === 0) return;
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  fs.copyFileSync(files[0], dest);
});
