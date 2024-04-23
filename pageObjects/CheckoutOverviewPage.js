const { expect } = require("@playwright/test");
class CheckoutOverviewPage {
  constructor(page) {
    this.itemLabel = page.locator(".cart_item_label");
    this.finishButton = page.getByRole("button", { name: "Finish" });
  }
  async validateCheckoutOverviewPage(itemLabel) {
    await expect(this.itemLabel).toContainText(itemLabel);
    await expect(this.finishButton).toBeVisible();
  }
  async finishOrder() {
    await this.finishButton.click();
  }
}
module.exports = { CheckoutOverviewPage };
