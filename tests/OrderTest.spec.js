const { test } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");

test.beforeEach(
  "Login to the home page and add item to the cart",
  async ({ page }) => {
    const poManager = new POManager(page);
    const username = "standard_user";
    const password = "secret_sauce";
    const itemLabel = "Sauce Labs Onesie";
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();
    await loginPage.goToLoginPage();
    await loginPage.validLogin(username, password);
    await homePage.validateHomePage();
    await homePage.addItemToTheCart(itemLabel);
    await homePage.navigateToCart();
    await cartPage.validateCartPage(itemLabel);
  }
);

test("Completing order", async ({ page }) => {
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
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const firstName = "a";
  const lastName = "";
  const zip = "11111";
  await cartPage.checkout();
  await checkoutPage.validateCheckoutPage();
  await checkoutPage.fillingFormWithInvalidInformation(
    firstName,
    lastName,
    zip
  );
});
