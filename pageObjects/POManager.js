const { LoginPage } = require("./LoginPage");
const { HomePage } = require("./HomePage");
const { CartPage } = require("./CartPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.cartPage = new CartPage(this.page);
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
}
module.exports = { POManager };
