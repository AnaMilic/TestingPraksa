const { test } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");

test.beforeEach("Login to the home page", async ({ page }) => {
  const poManager = new POManager(page);
  const username = "standard_user";
  const password = "secret_sauce";
  const loginPage = poManager.getLoginPage();
  const homePage = poManager.getHomePage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin(username, password);
  await homePage.validateHomePage();
});

test("Add item to the shopping cart test 1", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const itemLabel = "Sauce Labs Onesie";
  const removeBtn = "#remove-sauce-labs-onesie";
  await homePage.addItemToTheCart(itemLabel);
  await homePage.visibleRemoveButton(removeBtn);
});

test("Add item to the shopping cart test 2", async ({ page }) => {
  const poManager = new POManager(page);
  const itemLabel = "Sauce Labs Onesie";
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();
  await homePage.addItemToTheCart(itemLabel);
  await homePage.navigateToCart();
  await cartPage.validateCartPage(itemLabel);
});

test("Remove item from the shopping cart test 1", async ({ page }) => {
  const poManager = new POManager(page);
  const itemLabel = "Sauce Labs Onesie";
  const addBtn = "#add-to-cart-sauce-labs-onesie";
  const removeBtn = "#remove-sauce-labs-onesie";
  const homePage = poManager.getHomePage();
  await homePage.addItemToTheCart(itemLabel);
  await homePage.removeItemFromTheCart(addBtn, removeBtn);
});

test.only("Remove item from the shopping cart test 2", async ({ page }) => {
  const poManager = new POManager(page);
  const itemLabel = "Sauce Labs Onesie";
  const removeBtn = "#remove-sauce-labs-onesie";
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();
  await homePage.addItemToTheCart(itemLabel);
  await homePage.navigateToCart();
  await cartPage.validateCartPage(itemLabel);
  await cartPage.removeItemFromTheCart(removeBtn, itemLabel);
});
