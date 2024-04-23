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

test("Remove item from the shopping cart test 2", async ({ page }) => {
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

/*test("Completing order", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const checkoutOverviewPage = poManager.getCheckoutOverviewPage();
  const checkoutCompletePage = poManager.getCheckoutCompletePage();
  const itemLabel = "Sauce Labs Onesie";
  const firstName = "a";
  const lastName = "a";
  const zip = "11111";
  await homePage.addItemToTheCart(itemLabel);
  await homePage.navigateToCart();
  await cartPage.validateCartPage(itemLabel);
  await cartPage.checkout();
  await checkoutPage.validateCheckoutPage();
  await checkoutPage.fillingFormWithInformation(firstName, lastName, zip);
  await checkoutOverviewPage.validateCheckoutOverviewPage(itemLabel);
  await checkoutOverviewPage.finishOrder();
  await checkoutCompletePage.validateOrderCompleted();
  await checkoutCompletePage.backToHomePage();
  await homePage.validateHomePage();
});

test.only("Incomplete order", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const itemLabel = "Sauce Labs Onesie";
  const firstName = "a";
  const lastName = "";
  const zip = "11111";
  await homePage.addItemToTheCart(itemLabel);
  await homePage.navigateToCart();
  await cartPage.validateCartPage(itemLabel);
  await cartPage.checkout();
  await checkoutPage.validateCheckoutPage();
  await checkoutPage.fillingFormWithInvalidInformation(
    firstName,
    lastName,
    zip
  );
});*/
