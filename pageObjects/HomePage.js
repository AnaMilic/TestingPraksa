const { expect } = require("@playwright/test");
const label = "Sauce Labs Onesie";
const addButton = "#add-to-cart-sauce-labs-onesie";
const removeButton = "#remove-sauce-labs-onesie";
class HomePage {
  constructor(page) {
    this.page = page;
    this.itemTitle = page.locator(".inventory_item_label a");
    this.item = page.locator(".inventory_item_description");
    this.cart = page.locator(".shopping_cart_link");
    this.itemLabel = page.locator(".cart_item_label");
    this.burgerButton = page.locator("#react-burger-menu-btn");
    this.burgerMenu = page.locator(".bm-menu");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.aboutLink = page.locator("#about_sidebar_link");
  }

  async validateHomePage() {
    await this.itemTitle.first().waitFor();
    await expect(this.itemTitle.first()).toContainText("Sauce Labs Backpack");
  }
  async addItemToTheCart() {
    await this.item.filter({ hasText: label }).getByRole("button").click();
  }
  async navigateToCart() {
    await this.cart.click();
  }
  async visibleRemoveButton() {
    await expect(this.page.locator(removeButton)).toBeVisible();
  }
  async removeItemFromTheCart() {
    await this.visibleRemoveButton(removeButton);
    await this.page.locator(removeButton).click();
    await expect(this.page.locator(addButton)).toBeVisible();
  }
  async logout() {
    await expect(this.burgerButton).toBeVisible();
    await this.burgerButton.click();
    await expect(this.burgerMenu).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
  async goBack() {
    await expect(this.burgerButton).toBeVisible();
    await this.burgerButton.click();
    await expect(this.burgerMenu).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await this.aboutLink.click();
    await expect(this.page).toHaveURL("https://saucelabs.com/");
    await this.page.goBack();
  }
}
module.exports = { HomePage };
