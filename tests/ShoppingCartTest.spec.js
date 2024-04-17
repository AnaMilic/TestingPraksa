const { test, expect } = require("@playwright/test");
//ako postoji samo jedno dugme na stranici ili u odredjenoj sekciji koja se dohvatila, onda ne mora da se stavlja parametar name,
//jer ce dohvatiti samo to jedno dugme koje postoji
//await page.getByRole("button").click();
//await page.getByRole("button", { name: "Login" }).click();

test("Valid login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const username = page.locator("#user-name");
  const password = page.locator("#password");
  const loginButton = page.locator("#login-button");
  const itemTitle = page.locator(".inventory_item_label a");

  await username.fill("standard_user");
  await password.fill("secret_sauce");
  await loginButton.click();
  await itemTitle.first().waitFor();

  console.log(await itemTitle.first().textContent());
  await expect(itemTitle.first()).toContainText("Sauce Labs Backpack");

  //await page.pause();
});

test("Add item to the shopping cart test 1", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const item = page.locator(".inventory_item_description");
  const itemTitle = page.locator(".inventory_item_label a");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await itemTitle.first().waitFor();
  await expect(itemTitle.first()).toContainText("Sauce Labs Backpack");
  await page.getByText("Sauce Labs Backpack").isVisible();
  await item
    .filter({ hasText: "Sauce Labs Onesie" })
    .getByRole("button")
    .click();
  await expect(page.locator("#remove-sauce-labs-onesie")).toBeVisible();

  await page.pause();
});

test("Add item to the shopping cart test 2", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const item = page.locator(".inventory_item_description");
  const itemTitle = page.locator(".inventory_item_label a");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await itemTitle.first().waitFor();
  await expect(itemTitle.first()).toContainText("Sauce Labs Backpack");
  await item
    .filter({ hasText: "Sauce Labs Onesie" })
    .getByRole("button")
    .click();
  await page.locator(".shopping_cart_link").click();
  await expect(page.locator(".cart_item_label")).toContainText(
    "Sauce Labs Onesie"
  );

  await page.pause();
});

test("Remove item from the shopping cart test 1", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const item = page.locator(".inventory_item_description");
  const itemTitle = page.locator(".inventory_item_label a");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await itemTitle.first().waitFor();
  await expect(itemTitle.first()).toContainText("Sauce Labs Backpack");
  await item
    .filter({ hasText: "Sauce Labs Onesie" })
    .getByRole("button")
    .click();
  await expect(page.locator("#remove-sauce-labs-onesie")).toBeVisible();
  await page.locator("#remove-sauce-labs-onesie").click();
  await expect(page.locator("#add-to-cart-sauce-labs-onesie")).toBeVisible();
});

test.only("Remove item from the shopping cart test 2", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const item = page.locator(".inventory_item_description");
  const itemTitle = page.locator(".inventory_item_label a");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await itemTitle.first().waitFor();
  await expect(itemTitle.first()).toContainText("Sauce Labs Backpack");
  await item
    .filter({ hasText: "Sauce Labs Onesie" })
    .getByRole("button")
    .click();
  await page.locator(".shopping_cart_link").click();
  await expect(page.locator(".cart_item_label")).toContainText(
    "Sauce Labs Onesie"
  );
  await page.locator("#remove-sauce-labs-onesie").click();

  await expect(page.locator(".cart_list")).not.toContainText(
    "Sauce Labs Onesie"
  );

  await page.pause();
});
