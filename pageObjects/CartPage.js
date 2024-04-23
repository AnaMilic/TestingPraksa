const { expect } = require("@playwright/test");
const label = "Sauce Labs Onesie";
const removeButton = "#remove-sauce-labs-onesie";
class CartPage {
  constructor(page) {
    this.page = page;
    this.itemLabel = page.locator(".cart_item_label");
    this.cartList = page.locator(".cart_list");
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
  }

  async validateCartPage() {
    await expect(this.itemLabel).toContainText(label);
  }
  async removeItemFromTheCart() {
    await this.page.locator(removeButton).click();
    await expect(this.cartList).not.toContainText(label);
  }
  async checkout() {
    await expect(this.checkoutBtn).toBeVisible();
    await this.checkoutBtn.click();
  }
}
module.exports = { CartPage };
