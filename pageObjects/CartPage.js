const { expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    this.itemLabel = page.locator(".cart_item_label");
    this.cartList = page.locator(".cart_list");
  }

  async validateCartPage(itemLabel) {
    await expect(this.itemLabel).toContainText(itemLabel);
  }
  async removeItemFromTheCart(removeBtn, itemLabel) {
    await this.page.locator(removeBtn).click();
    await expect(this.cartList).not.toContainText(itemLabel);
  }
}
module.exports = { CartPage };