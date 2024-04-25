const { test } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");

test.beforeEach("Login to the home page", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const homePage = poManager.getHomePage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin();
  await homePage.validateHomePage();
});

test("Add item to the shopping cart test 1", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.addItemToTheCart();
  await homePage.visibleRemoveButton();
});

test("Add item to the shopping cart test 2", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();
  await homePage.addItemToTheCart();
  await homePage.navigateToCart();
  await cartPage.validateCartPage();
});

test("Remove item from the shopping cart test 1", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.addItemToTheCart();
  await homePage.removeItemFromTheCart();
});

test("Remove item from the shopping cart test 2", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();
  await homePage.addItemToTheCart();
  await homePage.navigateToCart();
  await cartPage.validateCartPage();
  await cartPage.removeItemFromTheCart();
});

test("Logout", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();
  await homePage.logout();
  await loginPage.validateLoginPage();
});

test("Go back from the About page", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goBack();
  await homePage.validateHomePage();
});
