const { expect } = require("@playwright/test");
class HomePage {
  constructor(page) {
    this.itemTitle = page.locator(".inventory_item_label a");
    this.item = page.locator(".inventory_item_description");
    this.cart = page.locator(".shopping_cart_link");
    this.itemLabel = page.locator(".cart_item_label");
    this.cartList = page.locator(".cart_list");
    this.page = page;
  }

  async validateHomePage() {
    await this.itemTitle.first().waitFor();
    await expect(this.itemTitle.first()).toContainText("Sauce Labs Backpack");
  }
  async addItemToTheCart(itemLabel) {
    await this.item.filter({ hasText: itemLabel }).getByRole("button").click();
  }
  async navigateToCart(itemLabel) {
    await this.cart.click();
    await expect(this.itemLabel).toContainText(itemLabel);
  }
  async visibleRemoveButton(removeBtn) {
    await expect(this.page.locator(removeBtn)).toBeVisible();
  }
  async removeItemFromTheList(addBtn, removeBtn) {
    //await expect(this.page.locator(removeBtn)).toBeVisible();
    await this.visibleRemoveButton(removeBtn);
    await this.page.locator(removeBtn).click();
    await expect(this.page.locator(addBtn)).toBeVisible();
  }
  async removeItemFromTheCart(removeBtn, itemLabel) {
    await this.page.locator(removeBtn).click();
    await expect(this.cartList).not.toContainText(itemLabel);
  }
}
module.exports = { HomePage };
