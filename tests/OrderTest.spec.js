const { test } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");

test.beforeEach(
  "Login to the home page and add item to the cart",
  async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();
    await loginPage.goToLoginPage();
    await loginPage.validLogin();
    await homePage.validateHomePage();
    await homePage.addItemToTheCart();
    await homePage.navigateToCart();
    await cartPage.validateCartPage();
  }
);

test("Completing order", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const checkoutOverviewPage = poManager.getCheckoutOverviewPage();
  const checkoutCompletePage = poManager.getCheckoutCompletePage();
  await cartPage.checkout();
  await checkoutPage.validateCheckoutPage();
  await checkoutPage.fillingFormWithInformation();
  await checkoutOverviewPage.validateCheckoutOverviewPage();
  await checkoutOverviewPage.finishOrder();
  await checkoutCompletePage.validateOrderCompleted();
  await checkoutCompletePage.backToHomePage();
  await homePage.validateHomePage();
});

test("Incomplete order", async ({ page }) => {
  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  await cartPage.checkout();
  await checkoutPage.validateCheckoutPage();
  await checkoutPage.fillingFormWithInvalidInformation();
});
