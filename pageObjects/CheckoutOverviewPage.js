const { expect } = require("@playwright/test");
const label = "Sauce Labs Onesie";
class CheckoutOverviewPage {
  constructor(page) {
    this.itemLabel = page.locator(".cart_item_label");
    this.finishButton = page.getByRole("button", { name: "Finish" });
  }
  async validateCheckoutOverviewPage() {
    await expect(this.itemLabel).toContainText(label);
    await expect(this.finishButton).toBeVisible();
  }
  async finishOrder() {
    await this.finishButton.click();
  }
}
module.exports = { CheckoutOverviewPage };
