const { test, expect } = require("@playwright/test");

//ako stavimo samo browser kao parametar onda ga posmatra kao obicnu string vrednost,
// zato treba da se stavi kao {browser} da bi se znalo da je vezano za playwright

test("Browser Context Playwright test", async ({ browser }) => {
  //context- kao nova instanca browsera gde cemo primeniti testove;
  //bez ikakvih pluginova i cookies koje vec imam kad normalno otvorim browser - novi fresh browser kao incognito

  const context = await browser.newContext();
  const page = await context.newPage();
  //ova dva koraka nisu neophodna ako kao parametar imamo prosledjeno page, jer ce ih playwright automatski u pozadini izvrsiti;
  // kao u primeru dole
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});
//kada se stavi test.only onda ce pokrenuti samo taj test, a sve ostale preskociti
test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");

  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

//*************************** */
test("Swag Labs Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");
  console.log(await page.title());
  //dve metode za upisivanje u polje type - deprecated i fill
  await page.locator("#user-name").fill("standard_user");
  await page.locator("[type='password']").fill("secret_sauce2");
  await page.locator("#login-button").click();
  console.log(await page.locator("[data-test='error']").textContent());
  await expect(page.locator("[data-test='error']")).toContainText(
    "Epic sadface"
  );
});

//Login test
test("Login Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");
  console.log(await page.title());

  await page.locator("#user-name").fill("standard_user");
  await page.locator("[type='password']").fill("secret_sauce");
  await page.locator("#login-button").click();
  await page.goto("https://www.saucedemo.com/inventory.html");
});

test("Login Playwright test 1", async ({ browser }) => {
  const username = page.locator("#user-name");
  const password = page.locator("[type='password']");
  const loginButton = page.locator("#login-button");

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");
  await username.fill("standard_user");
  await password.fill("secret_sauce");
  await loginButton.click();
  await page.goto("https://www.saucedemo.com/inventory.html");
});

test.only("Login Playwright test 2", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");

  const username = page.locator("#user-name");
  const password = page.locator("[type='password']");
  const loginButton = page.locator("#login-button");

  await username.fill("standard_user2");
  await password.fill("secret_sauce");
  await loginButton.click();
  console.log(await page.locator("[data-test='error']").textContent());
  await expect(page.locator("[data-test='error']")).toContainText(
    "Epic sadface"
  );
  await username.fill("");
  await username.fill("standard_user");
  await loginButton.click();
  console.log(
    await page.locator(".inventory_item_label a").nth(0).textContent()
  );
  console.log(
    await page.locator(".inventory_item_label a").last().textContent()
  );
});
