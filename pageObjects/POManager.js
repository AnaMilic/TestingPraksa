const { LoginPage } = require("./LoginPage");
const { HomePage } = require("./HomePage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { CheckoutOverviewPage } = require("./CheckoutOverviewPage");
const { CheckoutCompletePage } = require("./CheckoutCompletePage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getCheckoutOverviewPage() {
    return this.checkoutOverviewPage;
  }

  getCheckoutCompletePage() {
    return this.checkoutCompletePage;
  }
}
module.exports = { POManager };
