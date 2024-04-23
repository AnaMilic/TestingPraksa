const { expect } = require("@playwright/test");
class HomePage {
  constructor(page) {
    this.page = page;
    this.itemTitle = page.locator(".inventory_item_label a");
    this.item = page.locator(".inventory_item_description");
    this.cart = page.locator(".shopping_cart_link");
    this.itemLabel = page.locator(".cart_item_label");
  }

  async validateHomePage() {
    await this.itemTitle.first().waitFor();
    await expect(this.itemTitle.first()).toContainText("Sauce Labs Backpack");
  }
  async addItemToTheCart(itemLabel) {
    await this.item.filter({ hasText: itemLabel }).getByRole("button").click();
  }
  async navigateToCart() {
    await this.cart.click();
  }
  async visibleRemoveButton(removeBtn) {
    await expect(this.page.locator(removeBtn)).toBeVisible();
  }
  async removeItemFromTheCart(addBtn, removeBtn) {
    await this.visibleRemoveButton(removeBtn);
    await this.page.locator(removeBtn).click();
    await expect(this.page.locator(addBtn)).toBeVisible();
  }
}
module.exports = { HomePage };
