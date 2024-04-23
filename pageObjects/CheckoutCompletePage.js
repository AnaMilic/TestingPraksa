const { expect } = require("@playwright/test");

class CheckoutCompletePage {
  constructor(page) {
    this.completeText = page.locator("#checkout_complete_container");
    this.backButton = page.getByRole("button", { name: "Back Home" });
  }
  async validateOrderCompleted() {
    await expect(this.completeText).toContainText("Thank you for your order!");
    await expect(this.backButton).toBeVisible();
  }
  async backToHomePage() {
    await this.backButton.click();
  }
}
module.exports = { CheckoutCompletePage };
